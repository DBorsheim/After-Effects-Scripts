// Video describing how to save and load data from text strings https://www.youtube.com/watch?v=or6RL_xIMik
// Use this video in the future to create new UI, and set Defaults for the easing
// Possibly create buttons for "default" easings like 33, 50, 75, 90, and 100

app.beginUndoGroup("Easing");

var easeAmount = 50;
//var easeAmount = 50;

var comp = app.project.activeItem;
var layers = comp.selectedLayers;
var numLayers = layers.length;
var numProperties = 0;
var numKeyframes = 0;

if(easeAmount >= 0 && easeAmount <= 100)
{
	var ease = new KeyframeEase(0, easeAmount);

	changeAllKeys();
}


app.endUndoGroup();


function changeAllKeys()
{
	//Loop each layer
	for (var i = 0; i < numLayers; i++)
	{
		numSelectedProps = layers[i].selectedProperties.length;
		numProperties += numSelectedProps;

		for (var x = 0; x < numSelectedProps; x++)
		{
			curLayerProp = layers[i].selectedProperties[x];
			changeEasing(layers[i].selectedProperties[x]);
		}
	}
}


function changeEasing(selectedProp)
{
	selKeys = selectedProp.selectedKeys;
	
	if(selKeys instanceof Array)
	{
		numOfKeyframes = selKeys.length;
	
		for (var k = 0; k < numOfKeyframes; k++)
		{
			keyToChange = selectedProp.selectedKeys[k];
	
			propertyValueBasedEase(selectedProp,keyToChange);
			
		}
	}
}


function propertyValueBasedEase(prop,key)
{
	alert("tes")
	switch(prop.propertyValueType)
	{
		case PropertyValueType.ThreeD:
			prop.setTemporalEaseAtKey(key, [ease, ease, ease], [ease, ease, ease]);
			break;

		case PropertyValueType.TwoD:
			prop.setTemporalEaseAtKey(key, [ease, ease], [ease, ease]);
			break;

		case PropertyValueType.OneD:
			prop.setTemporalEaseAtKey(key, [ease], [ease]);
			break;

		default:
			prop.setTemporalEaseAtKey(key, [ease], [ease]);
			break;
	}
}
