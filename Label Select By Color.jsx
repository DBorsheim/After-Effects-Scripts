// Selects layers by the color described in the KBar argument

app.beginUndoGroup("Select Layers by Label");

var colorToLabel = kbar.button.argument;

updateItems();
labelItems();

app.endUndoGroup();

//Update the Item list
function updateItems()
{
	allItems = app.project.items;
	allItemsLength = allItems.length;
	comp = app.project.activeItem;

	allLayers = comp.layers;
	numAllLayers = allLayers.length;

	layers = comp.selectedLayers;
	numLayers = layers.length;
}

function labelItems()
{
	for(var i = 1 ; i <= numAllLayers - 1 ; i++ )
	{
		curItem = allLayers[i];

		if(curItem.label == Number(colorToLabel))
		{
			curItem.selected = true;
		}
	}
}