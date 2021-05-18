app.beginUndoGroup("Easy Ease");

var easeAmount = prompt ("Ease Amount", "50");

var comp = app.project.activeItem;
var layers = comp.selectedLayers;
var numLayers = layers.length;
var numProperties = 0;
var numKeyframes = 0;

var zeroNum = 0.01;

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
			changeEasing(layers[i].selectedProperties[x])
		}

	}
}


function changeEasing(selectedProp)
{
	numOfKeyframes = selectedProp.selectedKeys.length

	for (var k = 0; k < numOfKeyframes; k++)
	{
		keyToChange = selectedProp.selectedKeys[k];

		if(selectedProp.propertyValueType == PropertyValueType.ThreeD)
			selectedProp.setTemporalEaseAtKey(keyToChange, [ease, ease, ease], [zeroNum, zeroNum, zeroNum]);

		else
			selectedProp.setTemporalEaseAtKey(keyToChange, [ease], [zeroNum]);
	}
}