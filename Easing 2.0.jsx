// Video describing how to save and load data from text strings https://www.youtube.com/watch?v=or6RL_xIMik
// Use this video in the future to create new UI, and set Defaults for the easing
// Possibly create buttons for "default" easings like 33, 50, 75, 90, and 100

var easeFileLocation = "C:/data/easing";

checkFile(easeFileLocation, 50);

var defaultEase = loadFile(easeFileLocation);

if (defaultEase == undefined)
{
	defaultEase = 50;
}

//UI
var mainWindow = new Window("palette", "Text Style", undefined, {resizeable: true});
var easeAmountBox = mainWindow.add("edittext", [0,0,150,25], defaultEase);
easeAmountBox.active = true;
var makeDefault = mainWindow.add("checkbox", undefined, "Make Default");
var applyButton = mainWindow.add("button", undefined, "OK");
//var applyButton = mainWindow.add("button", undefined, "Apply");

mainWindow.center();
mainWindow.show();

applyButton.onClick = function () { app.beginUndoGroup("Easing"); beginEasing(); app.endUndoGroup(); };




//var easeAmount = prompt ("Ease Amount", defaultEase);

function beginEasing () 
{
	var comp = app.project.activeItem;
	var layers = comp.selectedLayers;
	var numLayers = layers.length;


	easeAmount = parseFloat(easeAmountBox.text);
	var ease = new KeyframeEase(0, easeAmount);
	if(makeDefault == true)
		setDefault(easeFileLocation, easeAmount);

	changeAllKeys();
}


function changeAllKeys()
{
	//Loop each layer
	for (var i = 0; i < numLayers; i++)
	{
		alert(i);
		numSelectedProps = layers[i].selectedProperties.length;
		numProperties += numSelectedProps;

		for (var x = 0; x < numSelectedProps; x++)
		{
			changeEasing(layers[i].selectedProperties[x])
		}

	}
}


function changeEasing(selectedProp)
{
	numOfKeyframes = selectedProp.selectedKeys.length

	

	for (var k = 0; k < numOfKeyframes; k++)
	{
		keyToChange = selectedProp.selectedKeys[k];

		if(selectedProp.propertyValueType == PropertyValueType.ThreeD)
			selectedProp.setTemporalEaseAtKey(keyToChange, [ease, ease, ease], [ease, ease, ease]);

		else
			selectedProp.setTemporalEaseAtKey(keyToChange, [ease], [ease]);
	}
}

function loadFile(fileString)
{
	var readData;
	thisFile = File(fileString + ".txt");
	thisFile.open("r");
	readData = thisFile.readln();
	thisFile.close();

	return readData;
}

function checkFile(fileString, data)
{
	var thisFile = File(fileString + ".txt");

	if(!thisFile.exists){
		thisFile.open("w");
		thisFile = new File(fileString + ".txt");
		thisFile.write(data);
		thisFile.close();
	} 
}

function setDefault(fileString, data)
{
	alert("making default");
	var thisFile = File(fileString + ".txt");
	thisFile.open("w");
	thisFile.write(data);
	thisFile.close();
}