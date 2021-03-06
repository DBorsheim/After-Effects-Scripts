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



var fileLocation = "C:/Users/Derek/After Effects/01 AE Assets/Font Styler/";
var fontStyleIndexFile = "Font Style Index.txt";

// =========
// PANEL
// =========
var panel1 = createDockableUI(this);
    panel1.orientation = "column"; 

// =========
// FONTGROUP
// =========
var fontGroup = panel1.add("panel", undefined, "Font Styles");
    fontGroup.orientation = "column";
    fontGroup.alignment = ["fill","fill"];

var fontStyleList = fontGroup.add ("listbox");
fontStyles = LoadIndexFiles(fileLocation);
for (var i = 0; i < fontStyles.length; i++)
    fontStyleList.add ("item", fontStyles[i]);

    fontStyleList.selection = 0;
    fontStyleList.active = true;
    fontStyleList.alignment = ["fill","fill"];

var g1 = fontGroup.add("group");
    g1.alignment = ["fill", "bottom"];

var openFolderButton = g1.add ('button', undefined, 'Open Font Folder', {name: 'fontFolder'});
var deleteButton = g1.add ('button', undefined, 'Delete', {name: 'delete'});
var newButton = g1.add ('button', undefined, 'New', {name: 'new'});

openFolderButton.onClick = function() { system.callSystem("explorer " + filePath); };
deleteButton.onClick = function() { deleteFontStyle(fileLocation, fontStyleList.selection.toString())};
newButton.onClick = function() { createFontStyle(); };


// =========
// BUTTONGROUP
// =========
var buttonGroup = panel1.add('group');
    buttonGroup.orientation = "row"; 
    buttonGroup.alignment = [ "right", "bottom"];

var okButton = buttonGroup.add ('button', undefined, 'OK', {name: 'ok'});
var cancelButton = buttonGroup.add ('button', undefined, 'Cancel', {name: 'cancel'});
var applyButton = buttonGroup.add ('button', undefined, 'Apply', {name: 'apply'});

okButton.onClick = function() {app.beginUndoGroup("Apply " + fontStyleList.selection.toString() + " Font Style"); applyFontStyle(fileLocation, fontStyleList.selection.toString()); app.endUndoGroup(); panel1.close()};
cancelButton.onClick = function() { panel1.close() };
applyButton.onClick = function() {app.beginUndoGroup("Apply " + fontStyleList.selection.toString() + " Font Style"); applyFontStyle(fileLocation, fontStyleList.selection.toString()); app.endUndoGroup();};


//===============
showWindow(panel1);



function LoadIndexFiles(fileString)
{
    var thisFile = File(fileString + fontStyleIndexFile);

    if(thisFile.exists)
    {
        thisFile.open("r");
        readData = thisFile.readln();
        thisFile.close();
    }
    else
    {
        alert("No index file found.")
    }

    readData = readData.split(",");

    return readData;
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

    var textProp = layers[0].property("Source Text");
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

function deleteFontStyle(fileString, selectedFont)
{
    var thisFile = File(fileString + selectedFont + ".txt");

    var result = confirm("Are you sure you want to delete \"" + selectedFont + "\"", false);

    if(result)
    {
        thisFile.remove();

        updateIndex(fileString, selectedFont);
    }
}

function createFontStyle()
{
    if(app.project.activeItem.selectedLayers.length == 0)
    {
        Error.runtimeError(9999, "No Text Selected");

    }

    var fontStyleName = prompt ("Font Style Name", "Name");

    checkFile(fileLocation, fontStyleName, fontStyle());
}

function updateIndex(fileString, selectedFont)
{
    indexFile = File(fileString + fontStyleIndexFile);
    indexFile.open("r");
    readData = indexFile.readln();

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

function checkFile(fileString, nameString, data)
{
    var thisFile = File(fileString + nameString + ".txt");

    if(!thisFile.exists)
    {
        thisFile.open("w");
        thisFile.write(data);
        thisFile.close();
        addToIndex(nameString);
    }

    else
    {
        var w2 = new Window ("dialog", "Form");
        w2.orientation = "row";
        var myMessage = w2.add ("statictext", undefined, "There is already a file with this name, do you want to overwrite?");
        var okButton = w2.add ('button', undefined, 'Ok', {name: 'ok'});
        var cancelButton = w2.add ('button', undefined, 'Cancel', {name: 'cancel'});

        okButton.onClick = function() {thisFile.open("w"); thisFile.write(data); thisFile.close(); w2.close()};

        panel1.show();
    }
    
}

function addToIndex(nameString)
{
    var thisFile = File(fileLocation + "Font Style Index.txt");

    if(!thisFile.exists)
    {
        thisFile.open("w");
        thisFile.write(nameString);
        thisFile.close();

    }
    else
    {
        thisFile.open("r");
        readData = thisFile.readln();
        thisFile.open("w");
        thisFile.write(readData + "," + nameString);
        thisFile.close();
    }
    
    fontStyleList.add("item", nameString, fontStyleList.items.length);
}
