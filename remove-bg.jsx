/*------------------------------------------------------------------------------------
This scripts is created by Kavindu Pasan Kavithilaka
on 2020-03-15
updated on 2020-12-13
This scripts supports Photoshop CC 2020 and above versions.
How to use the script: https://youtu.be/6ICVsi2pWyk
--------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------
Configure following paramers before running the script
--------------------------------------------------------------------------------------*/
//Place all images needs to be processed in a folder. Add the path below.
var sourceFolder = Folder("C:\\ps\\src");
//Add the path of an existing folder below to save the output.
var saveFolder = new Folder("C:\\ps\\out");
//Fill color of the background
var colorRef = new SolidColor;
colorRef.rgb.red = 255;
colorRef.rgb.green = 255;
colorRef.rgb.blue = 255;
//Set blow to true to make the background transparent.
var isTransparent = true;
//Set below to true to use an image as background
var isImageBg = true;
//If isImageBg is set to true,
//it's required to the background image to be preopened in photohsop
//Backdound image must be the active document
//-----------------------------------------------------------------------------------


//Check if it's selected to use an image as background
	if(isImageBg){
		//Store background image and a variable
		var doc_bg = app.activeDocument;
	}


//Cheks if the source folder is null
  if (sourceFolder != null)
  {
	//The following line will list all files (not only image files) on the source folder.
	//If you have any non-image files (even hidden) , please see the next comment.
    	//var fileList = sourceFolder.getFiles();
	//Comment the above line and uncomment the following line to filter specific file types.
	//Try filter files types if the script fails.
	var fileList = sourceFolder.getFiles(/\.(jpg|jpeg|png|tif|psd|crw|cr2|nef|dcr|dc2|raw|heic)$/i);
  }
  else{
	  alert("No images found on source folder");
  }


//Now this will open every file in the file list
for(var a = 0 ;a < fileList.length; a++){
	//Open file in photoshop    
	app.open(fileList[a]);

	// Select subject
	var idautoCutout = stringIDToTypeID( "autoCutout" );
	var desc01 = new ActionDescriptor();
	var idsampleAllLayers = stringIDToTypeID( "sampleAllLayers" );
	desc01.putBoolean( idsampleAllLayers, false );
	try{
		executeAction( idautoCutout, desc01, DialogModes.NO );
	}
	catch(err){}
	// Invert the selection
	app.activeDocument.selection.invert();


	//Now the background is selected. Next step is to fill or clear the selection.
	if(isTransparent){
		//Make active layer a normal layer.
		activeDocument.activeLayer.isBackgroundLayer = false;
		//Make the selection transparent
		app.activeDocument.selection.clear();
	}
	else{
		app.activeDocument.selection.fill(colorRef);
	}
	
	
	//Check if it's selected to use an image as background
	if(isImageBg){
		//Store main document to a variable
		var main_doc = app.activeDocument;
		//Swich to background image
		app.activeDocument = doc_bg;
		//Copy background to the main image
		app.activeDocument.activeLayer.duplicate(main_doc, ElementPlacement.PLACEATEND);
		//Switch to the main image
		app.activeDocument = main_doc;
	}
	

	//Now the image is proccessed. Next step is saving the image.
	//Create the file name
	var fileName = app.activeDocument.name.replace(/\.[^\.]+$/, ''); 
	pngSaveOptions = new PNGSaveOptions();
	//Edit png options here.
	//Save image as PNG
	app.activeDocument.saveAs(new File(saveFolder +'/'+ Date.now() + "_" + fileName + '.png'), pngSaveOptions, true, Extension.LOWERCASE);
	//Close image whithout saving as PSD
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
