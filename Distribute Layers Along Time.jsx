app.beginUndoGroup("IOKTBS Default Clip Settings");

updateItems();

app.endUndoGroup();

//Update the Item list
function updateItems()
{
	allItems = app.project.items;
	allItemsLength = allItems.length;
	comp = app.project.activeItem;

	allLayers = comp.layers;
	numAllLayers = allLayers.length;

	selLayers = comp.selectedLayers;
	numLayers = selLayers.length;

	firstInPoint = 1000000;
	lastOutPoint = 0;
	layerDuration = 0;

	//find first in point
	
	for(var i = 0; i < numLayers; i++)
	{
		firstInPoint = selLayers[i].inPoint < firstInPoint ? selLayers[i].inPoint : firstInPoint;
	}

	//find last out point
	for(var i = 0; i < numLayers; i++)
	{
		lastOutPoint = selLayers[i].outPoint > lastOutPoint ? selLayers[i].outPoint : lastOutPoint;
	}

	//find the duration the layers should be, outpoint - inpoint divided by the amount of selected layers
	layerDuration = (lastOutPoint - firstInPoint)/numLayers;

	//take second layer change inpoint to firstInPoint + (duration * selLayer.index)
	//change outpoint to inpoint + duration
	//do same for remaining layers
	for(var i = 0; i < numLayers; i++)
	{
		curLayerInPoint = firstInPoint + (layerDuration * i);

		selLayers[i].inPoint = curLayerInPoint;
		selLayers[i].outPoint = curLayerInPoint + layerDuration;

	}

}