/// Thumbnail Render

var comp = app.project.activeItem;

// add comp to render queue
var item = app.project.renderQueue.items.add(comp);
var outputModule = item.outputModule(1);

// path
var thisFile = new File($.fileName);
var outputFolder = app.project.file.path;

var exportFolder = "02 Renders";

outputFolder = UpFolder(outputFolder, 1);

outputModule.applyTemplate("ProRes RGB+A Audio Off");

fileNameExport = outputModule.file;

alert(thisFile);

outputModule.file = File(outputFolder +  "/" + exportFolder + "/" + comp.name);

// render
//app.project.renderQueue.render();


function UpFolder(filePath, amtOfFolders)
{
	for (var i = 0; i < amtOfFolders; i++) 
	{
		slashLocation = filePath.lastIndexOf("/");
		filePath = filePath.substring(0, slashLocation);
	}

	return filePath;
}