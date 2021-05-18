// Labels the selected layers the color described in the KBar argument

app.beginUndoGroup("Change Label Color");

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
	layers = comp.selectedLayers;
	numLayers = layers.length;
}

function labelItems()
{
	for(var i = 0 ; i <= numLayers - 1 ; i++ )
	{
		curItem = layers[i];

		curItem.label = Number(colorToLabel);
	}
}