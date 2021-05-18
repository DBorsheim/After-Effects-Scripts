app.beginUndoGroup("Make Main Comp");

var comp = app.project.selection;
var mainComp = "# ";

if (comp.length <= 1)
{
	comp = app.project.activeItem;
	
	if(comp.name.indexOf(mainComp) == -1)
			comp.name = "# " + comp.name;

	else
		comp.name = comp.name.replace(mainComp, "");
}
else
{
	for(var i = 0; i <= comp.length; i++)
	{

		if(comp[i].name.indexOf(mainComp) == -1)
			comp[i].name = "# " + comp[i].name;

		else
			comp[i].name = comp[i].name.replace(mainComp, "");
	}
}

app.endUndoGroup();