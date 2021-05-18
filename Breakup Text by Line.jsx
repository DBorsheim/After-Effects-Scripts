app.beginUndoGroup("Breakup Text by Line");

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
	curText =  textDocument.text.split("\r");
	if(curText.length == 1)
	{
		return;
	}

	for (var x = 0; x < curText.length; x++)
	{
		if(x == 0)
		{

			curLayer.property("Source Text").setValue(curText[x]);
			//alert(curText[i])
		}

		else
		{
			NewText(curText[x], x);
		}


	}
}

function NewText(newText, indexOf)
{

	newLayer = layers[i].duplicate();
	newLayer.property("Source Text").setValue(newText);
	newLayer.property("Position").setValue(layers[i].property("Position").value - [0,-leading*indexOf]);
}