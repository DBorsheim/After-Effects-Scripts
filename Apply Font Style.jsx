function createDockableUI(thisObj) {
	var dialog = thisObj instanceof Panel ? thisObj : new Window("window", undefined, undefined, { resizeable: true });
	dialog.onResizing = dialog.onResize = function()
	{
		this.layout.resize();
	};
	return dialog;
}
function showWindow(myWindow)
{
	if (myWindow instanceof Window)
	{
		myWindow.center();
		myWindow.show();
	}
	if (myWindow instanceof Panel)
	{
		myWindow.layout.layout(true);
		myWindow.layout.resize();
	}
}



var fileLocation = "C:/Derek/_Assets/After Effects/Font Styler/";
var fontStyleIndexFile = "Font Style Index.txt";
var indexFile = File(fileLocation + "Font Style Index.txt");

fontStyles = LoadIndexFiles(fileLocation);
fontProjects = SortByProject(fontStyles);

// =========
// PANEL
// =========
var panel0 = createDockableUI(this);
	panel0.orientation = "column"; 
	panel0.margins = 10;

// =========
// PANEL
// =========
var group1 = panel0.add("group", undefined, undefined, {name: "group1"}); 
	group1.orientation = "column";
	group1.alignment = ["fill","fill"];


// GROUP2
// ======
var group2 = group1.add("group", undefined, {name: "group2"}); 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","center"]; 
    group2.spacing = 10; 
    group2.margins = 0; 
    group2.alignment = ["fill","top"]; 

var statictext1 = group2.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Project:"; 

var dropdown1_array = fontProjects; 
var dropdown1 = group2.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array}); 
    dropdown1.selection = 0; 
    dropdown1.preferredSize.width = 200; 
		dropdown1.alignment = ["fill","top"]; 


var fontStyleList = group1.add ("listbox");
for (var i = 0; i < fontStyles.length; i++)
	fontStyleList.add ("item", fontStyles[i]);

	fontStyleList.selection = 0;
	fontStyleList.active = true;
	fontStyleList.alignment = ["fill","fill"];

var g1 = group1.add("group");
	g1.alignment = ["fill", "bottom"];
	g1.alignChildren = [ "fill", "bottom"];

var openFolderButton = g1.add ('button', undefined, 'Open Font Folder', {name: 'fontFolder'});
var deleteButton = g1.add ('button', undefined, 'Delete', {name: 'delete'});
var newButton = g1.add ('button', undefined, 'New', {name: 'new'});
var renameButton = g1.add ('button', undefined, 'Rename', {name: 'rename'});

openFolderButton.onClick = function() { system.callSystem("explorer " + filePath); };
deleteButton.onClick = function() { deleteFontStyleButton()};
newButton.onClick = function() { createFontStyleButton(); };
renameButton.onClick = function() { renameFontStyleButton(); };

var divider1 = group1.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 


// BUTTONGROUP
// ===========
var group3 = group1.add("group", undefined, {name: "buttonGroup"}); 
    group3.orientation = "row"; 
    group3.alignChildren = [ "fill", "bottom"];
    group3.spacing = 13; 
    group3.margins = 0; 
    group3.alignment = [ "fill", "bottom"];

var applyButton = group3.add("button", undefined, undefined, {name: "applyButton"}); 
		applyButton.text = "Apply"; 

var checkbox1 = group3.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
    checkbox1.text = "Apply on Selection"; 

var settingsButton = group3.add("button", undefined, undefined, {name: "settingsButton"}); 
    settingsButton.text = "Settings"; 

applyButton.onClick = function() {app.beginUndoGroup("Apply " + fontStyleList.selection.toString() + " Font Style"); applyFontStyle(fileLocation, fontStyleList.selection.toString()); app.endUndoGroup();};

dropdown1.onChange = function() {
	FindProjectFonts(dropdown1.selection.toString());
}

fontStyleList.onChange = function() {
	if(checkbox1.value == true)
	{
		app.beginUndoGroup("Apply " + fontStyleList.selection.toString() + " Font Style");
		applyFontStyle(fileLocation, fontStyleList.selection.toString());
		app.endUndoGroup();
	}
};

//===============
showWindow(panel0);



function LoadIndexFiles(fileString)
{
	if(indexFile.exists)
	{
		indexFile.open("r");
		readData = indexFile.readln();
		indexFile.close();
	}
	else
	{
		alert("No index file found.")
	}

	readData = readData.split(",");

	return readData;
}

function SortByProject (fonts) {
	projectsFound = ["All"];
	for (var i = 0; i < fonts.length; i++)
	{
		spaceSeparated = fonts[i].split(" ");

		// add the first project
		if(i == 0)
		{
			projectsFound.push(spaceSeparated[0]);
		} else {
			for (var j = 0; j < projectsFound.length; j++)
			{
				// if project matches one of the projects then just skip adding it
				if(spaceSeparated[0] == projectsFound[j])
				{
					j = projectsFound.length;
				}
				// if we get to the end then it must be new
				if(j == projectsFound.length-1)
				{
					projectsFound.push(spaceSeparated[0]);
				}
			}
		}
	}
	return projectsFound;
}

function FindProjectFonts(projectName){
	fontStyleList.removeAll();
	if(projectName == "All")
	{
		for (var i = 0; i < fontStyles.length; i++)
			fontStyleList.add ("item", fontStyles[i]);
	}else{
		newFontList = [];
		for (var i = 0; i < fontStyles.length; i++)
		{
			if(fontStyles[i].split(" ")[0] == projectName)
			{
				fontStyleList.add ("item", fontStyles[i]);
			}
		}
	}
}

function applyFontStyle(fileString, selectedFont)
{
	var thisFile = File(fileString + selectedFont + ".txt");

	if(thisFile.exists)
	{
		thisFile.open("r");
		readData = thisFile.readln();
		thisFile.close();
	}
	else
	{
		alert(fileString + selectedFont + ".txt" + " File not found.")
	}

	itemData = readData.split(",");
	var comp = app.project.activeItem;
	var layers = comp.selectedLayers;
	var numLayers = layers.length;

	for (var i = 0; i < numLayers; i++)
	{
		var textProp = layers[i].property("Source Text");
		var textDocument = textProp.value;

		textDocument.fontSize = parseInt(itemData[0]);
		textDocument.fillColor = [ parseFloat(itemData[1]), parseFloat(itemData[2]), parseFloat(itemData[3]) ];
		textDocument.strokeColor = [ parseFloat(itemData[4]),parseFloat(itemData[5]),parseFloat(itemData[6]) ];
		textDocument.strokeWidth = parseInt(itemData[7]);
		textDocument.font = itemData[8].toString();
		textDocument.strokeOverFill = (itemData[9] == "true");
		textDocument.applyStroke = (itemData[10] == "true");
		textDocument.applyFill = (itemData[11] == "true");
		//textDocument.justification = parseInt(itemData[12]);
		textDocument.tracking = parseInt(itemData[13]);

		textProp.setValue(textDocument);
	}
}

function deleteFontStyleButton()
{
	selectedFont = fontStyleList.selection.toString();

	if(selectedFont != null)
	{
		var result = confirm("Are you sure you want to delete \"" + selectedFont + "\"", false);

		if(result)
			deleteFontFile(selectedFont);
	}
	else
	{
		Error.runtimeError(9999, "A font is not selected.");
	}
}

function createFontStyleButton()
{
	if(app.project.activeItem.selectedLayers.length == 0)
	{
		Error.runtimeError(9999, "No Text Selected");

	}

	var fontStyleName = prompt ("Font Style Name", "Name");

	if (fontStyleName)
		checkFile(fontStyleName, fontStyle());
}

function renameFontStyleButton()
{
	if(app.project.activeItem.selectedLayers.length == 0)
	{
		Error.runtimeError(9999, "No Text Selected");
	}

	var fontStyleName = prompt ("Font Style Name", fontStyleList.selection.toString());

	renameFontFile(fontStyleList.selection.toString(), fontStyleName);
}

function updateIndex(fileString, selectedFont)
{
	indexFile.open("r");
	readData = indexFile.readln();
	indexFile.close();

	itemData = readData.split(",");

	var newItemData = "";

	//alert(itemData.length)
	for(var i = 0; i < itemData.length; i++)
	{
		if(itemData[i] == selectedFont)
		{
			itemData.splice(i,1);
		}
	}
	//alert(itemData.length)

	for(var i = 0; i < itemData.length; i++)
	{
		//alert(itemData[i])
		if(i == itemData.length -1)
			newItemData += itemData[i].toString();
		else if(itemData[i].toString() != "")
		{
			//alert(itemData[i].toString() + i)
			newItemData += itemData[i].toString() + ",";
		}
		
	}

	//alert(newItemData)

	indexFile.open("w");
	indexFile.write(newItemData);
	indexFile.close();

	fontStyleList.remove(fontStyleList.selection);
}

///==================================================

///         Create Font Style Functions

///==================================================

function fontStyle()
{
	var comp = app.project.activeItem;
	var layers = comp.selectedLayers;

	var textProp = layers[0].property("Source Text");
	var textDocument = textProp.value;

	var strokeColor = textDocument.applyStroke ? textDocument.strokeColor : [0,0,0];

	return [textDocument.fontSize,
			textDocument.fillColor,
			strokeColor,
			textDocument.strokeWidth,
			textDocument.font,
			textDocument.strokeOverFill,
			textDocument.applyStroke,
			textDocument.applyFill,
			//textDocument.text,
			textDocument.justification,
			textDocument.tracking
			];

}

function checkFile(nameString, data)
{
	var thisFile = File(fileLocation + nameString + ".txt");

	if(!thisFile.exists)
	{
		createFontFile(nameString, data)
	}

	else
	{
		var w2 = new Window ("dialog", "Form");
		w2.orientation = "row";
		var myMessage = w2.add ("statictext", undefined, "There is already a file with this name, do you want to overwrite?");
		var okButton = w2.add ('button', undefined, 'Ok', {name: 'ok'});
		var cancelButton = w2.add ('button', undefined, 'Cancel', {name: 'cancel'});

		okButton.onClick = function() {thisFile.open("w"); thisFile.write(data); thisFile.close(); w2.close()};

		group1.show();
	}
	
}


function addToIndex(nameString)
{
	if(!indexFile.exists)
	{
		indexFile.open("w");
		indexFile.write(nameString);
		indexFile.close();

	}
	else
	{
		indexFile.open("r");
		readData = indexFile.readln();
		indexFile.close();
		indexFile.open("w");
		indexFile.write(readData + "," + nameString);
		indexFile.close();
	}
	
	fontStyleList.add("item", nameString, fontStyleList.items.length);
}


function createFontFile(fontStyleName, fontData)
{
	var thisFile = File(fileLocation + fontStyleName + ".txt");

	thisFile.open("w");
	thisFile.write(fontData);
	thisFile.close();
	addToIndex(fontStyleName);
}




function deleteFontFile(fontToDelete)
{
	var thisFile = File(fileLocation + fontToDelete + ".txt");

	thisFile.remove();

	updateIndex(fileLocation, fontToDelete);
}




function renameFontFile(oldNameString, newNameString)
{
	var oldFile = File(fileLocation + oldNameString + ".txt");
	var newFile = File(fileLocation + newNameString + ".txt");

	if(oldFile.exists)
	{
		oldFile.open("r");
		fontFileData = oldFile.readln();
		oldFile.close();

		deleteFontFile(oldNameString);

		createFontFile(newNameString, fontFileData);

		group1.show();
	}
	
}
