///
/// Project Sort
/// Derek Borsheim
/// 
/// Starts Undo group, builds folders and runs moveToFolder function
///

app.beginUndoGroup("Sort Project");

var allItems = app.project.items;
var allItemsLength = allItems.length;

var videoTypes = ["mov", "mp4", "avi", "mts", "mpg", "mxf"];
var vectorTypes = ["ai", "eps"];
var imageTypes = ["png", "jpg", "jpeg", "tiff", "tif", "gif"];
var audioTypes = ["mp3", "wav", "aif", "m4a", "aiff"];

var comps = [];
var precomps = [];
var assetComps = [];

var psds = [];
var psdFolderMain;
var psdFolders = [];
var psdFoldersNames = [];

var vectors = [];
var vectorsFolderMain;
var vectorFolders = [];
var vectorFoldersNames = [];

var videos = [];
var images = [];
var audio = [];
var nullsAndSolids = [];
var missingItems = [];

var precompFolder = null;
var compFolder = null;
var assetCompsFolder = null;

var precompAutoNameMultiple = "Pre-comp"; // Replace with just "Precomp" because the name wont have any other unique names, this only happens when it was precomped and had no name to give it
var precompAutoNameSingle = " Comp"; // Remove to end of the name because when one layer is precomped it adds " Comp 1" to the end and we want to remove that to clean it up
var mainComp = "# "; // Our comp we are renaming could be from a main comp and we need to make sure it doesnt have the hash mark so it doesnt sort as a main comp
var rdcComp = "Ray - ";
var skipComp = "*";

//renamePSD(retrievePSDs());

// Update the item list then remove everything from their folders.
updateItems();
removeItemsFromAllFolders();

// Update the item list then delete all the folders.
updateItems();
removeAllFolders();

// Update the item lists with all the items in the project
retrieveAllItems();


// Make Comps and Precomps folder, nest the Precomps folder into the Comps folder
createFolder(" Compositions", comps);
createFolder("Precomps", precomps);
createFolder("Asset Comps", assetComps);
createFolder(" PSD", psds);
createFolder(" Vector", vectors);
createFolder(" Video", videos);
createFolder(" Images", images);
createFolder(" Audio", audio);
createFolder(" Nulls and Solids", nullsAndSolids);
createFolder(" Missing Items", missingItems);

// Create main psd and vector folders, and put the items into subfolders based off the name of the original file.
// Should in the future use "psds/vectors[1].file.name" to reference the original name
//psdFolderMain = createFolder(" PSD", psds), true;
//sortPSDs(psds);
//vectorFolderMain = createFolder(" Vector", vectors), true;
//sortVectors(vectors);

movePrecompsFolder();
moveAssetCompsFolder();

renameMainCompsCorrectly(comps);
//renamePrecomps(precomps);

app.endUndoGroup();


//------------------------------------------------------------------------------------------------------------------------------------------------


//Update the Item list
function updateItems()
{
	allItems = app.project.items;
	allItemsLength = allItems.length;
}

function retrieveAllItems()
{
	retrieveComps();
	retrieveVideos();
	retrievePSDs();
	retrieveVectors();
	retrieveImages();
	retrieveAudio();
	retrieveNullsAndSolids();
	retrieveMissingItems();
}

// Removes all the items from a folder and puts them in the root
function removeItemsFromAllFolders()
{
	for(var i = 1; i <= allItemsLength ; i++)
	{
		curItem = allItems[i];

		curItem.parentFolder = app.project.rootFolder;
	}

	for(var i = allItemsLength; i >= 1 ; i--)
	{
		curItem = allItems[i];

		curItem.parentFolder = app.project.rootFolder;
	}
}

function removeAllFolders()
{
	for(var i = allItemsLength; i >= 1 ; i--)
	{
		curItem = allItems[i];

		if(curItem.typeName == "Folder")
		{
			if(curItem.numItems == 0)
				curItem.remove();
		}

		updateItems();
	}
}


function movePrecompsFolder()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];
		if(curItem.name == "Precomps" && curItem.typeName == "Folder")
			 precompFolder = curItem;

		if(curItem.name == " Compositions" && curItem.typeName == "Folder")
			 compFolder = curItem;
	}

	if(compFolder !== null && precompFolder !== null)
	{
		precompFolder.parentFolder = compFolder;
		return;
	}
}

function moveAssetCompsFolder()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];
		if(curItem.name == "Asset Comps" && curItem.typeName == "Folder")
			 assetCompsFolder = curItem;

		if(curItem.name == "Compositions" && curItem.typeName == "Folder")
			 compFolder = curItem;
	}

	if(compFolder !== null && assetCompsFolder !== null)
	{
		assetCompsFolder.parentFolder = compFolder;
		return;
	}
}


// Returns the name of the item after a "." (Ex, png, ai, mov)
function checkExtention(fileName)
{
	dotLocation = fileName.lastIndexOf(".");
	return fileName.substring(dotLocation + 1, fileName.length).toLowerCase();
}

// Returns the name of the item without it's extention after a "." (Ex, png, ai, mov)
function removeExtention(fileName)
{
	dotLocation = fileName.lastIndexOf(".");
	return fileName.substring(0, dotLocation);
}

//Create Folder
// If it's just the first argument, just create the folder and update the itemlist
// If there are items listed, then move the items into the folder
function createFolder(folderName, itemArrayForFolder)
{

	if(itemArrayForFolder != null && itemArrayForFolder.length == 0)
		return null;

	var newFolder = app.project.items.addFolder(folderName);

	if(itemArrayForFolder != null)
		moveToFolder(itemArrayForFolder, newFolder);

	updateItems();
	return newFolder;
}

// Move to Folder function.
function moveToFolder(curItemAry, parentFolderObj, returnParentFolder)
{


	if(curItemAry === null)
	{
		//alert("Item was null")
		return;
	}

	if(parentFolderObj === null)
	{
		//alert("Item \"" + curItemAry.name + "\" was fine, but parent was null.")
		return;
	}
	else if(curItemAry instanceof !Array)
	{
		//alert(curItemAry.name + " is NOT an array and goes into \"" + parentFolderObj.name + "\" folder.")

		curItemAry.parentFolder = parentFolderObj;
	}

	else
	{
		//alert(curItemAry.name + " IS an array and goes into \"" + parentFolderObj.name + "\" folder.")
		var aryLength = curItemAry.length;
		for(var i=0; i<aryLength; i++ )
		{
			curItemAry[i].parentFolder = parentFolderObj;
		}
	}

	if(returnParentFolder == true)
	{
		return parentFolderObj;
	}
}

//Collect Comps
function retrieveComps()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];

		if(curItem instanceof CompItem)
		{
			if(curItem.name.substring(0,1) == "*")
				assetComps.push(curItem)
			else if(curItem.name.substring(0,1) != "#")
				precomps.push(curItem)
			else
				comps.push (curItem)
		}
	}
	if(comps.length > 0)
	{
		return comps;
	}
	else
	{
		return null;
	}
}

//Collect AV Items
function retrieveVideos()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];
		itemName = curItem.name;

		for(var x = 0; x <= videoTypes.length; x++)
		{
			if(checkExtention(itemName) == videoTypes[x] && curItem.typeName != "Composition")
				videos.push (curItem);
		}
	}
	if(videos.length> 0)
	{
		return videos;
	}
	else
	{
		return null;
	}
}

//Collect AV Items
function retrievePSDs()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];
		itemName = curItem.name;

		if(checkExtention(itemName) == "psd" && curItem.typeName != "Composition")
			psds.push (curItem);
	}
	if(psds.length> 0)
	{
		return psds;
	}
	else
	{
		return null;
	}
}

//Collect AV Items
function retrieveVectors()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];
		itemName = curItem.name;

		for(var x = 0; x <= vectorTypes.length; x++)
		{
			if(checkExtention(itemName) == vectorTypes[x] && curItem.typeName != "Composition")
				vectors.push (curItem);
		}
	}
	if(vectors.length> 0)
	{
		return vectors;
	}
	else
	{
		return null;
	}
}

//Collect Images
function retrieveImages()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];
		itemName = curItem.name;

		for(var x = 0; x <= imageTypes.length; x++)
		{
			if(checkExtention(itemName) == imageTypes[x])
			{
				if(curItem.typeName == "Composition")
					allItems[i].name = removeExtention(itemName);
				else
					images.push (curItem);
			}
		}
	}
	if(images.length> 0)
	{
		return images;
	}
	else
	{
		return null;
	}
}

//Collect Audio
function retrieveAudio()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];
		itemName = curItem.name;

		for(var x = 0; x <= audioTypes.length; x++)
		{
			if(checkExtention(itemName) == audioTypes[x])
				audio.push (curItem);
		}
	}
	if(audio.length> 0)
	{
		return audio;
	}
	else
	{
		return null;
	}
}

//Collect Missing Items
function retrieveMissingItems()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];
		itemName = curItem.name;

		if(curItem.footageMissing == true)
			missingItems.push (curItem);
	}
	if(missingItems.length> 0)
	{
		return missingItems;
	}
	else
	{
		return null;
	}
}


//Collect Nulls and Solids
function retrieveNullsAndSolids()
{
	for(var i = 1; i <= allItemsLength; i++)
	{
		curItem = allItems[i];

		if(curItem.mainSource instanceof SolidSource && curItem instanceof FootageItem)
			nullsAndSolids.push (curItem);

	}
	if(nullsAndSolids.length> 0)
	{
		return nullsAndSolids;
	}
	else
	{
		return null;
	}
}


//------------------------------------------------------------------------------------------------------------------------------------------------


function sortPSDs (psdItems)
{
	for (var i = 0; i < psdItems.length; i++)
	{
		curItem = psdItems[i];
		itemName = curItem.name;
		slashInd = itemName.lastIndexOf("/");
		dotLocation = itemName.lastIndexOf(".");

		if(slashInd != -1)
		{
			mainPsd = itemName.substring(slashInd + 1, dotLocation);
			thisPsd = itemName.substring(0, slashInd);

			curItem.name = thisPsd + ".psd";

			mainPsdFolderInd = myIndexOf(psdFoldersNames, mainPsd);

			// If the a folder doesnt exist, add it to the name list and create a folder
			if(mainPsdFolderInd == -1)
			{
				//make the folder named after the psd
				var newFolder = createFolder(mainPsd, psdItems[i]);

				// Add this folder to the list of PSD folders
				psdFolders.push(newFolder);

				// Add this folder name to the list of folder names
				psdFoldersNames.push(newFolder.name);

				// Create a variable that knows the index of
				mainPsdFolderInd = myIndexOf(psdFoldersNames, mainPsd);

				psdItems[i].parentFolder =  newFolder;
				newFolder.parentFolder =  psdFolderMain;
				//moveToFolder(newFolder, psdFolderMain);
			}
			
			psdItems[i].parentFolder =  psdFolders[myIndexOf(psdFoldersNames, mainPsd)];
			//moveToFolder(psdItems[i], myIndexOf(psdFoldersNames, mainPsd));
		}
	}
}

function sortVectors (vectorItems)
{


	for (var i = 0; i < vectorItems.length; i++)
	{
		curItem = vectorItems[i];
		itemName = curItem.name;
		slashInd = itemName.indexOf("/");
		dotLocation = itemName.lastIndexOf(".");

		if(slashInd != -1)
		{
			mainVector = itemName.substring(slashInd + 1, dotLocation);
			thisVector = itemName.substring(0, slashInd);

			//curItem.name = thisVector;

			mainVectorFolderInd = vectorFoldersNames.indexOf(mainVector);

			// If the a folder doesnt exist, add it to the name list and create a folder
			if(mainVectorFolderInd == -1)
			{
				vectorFolders.push(createFolder(" " + mainVector, vectorItems));
				vectorFoldersNames.push(mainVector);

				mainVectorFolderInd = vectorFoldersNames.indexOf(mainVector);

				moveToFolder(vectorFolders[mainVectorFolderInd], vectorFolderMain);
			}
			
			moveToFolder(vectorItems[i], vectorFolders[mainVectorFolderInd]);
		}
	}
}



//------------------------------------------------------------------------------------------------------------------------------------------------



function renamePrecomps (comp)
{
	if (comp.length > 1)
	{
		for(var i = 0; i <= comp.length - 1; i++)
		{

			if(comp[i].name.indexOf(rdcComp) == -1 && comp[i].name.indexOf(skipComp) != 0)
			{
				if(comp[i].usedIn.length != 0)
				{
					parentComp = comp[i].usedIn[0].name;
					compName = comp[i].name;

					namesCheck(compName, parentComp);
					comp[i].name = parentComp + " > " + compName;
				}

				if(comp[i].usedIn.length == 0)
				{
					compName = comp[i].name;
					carrotInd = compName.indexOf(" > ");

					if(carrotInd != -1)
						comp[i].name = compName.substring(carrotInd + 3, compName.length);
				}
			}
		}
	}
}

function namesCheck (precomp, parent)
{
	// If the precomp already has a " > " in it, then we need to make sure it is named correctly and if the precomp doesnt match with the parent name, update it
	if(precomp.indexOf(" > ") != -1 && parent != precomp.substring(0, precomp.indexOf(" ") + precomp.substring(precomp.indexOf(""), precomp.length).indexOf(" ")))
		compName = precomp.substring(precomp.indexOf(" > ") + 3, precomp.length);

	else
	{
		// If the precomp was made by selecting mulitple layers AE just names it "Pre-comp #" and increments. If we are making a precomp, we dont want this confusing "-" character and number, so just replace the name of the comp with "Precomp"
		if(precomp.indexOf(precompAutoNameMultiple) != -1)
			compName = "Precomp";

		//Substring the name of the precomp if it has "Name Comp" to remove the " Comp"
		else if(precomp.indexOf(precompAutoNameSingle) != -1)
			compName = precomp.substring(0, precomp.indexOf(precompAutoNameSingle));
	}

	// If the parent has the hashtag indicating a main comp somewhere then substring between the second " " to the end of the parent name. This is to account for "# 04 Comp" or "# 04b comp" to remove everything before the second space character
	if(parent.indexOf(mainComp) != -1)
		parentComp = parent.substring(parent.indexOf(" ") + parent.substring(parent.indexOf(""), parentComp.length).indexOf(" "), parent.length);

	if(parent.indexOf(skipComp) != -1)
		parentComp = parent.substring(parent.indexOf(" ") + parent.substring(parent.indexOf(""), parentComp.length).indexOf(" "), parent.length);

	//If the parent comp has the " > " already somewhere in it's name, just take the last one e.g.; "1a > 2b > 3c > 4d" would just be "4d"
	if(parentComp.indexOf(" > ") != -1)
		parentComp = parentComp.substring(parentComp.lastIndexOf(" > ") + 3, parentComp.length);
}

function renameMainCompsCorrectly(mainComps)
{
	for(var i = 0; i <= mainComps.length - 1; i++)
	{
		if(mainComps[i].name.indexOf("#") == 0 && mainComps[i].name.indexOf(" ") != 1)
			mainComps[i].name = mainComps[i].name.replace("#", "# ");
	}
}

function renamePSD (psdItem) 
{
	if (psdItem == null)
		return;
	for(var i = 0; i <= psdItem.length - 1; i++)
	{
		if(psdItem[i].parentFolder.name != " PSD")
		{
			if(psdItem[i].name.indexOf(".psd") != 0)
			{
				psdItem[i].name = psdItem[i].name.substring(0,psdItem[i].name.indexOf(".psd"));
			}
			psdItem[i].name =  psdItem[i].name + "/" + psdItem[i].parentFolder.name + ".psd";
		}
		//alert(psdItem[i].name + ", name, and the folder it was in" + psdItem[i].parentFolder.name)
	}
}

function myIndexOf(array, stringText)
{
	if(array.length == 0)
		return -1;

	for(var i = 0; i <= array.length; i++)
	{
		if(array[i] == stringText)
			return i;
	}

	return -1;
}
