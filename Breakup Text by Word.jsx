app.beginUndoGroup("Breakup Text by Word");

var comp = app.project.activeItem;
var layers = comp.selectedLayers;
var numLayers = layers.length;
var leading;

//Loop each layer
for (var i = 0; i < numLayers; i++)
{
	if(layers[i].sourceText != null)
		ParseText(layers[i]);
}

app.endUndoGroup();

function ParseText(curLayer)
{
	textProp = curLayer.property("Source Text");
	textDocument = textProp.value;

	leading = textDocument.leading * (curLayer.property("Scale").value[0]/100);
	curText =  textDocument.text.split(" ");
	var textLayers = new Array();
	if(curText.length == 1)
	{
		return;
	}

	for (var x = 0; x < curText.length; x++)
	{
		if(x == 0)
		{
			textLayers.push(curLayer);
			curLayer.property("Source Text").setValue(curText[x]);
			//alert(curText[i])
		}

		else
		{
			NewText(curText[x], x, textLayers);
		}


	}
}

function NewText(newText, indexOf, textLayers)
{

	newLayer = layers[i].duplicate();
	textLayers.push(newLayer);
	newLayer.property("Source Text").setValue(newText);
	newLayer.property("Position").setValue(textLayers[indexOf-1].property("Position").value + [textLayers[indexOf-1].sourceRectAtTime(0,true).width/2,0]);
}