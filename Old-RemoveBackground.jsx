var sourceFolder = Folder("C:\\ps\\src");

  if (sourceFolder != null)
  {
     var fileList = sourceFolder.getFiles();
	 //comment the above line and uncomment the following line to filter specific file types. the script will not work if you have any non-image file in the src folder so try filtering files types if the script fails.
	 // var fileList = sourceFolder..getFiles(/\.(jpg|tif|psd|crw|cr2|nef|dcr|dc2|raw|heic)$/i);
  }

for(var a = 0 ;a < fileList.length; a++){
    
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



// Create a color to be used with the fill command

var colorRef = new SolidColor

colorRef.rgb.red = 255

colorRef.rgb.green = 255

colorRef.rgb.blue = 255



// Now apply fill to the current selection

app.activeDocument.selection.fill(colorRef)








var saveFolder = new Folder("C:\\ps\\out"); //enter path for where you want the file saved

var fileName = app.activeDocument.name.replace(/\.[^\.]+$/, ''); 
saveJPG (new File(saveFolder +'/'+ Date.now() + "_" + fileName + '.jpg'),12);
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
//fileList[a].remove();
 }

function saveJPG(saveFile, jpegQuality) {

    saveFile = (saveFile instanceof File) ? saveFile : new File(saveFile);

    jpegQuality = jpegQuality || 12;

    var jpgSaveOptions = new JPEGSaveOptions();

    jpgSaveOptions.embedColorProfile = true;

    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;

    jpgSaveOptions.matte = MatteType.NONE;

    jpgSaveOptions.quality = jpegQuality;

    activeDocument.saveAs(saveFile, jpgSaveOptions, true, Extension.LOWERCASE);

}