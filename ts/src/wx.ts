import { createServer, IncomingMessage, ServerResponse } from 'http';
import { readFileSync, existsSync } from 'fs';
import { extname } from 'path'

  const port = 1234; // 😍
  
  const mimeTypes: { [key: string]: any } = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.obj': 'text/plain',
    '.mat': 'text/plain',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.ttf': 'aplication/font-sfnt',
    '.eot': 'application/vnd.ms-fontobject',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff'
  };

  const server = createServer((request: IncomingMessage, response: ServerResponse) => 
    {        
      var s: string = request.url!;
      var iq: number = s.indexOf("?");
      if (iq>=0) s=s.substring(0, iq);
      if (s=="/") s = "/index.html";      
      var sext = extname(s);
      var b: boolean = existsSync("."+s) ;
      const filestring = (!b)?"":readFileSync("."+ s);        
      var mimeType = mimeTypes[sext] || 'application/octet-stream';
      console.log("GET ["+s+"] ext=["+sext+"] mimetype=["+mimeType+"]");
      response.writeHead(b?200:404, {'Content-Type': mimeType});
      response.end(filestring );
    });
    
  server.listen(port, () => {
      console.log(`Server listening on port ${port}`);  
  });
