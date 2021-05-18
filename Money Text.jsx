app.beginUndoGroup("Money Text");

var comp = app.project.activeItem;
var layers = comp.selectedLayers;
var numLayers = layers.length;

var moneyExpression = "spacer = \",\";\
decimal = \".\";\
prefix = \"$\";\
\
isPrefixed = (effect(\"Show Prefix\")(\"Checkbox\") == 1 ? prefix : \"\");\
amount = effect(\"Amount\")(\"Slider\");\
\
function convertToMoney(amount) {\
	var _sign, _prefix;\
	_sign = \"\";\
	_prefix = ((isPrefixed) ? prefix : \"\");\
\
	// Removing the negative\
	if (amount < 0) {\
	_sign = \"-\";\
	amount = -amount;\
\
	}\
\
	amount = parseFloat(amount).toFixed(2);\
\
	amount = amount.toString().replace(/./g, function(character, index, array) {\
	if(character === \".\") {\
		return decimal;\
	} else if ((array.length - index) % 3 || index === 0) {\
		return character;\
	} else {\
		return spacer + character;\
	}\
	});\
\
	return _sign + _prefix + amount;\
}\
\
convertToMoney(amount);\
";


for (var i = 0; i < numLayers; i++)
{
	layers[i].text.sourceText.expression = moneyExpression;
	effectsProperty =  layers[i].property("Effects");
	var slider = effectsProperty.addProperty("ADBE Slider Control");
	slider.name = "Amount";
	slider("Slider").setValue(100);

	var checkbox = effectsProperty.addProperty("ADBE Checkbox Control");
	checkbox.name = "Show Prefix";
	checkbox("Checkbox").setValue(1);

	layers[i].name = "Money " + (i + 1);
}

app.endUndoGroup();