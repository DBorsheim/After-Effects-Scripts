// ----Copy to Comp----
// This script will copy a layer (or all layers) out of a specified comp and into the active comp.
//
// This currently uses KBar arguments.
// If there's no comma, there's only one argument in Kbar.
//  - One argument means copy all layers from comp (kbarArg).
//  - Two arguments (separated by ",") means copy the specific layer out of the comp.
// 
// ----Example----
// kbarArg = "foo,bar";
// compToFind = "foo";
// layerToFind = "bar";
// 
// This is used with IOKTBS
// * Text Gradient (to copy),* Text Gradient
// 

//------------------------------------------------
// Variables
//------------------------------------------------

var errors;

var currentComp = app.project.activeItem;
var allItems = app.project.items;
var allItemsLength = allItems.length;

var currentCompNumLayers = currentComp.layers.length;
var numOfCopiedLayers = 1;

deselectAllLayers();

// We grab the playhead so we can copy the layer to the playhead
var playhead = currentComp.time;

var kbarArg = kbar.button.argument;
var commaIndex = kbarArg.indexOf(",");

// Comma was found, we will copy the just one layer.
if(commaIndex > -1)
{
	var compToFind = kbarArg.substring(0, commaIndex);
	var layerToFind = kbarArg.substring(commaIndex + 1, kbarArg.length);
}
// No comma found, so we'll copy all the layers.
else
{
	var compToFind = kbarArg;
	var layerToFind = null;
}

//------------------------------------------------
// Main Script
//------------------------------------------------

try
{
	main();
}
catch (err)
{
	if(errors != null)
		alert("Error\n\n" + errors);
	else
		alert("Error\n  Attempted to copy:\n  " + layerToFind + "\n\nOut of: \n" + compToFind);
}


function main()
{
	// Look through all project items for a comp with the right name
	var foundComp = findComp();

	if(foundComp == null)
		return;

	if(layerToFind == null)
	{
		// ISSUE - Cant copy over parent information
		// possible solution - unparent the layer in the copy we're copying from, copy it, reparent it, store the parent information,
		// then once all the layers are copied into the new comp, use the parent information.
		// This could also cause problems with the tranforms from parenting and unparenting.
		// app.project.item(index).layer(index).setParentWithJump([newParent])
		// This may also help
		// lol just fixed it
		// lol or not
		// lol or I did, you cant have locked layers either
		// we could fix that by unlocking them first then locking them back, but I really dont care to right now haha
		// I DID end up fixing it lol
		app.beginUndoGroup("Copy to Comp");
		newOriginalParents = [];
		numLayers = foundComp.layers.length;
		numOfCopiedLayers = numLayers;
		for (var i = numLayers; i >= 1; i--)
		{
			curItem = foundComp.layers[i];
			curItemParent = curItem.parent;
			newOriginalParents.push(curItemParent);

			copyLayertoComp(curItem, currentComp);
			//currentComp.layer[i].selected = true;
		}

		reparentNewLayers();

	}
	else
	{
		var foundLayer = findLayer(foundComp)
		if(foundLayer == null)
		{
			return;
		}
		app.beginUndoGroup("Copy to Comp");
		copyLayertoComp(foundLayer, currentComp);
	}

	reselectNewLayers();
	app.endUndoGroup();
}

//------------------------------------------------
// Work Functions
//------------------------------------------------

function findComp()
{
	for (var i = 1; i < allItemsLength; i++)
	{
		curItem = allItems[i];
		if(curItem.typeName != "Composition")
			continue;
		if (curItem.name == compToFind)
		{
			return curItem;
		}
	}
	errors = "Couldn't find the comp:\n  " + compToFind;
	exit;
}

function findLayer(compToSearch)
{
	var compLayers = compToSearch.layers;
	var numLayers = compLayers.length;
	for (var i = 1; i <= numLayers; i++)
	{
		curItem = compLayers[i];
		if (curItem.name == layerToFind)
		{
			return curItem;
		}
	}
	errors = "Couldn't find the layer:\n  " + layerToFind + "\n\nIn the comp:\n  " + compToSearch.name;
	exit;
}

function copyLayertoComp(layerToCopy, compToCopyTo)
{
	originalParent = layerToCopy.parent;
	layerToCopy.setParentWithJump(null);
	layerToCopy.copyToComp(compToCopyTo);
	layerToCopy.setParentWithJump(originalParent);
	compToCopyTo.layers[1].startTime += playhead;
}

function reparentNewLayers()
{
	numLayers = newOriginalParents.length;
	for (var i = 1; i <= numLayers; i++)
	{
		x = numLayers - i;
		if(newOriginalParents[x] != null)
			currentComp.layers[i].setParentWithJump(currentComp.layers[newOriginalParents[x].index]);
	}
}

function deselectAllLayers()
{
	selLayers = currentComp.selectedLayers;
	for (var i = 0; i < selLayers.length; i++) 
	{
		selLayers[i].selected = false;
	}
}

function reselectNewLayers()
{
	for (var i = 1; i <= numOfCopiedLayers; i++)
	{
		currentComp.layers[i].selected = true;
	}
}