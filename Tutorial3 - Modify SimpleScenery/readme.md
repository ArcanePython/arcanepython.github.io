
  <html><body><b>How to open a scenery project and show it in MSFS</b><br><br>
  
  Always, first start a flight in MSFS. Projects can only be opened when you start a flight, because that initializes BING.</br>
  The example project is located at EHMD Malden Airfield in the Netherlands. <br><br>
  
  So it is best to start loading <b>EHMD Malden Airfield</b>. Then go General Options an set Developer mode.<br><br> 
  
  <img src="00a_GoMalden.JPG" style="width: 75%; height: 75%"><br>
  
  <a href="../MySimpleScenery/MySimpleScenery.zip">Click here to download the checkers cube scenery in MSFS project format</a><br><br>

  I placed the project files in MSFS SDK\Samples, but you could unpack the zipfile anywhere else on your disk.<br> 
  Below overview shows the directories and files in the Example project<br>
  
  <img src="00_MySceneryProjectDir0.JPG"><br><br>
  
  Now, open the project in MSFS,<br>
  <img src="01_MySceneryProjectLoad.JPG" style="width: 75%; height: 75%">
  <br/><br/>
  Make sure you open the console,<br>
  <img src="02_MySceneryProjectWindowConsole.JPG" style="width: 75%; height: 75%">
  <br/><br/>
  .. and CLEAR the console,<br>
  <img src="03_MySceneryProjectWindowClearConsole.JPG" style="width: 75%; height: 75%">
  <br/><br/>
  Then click <b>Project - Build</b>  <br>
   <img src="04_MySceneryProjectWindowBuild.JPG" style="width: 75%; height: 75%">
  <br/><br/>
  .. and check the console. If it shows errors, clear it again and Project - Build, the console should have 0 errors.<br>
  <br/><br/>
  Then, open the Scenery editor via Menu Tools Scenery Editor,<br>
   <img src="05_MySceneryProjectSceneryEditor.JPG" style="width: 75%; height: 75%">
  <br/><br/>
  When it is enabled, click <b>Load this assset group</b>, else use Select to select the Asset.<br>
  <img src="07_MySceneryProjectSceneryEditorLoading.JPG" style="width: 75%; height: 75%"></img>
  <br/><br/>
  .. the scenery is now loading.. <b>WAIT</b> for this.. when it is finished, you will see the checkers cube<br>
  <img src="08_MySceneryProjectSceneryEditorLoaded.JPG" style="width: 75%; height: 75%"></img>  
  <br/><br/>
  Now, in the Scenery Editor, select menu <b>View - Objects</b><br>
  <img src="09_MySceneryProjectSceneryEditorViewObjects.JPG" style="width: 75%; height: 75%"></img>
  <br/><br/>
Find your object, by typing the name in the search box. Select it. Then check <b>"One-click placing"</b><br>
<img src="10_MySceneryProjectSceneryEditorObjectPlace.JPG" style="width: 75%; height: 75%"></img>
  <br/><br/>
  To place an object, <b>left mouse button</b>. Uncheck One-click placing for now. We'll not repeat placement.<br>
  <br>
   Left-click on your object. Using keys W and R you can move and rotate the object..<br>
  <img src="11_MySceneryProjectSceneryEditorObjectPlaceMove.JPG" style="width: 75%; height: 75%"></img>
  <br/><br/>
  In order to place save your scenery, that is place your object permanently, issue <b>Save Scenery</b><br>
  <img src="12_MySceneryProjectSceneryEditorSaveScenery.JPG" style="width: 75%; height: 75%"></img>
  .. and now repeat: <b>Project - Build</b><br><br>
  After doing this, you could leave SDK mode and fly around. Your scenery will remain where it is..<br>
  
  <br><br>
  <b>How to modify the example project</b><br><br>
  Below slides will explain how to add your own Blender design into MSFS

  Load the landart example you have downloaded in Tutorial #2 (the example Blender Land Art object <b>FancyShape2L.blend</b>)
  
  <img src="43a_OpenBlenderExportFancy.JPG">
  
  In Blender, you can now modify this object at will. For now, we'll export it to MSFS right away.
  To do that, select both the violet Object and the Light
  
  <img src="43b_OpenBlenderFancySelectObjectAndLight.JPG">
  
  Go File menu, select Export. You'll get options to export glBT to MSFS. If you don't get this export option, check Tutorial #2 and download the addin for Blender.
  
   <img src="43c_OpenBlenderFancyExportToMSFS.JPG">
   
  On the right, some options are shown. Make sure you
    - click the XML option
    - fillin the name of your object as XML name (in this case: FancyShape2L)
    - Check the option to export selected objects

   <img src="43d_OpenBlenderFancyFillinXMLNameOptions.JPG">

  Now click <b>Export to GLB 2.0 for MSFS</b>. Put the three result files into a new subdirectory PackageSources\Modellib\FancyShape2L in the MSFS project.
  
  <img src="44_MySceneryProjectAddedModelLib.JPG">
  
  When you now go back to MSFS, close and Open the project and follow above procedure again, you will find FancyShape2L
  in the objects box and you'll be able to place it !
  
 <br><br>
  <b>How to export to Community</b><br><br>
    
  When you want to re-use your scenery every time MSFS is loaded, you can use the Project Editor <b>Export</b> option, which<br>
  will create a ready made ZIP-file for Community in \Packages folder in your project.<br> 


  </body></html>


