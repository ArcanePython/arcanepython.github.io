import * as twgl from "twgl.js"   // Greg's work

import * as datgui from "dat.gui"

import * as camhandler from "./camhandler" // camera projection     
import * as scene from "./scene"

export class SkyBoxCubeScene implements scene.SceneInterface
{
    vaoCube: WebGLVertexArrayObject | undefined;
    reflectingCubeBufferInfo: twgl.BufferInfo | undefined;

   
    // SceneInterface only, skybox is shown in animation container (now animation1.ts)
    scenesize: number = 40;
    sceneenv: number = 1;
    animationParameters: scene.TAnimation1Parameters | undefined;
    vertexShaderSource = ``;
    fragmentShaderSource = ``; 
    twglprograminfo: twgl.ProgramInfo[]|null=null;
    //cameraPosition: [number,number,number] | undefined
    positionLocation: number | undefined;
    resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
    
    fieldOfViewRadians: number;
    
    worldMatrix: twgl.m4.Mat4 | undefined;
    viewMatrix: twgl.m4.Mat4 | undefined;
    projectionMatrix: twgl.m4.Mat4 | undefined;
    viewDirectionMatrix: twgl.m4.Mat4 | undefined;
    texture: WebGLTexture | undefined;

    public constructor(gl: WebGL2RenderingContext)
    {
      this.vertexShaderSource = this.vsMirrorCube;
      this.fragmentShaderSource = this.fsMirrorCube;
    
      this.twglprograminfo=new Array(2);   
      this.twglprograminfo![1] = twgl.createProgramInfo(gl, [this.vsMirrorCube, this.fsMirrorCube]);

      this.fieldOfViewRadians = 60* Math.PI / 180;
    }

    protected createReflectingCubeGeo(gl: WebGL2RenderingContext)
    {
      this.reflectingCubeBufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1.2);
      this.vaoCube = twgl.createVAOFromBufferInfo(gl,this.twglprograminfo![1], this.reflectingCubeBufferInfo)!;
    }

    parameters: scene.TAnimation1Parameters | undefined; 
    initScene(gl: WebGL2RenderingContext, cap:scene.TAnimation1Parameters, dictpar:Map<string,string>, progenv: twgl.ProgramInfo, sceneReadyCallback: (a:any)=>void | undefined)
    { 
        this.parameters = cap;
        this.parameters.b.move= false;
        this.createReflectingCubeGeo(gl);  
       // console.log("dictpar[r0]="+dictpar.get('radius0'));          
        sceneReadyCallback(0); 
    }

    extendGUI(gui: datgui.GUI)
    { 
      gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
  
    }

     // camera
     public cameraTarget: number[] | undefined;
     public cameraPosition: [number,number,number] | undefined;
  
     
    restorePositionAttributeContext(gl: WebGL2RenderingContext, posBuffer: WebGLBuffer, posAttributeLocation: number, size: number)
    {
      // ==> 2023-03-01 restore this part to solve the clear error
        // 1. Bind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        // 2. Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        //var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(posAttributeLocation, size, type, normalize, stride, offset);
        // 3. Enable this
        gl.enableVertexAttribArray(posAttributeLocation);
        // <==
    }

    drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number) 
    { 
        this.cameraTarget = [0,0,0];
        this.cameraPosition =  [0.1*cam.Position()![0],0.1*cam.Position()![1],0.1*cam.Position()![2]];
        
    // Build a view matrix for the mirror cube.
        var aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
        this.projectionMatrix = twgl.m4.perspective(this.fieldOfViewRadians, aspect, 1, 2000);
        // Build a view matrix.
        var up = [0, 1, 0];
        var cameraMatrix = twgl.m4.lookAt(this.cameraPosition, this.cameraTarget, up);
        this.viewMatrix = twgl.m4.inverse(cameraMatrix);

        var movecube = this.parameters?.movetail;
        var angVelocityCube = 0.005;
        
        // Rotate the cube around the x axis
        if (movecube)
        this.worldMatrix = twgl.m4.axisRotation( [0,1,0] as twgl.v3.Vec3 ,this.parameters!.b.speed! * (time+0.1) * angVelocityCube);
        else 
        this.worldMatrix = twgl.m4.translation([0,0,0]); // twgl.m4.identity();


        // draw the mirror cube
        if (this.viewMatrix==undefined)this.viewMatrix=twgl.m4.identity();
        if (this.projectionMatrix==undefined)this.projectionMatrix=twgl.m4.identity();

      //  gl.useProgram(this.twglprograminfo![1].program);      
        gl.depthFunc(gl.LESS);  // use the default depth test

        gl.bindVertexArray(this.vaoCube!);  
     //   this.restorePositionAttributeContext(gl, this.reflectingCubeBufferInfo!.attribs posBuffer: WebGLBuffer, posAttributeLocation: number, size: number)
     
   //  var bb=this.reflectingCubeBufferInfo!.indices;
   //  if (bb!=null) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bb);
     //var bb=this.reflectingCubeBufferInfo!.attribs![""]!;

        //foreach(()=>)

        twgl.setUniforms(this.twglprograminfo![1]!, {
            u_world: this.worldMatrix,
            u_view: this.viewMatrix,
            u_projection: this.projectionMatrix,
            u_texture: this.texture,
            u_worldCameraPosition: this.cameraPosition,
        });
        twgl.drawBufferInfo(gl, this.reflectingCubeBufferInfo!);
        gl.flush();
    }

        //--- Shaders for the mirrorCoube -------------------------------------------------------------------------

        vsMirrorCube = `#version 300 es
    
        in vec4 a_position;
        in vec3 a_normal;
        
        uniform mat4 u_projection;
        uniform mat4 u_view;
        uniform mat4 u_world;
        
        out vec3 v_worldPosition;
        out vec3 v_worldNormal;
        
        void main() {
          // Multiply the position by the matrix.
          gl_Position = u_projection * u_view * u_world * a_position;
        
          // send the view position to the fragment shader
          v_worldPosition = (u_world * a_position).xyz;
        
          // orient the normals and pass to the fragment shader
          v_worldNormal = mat3(u_world) * a_normal;
        }
        `;
        
        fsMirrorCube = `#version 300 es
        precision highp float;
        
        // Passed in from the vertex shader.
        in vec3 v_worldPosition;
        in vec3 v_worldNormal;
        
        // The texture.
        uniform samplerCube u_texture;
        
        // The position of the camera
        uniform vec3 u_worldCameraPosition;
        
        // we need to declare an output for the fragment shader
        out vec4 outColor;
        
        void main() {
          vec3 worldNormal = normalize(v_worldNormal);
          vec3 eyeToSurfaceDir = normalize(v_worldPosition - u_worldCameraPosition);
          vec3 direction = reflect(eyeToSurfaceDir,worldNormal);
        
          outColor = texture(u_texture, direction);
        }
        `;
    
}
