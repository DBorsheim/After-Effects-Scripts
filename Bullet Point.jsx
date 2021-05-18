app.beginUndoGroup("Bullet Point");

updateItems();

var bullet = "•";

addBulletToSelectedLayers()

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

function addBulletToSelectedLayers()
{
	for(var i = 0; i < numLayers; i++)
	{
		curItem = layers[i];

		if(curItem.matchName == "ADBE Text Layer")
		{
			curText = curItem.property("Source Text");
			textDocument = curText.value;

			textDocument.text = bullet + textDocument.text;

			curText.setValue(textDocument);
		}
	}
}