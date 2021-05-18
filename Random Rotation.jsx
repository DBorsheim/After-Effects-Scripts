app.beginUndoGroup("Random Rotation");

var rotAmount = prompt ("Rotation Amount (+/-)", "5");

var comp = app.project.activeItem;
var layers = comp.selectedLayers;
var numLayers = layers.length;
var numProperties = 0;
var numKeyframes = 0;

changeRotation();

app.endUndoGroup();

function changeRotation()
{
	//Loop each layer
	for (var i = 0; i < numLayers; i++)
	{
		layers[i].property("Rotation").setValue(rotAmount * generateRandomNumber() * 2 - (rotAmount/2))
	}
}