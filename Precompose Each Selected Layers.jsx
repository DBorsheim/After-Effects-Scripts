app.beginUndoGroup("Precompose Each Selected Layers");

updateItems();

var startingNum = parseInt(prompt("Number to Start At", "01"));

SelectedLayersIndicies();

app.endUndoGroup();

//Update the Item list
function updateItems()
{
	allItems = app.project.items;
	allItemsLength = allItems.length;
	comp = app.project.activeItem;

	allLayers = comp.layers;
	numAllLayers = allLayers.length;

	selectedLayers = comp.selectedLayers;
	numLayers = selectedLayers.length;
}

function SelectedLayersIndicies()
{
	for(var i = 0; i < numLayers; i++)
	{
		curItem = selectedLayers[i];

		x = i + startingNum;

		duration = curItem.outPoint - curItem.inPoint;

		precompName = PadZero(x.toString());

		precomp = app.project.activeItem.layers.precompose([curItem.index], precompName, true);

		comp.layer(precompName).startTime = precomp.layer(1).inPoint;

		precomp.displayStartTime = 0;

		precomp.layer(1).startTime -= precomp.layer(1).inPoint;

		precomp.duration = duration;

	}
}

function PadZero(num)
{
	if(num.length == 1)
		num = "0" + num;
	return num;
}