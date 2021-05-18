///
/// Easing
/// Derek Borsheim
///

// 50% has caused mulitple instances of glitchy behavior, so 50.1%
var easeAmount = 50.1;
var ease = new KeyframeEase(0, easeAmount);

var comp = app.project.activeItem;
var layers = comp.selectedLayers;
var numLayers = layers.length;


loopAllLayers(loopSelectedProps);


function loopAllLayers(functionForEachLayer)
{
	//Loop each layer
	for (var i = 0; i < numLayers; i++)
	{
		functionForEachLayer(layers[i], changeEasing);
	}
}

function loopSelectedProps(layerToLoop, functionForEachProp)
{
	//Loop each property
	numSelectedProps = layerToLoop.selectedProperties.length;

	for (var x = 0; x < numSelectedProps; x++)
	{
		functionForEachProp(layerToLoop.selectedProperties[x]);
	}
}


function changeEasing(selectedProp)
{
	selKeys = selectedProp.selectedKeys;
	
	if(selKeys instanceof Array)
	{
		app.beginUndoGroup("Easing");

		numOfKeyframes = selKeys.length;
	
		for (var k = 0; k < numOfKeyframes; k++)
		{
			keyToChange = selectedProp.selectedKeys[k];
			propertyValueBasedEase(selectedProp,keyToChange);
		}

		app.endUndoGroup();
	}
}


function propertyValueBasedEase(prop,key)
{
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
