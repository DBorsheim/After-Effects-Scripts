// Render Menu
// 
// Control + m invokes the script which asks questions about what kind of render
// 
// RGB or RGB+A
// Sound ON or Sound OFF
// Render to this projects render folder
// Render whole timeline or Render work area
// Render PNG Sequence
// Render single PNG image - could invoke the rendertoPNG script thing from Zac Lovatt
// Clear the render queue or leave the render queue - default to clearing it
// Not sure if its possible; render directly to AME for mp4
// Automatically increment the render with -v###
// Remove the main comp character "# " from the render name, default to true
// 
// 
// Composition: FSS2203_VultureGFX_221210_v001.mov
// 
// 


// Unable to execute script at line 1031. Function JSON.parse is undefined
//
//
//
//  json2.js
//  2023-05-10
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(
//                         +a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]
//                      ));
//                  }
//                  return value;
//              }
//          });

//          myData = JSON.parse(
//              "[\"Date(09/09/2001)\"]",
//              function (key, value) {
//                  var d;
//                  if (
//                      typeof value === "string"
//                      && value.slice(0, 5) === "Date("
//                      && value.slice(-1) === ")"
//                  ) {
//                      d = new Date(value.slice(5, -1));
//                      if (d) {
//                          return d;
//                      }
//                  }
//                  return value;
//              }
//          );

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
	eval, for, this
*/

/*property
	JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
	getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
	lastIndex, length, parse, prototype, push, replace, slice, stringify,
	test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
	JSON = {};
}

(function () {
	"use strict";

	var rx_one = /^[\],:{}\s]*$/;
	var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
	var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

	function f(n) {
		// Format integers to have at least two digits.
		return (n < 10)
			? "0" + n
			: n;
	}

	function this_value() {
		return this.valueOf();
	}

	if (typeof Date.prototype.toJSON !== "function") {

		Date.prototype.toJSON = function () {

			return isFinite(this.valueOf())
				? (
					this.getUTCFullYear()
					+ "-"
					+ f(this.getUTCMonth() + 1)
					+ "-"
					+ f(this.getUTCDate())
					+ "T"
					+ f(this.getUTCHours())
					+ ":"
					+ f(this.getUTCMinutes())
					+ ":"
					+ f(this.getUTCSeconds())
					+ "Z"
				)
				: null;
		};

		Boolean.prototype.toJSON = this_value;
		Number.prototype.toJSON = this_value;
		String.prototype.toJSON = this_value;
	}

	var gap;
	var indent;
	var meta;
	var rep;


	function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

		rx_escapable.lastIndex = 0;
		return rx_escapable.test(string)
			? "\"" + string.replace(rx_escapable, function (a) {
				var c = meta[a];
				return typeof c === "string"
					? c
					: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
			}) + "\""
			: "\"" + string + "\"";
	}


	function str(key, holder) {

// Produce a string from holder[key].

		var i;          // The loop counter.
		var k;          // The member key.
		var v;          // The member value.
		var length;
		var mind = gap;
		var partial;
		var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

		if (
			value
			&& typeof value === "object"
			&& typeof value.toJSON === "function"
		) {
			value = value.toJSON(key);
		}

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

		if (typeof rep === "function") {
			value = rep.call(holder, key, value);
		}

// What happens next depends on the value's type.

		switch (typeof value) {
		case "string":
			return quote(value);

		case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

			return (isFinite(value))
				? String(value)
				: "null";

		case "boolean":
		case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

			return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

		case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

			if (!value) {
				return "null";
			}

// Make an array to hold the partial results of stringifying this object value.

			gap += indent;
			partial = [];

// Is the value an array?

			if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || "null";
				}

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

				v = partial.length === 0
					? "[]"
					: gap
						? (
							"[\n"
							+ gap
							+ partial.join(",\n" + gap)
							+ "\n"
							+ mind
							+ "]"
						)
						: "[" + partial.join(",") + "]";
				gap = mind;
				return v;
			}

// If the replacer is an array, use it to select the members to be stringified.

			if (rep && typeof rep === "object") {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					if (typeof rep[i] === "string") {
						k = rep[i];
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (
								(gap)
									? ": "
									: ":"
							) + v);
						}
					}
				}
			} else {

// Otherwise, iterate through all of the keys in the object.

				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (
								(gap)
									? ": "
									: ":"
							) + v);
						}
					}
				}
			}

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

			v = partial.length === 0
				? "{}"
				: gap
					? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
					: "{" + partial.join(",") + "}";
			gap = mind;
			return v;
		}
	}

// If the JSON object does not yet have a stringify method, give it one.

	if (typeof JSON.stringify !== "function") {
		meta = {    // table of character substitutions
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			"\"": "\\\"",
			"\\": "\\\\"
		};
		JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

			var i;
			gap = "";
			indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

			if (typeof space === "number") {
				for (i = 0; i < space; i += 1) {
					indent += " ";
				}

// If the space parameter is a string, it will be used as the indent string.

			} else if (typeof space === "string") {
				indent = space;
			}

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

			rep = replacer;
			if (replacer && typeof replacer !== "function" && (
				typeof replacer !== "object"
				|| typeof replacer.length !== "number"
			)) {
				throw new Error("JSON.stringify");
			}

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

			return str("", {"": value});
		};
	}


// If the JSON object does not yet have a parse method, give it one.

	if (typeof JSON.parse !== "function") {
		JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

			var j;

			function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

				var k;
				var v;
				var value = holder[key];
				if (value && typeof value === "object") {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

			text = String(text);
			rx_dangerous.lastIndex = 0;
			if (rx_dangerous.test(text)) {
				text = text.replace(rx_dangerous, function (a) {
					return (
						"\\u"
						+ ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
					);
				});
			}

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

			if (
				rx_one.test(
					text
						.replace(rx_two, "@")
						.replace(rx_three, "]")
						.replace(rx_four, "")
				)
			) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

				j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

				return (typeof reviver === "function")
					? walk({"": j}, "")
					: j;
			}

// If the text is not JSON parseable, then a SyntaxError is thrown.

			throw new SyntaxError("JSON.parse");
		};
	}
}());
//
//
//


var isSavedFile = false;

if(app.project.file == null)
{
	isSavedFile = false;
	//alert("Project is not saved.");
}
if(app.project.file != null)
{
	isSavedFile = true;
	//alert("Project is saved");
}

currentComp = app.project.activeItem;

app.project.renderQueue.showWindow(true);

var thisFile = new File($.fileName);

separator = "_";
versionIncrement = 0;
textColumnWidth = 150;

// DIALOG
// ======
var main_window = new Window("dialog"); 
	main_window.text = "Add Comp to Render Queue"; 
	main_window.orientation = "column"; 
	main_window.alignChildren = ["fill","fill"]; 
	main_window.spacing = 10; 
	main_window.margins = 15;
	main_window.preferredSize.width = 600; 

// MAIN GROUP
// ======
var main_group = main_window.add("group", undefined, {name: "group1"}); 
	main_group.orientation = "column"; 
	main_group.alignChildren = ["fill","center"]; 
	main_group.spacing = 10; 
	main_group.margins = 10;

// NAME AND PRESET GROUP
// ======
var name_preset_group = main_group.add("group", undefined, {name: "group11"}); 
	name_preset_group.orientation = "row"; 
	name_preset_group.alignChildren = ["fill","center"]; 
	name_preset_group.spacing = 10; 
	name_preset_group.margins.left = 20;
	name_preset_group.margins.right = 20;

var txt_CompName = name_preset_group.add("statictext", undefined, undefined, {name: "compNamePromptTXT"}); 
	txt_CompName.text = "Export File Name: "; 
	txt_CompName.alignment = ["left","center"]; 
	txt_CompName.justify = "right";

var txt_CompName = name_preset_group.add('edittext {properties: {name: "statictext1"}}'); 
	txt_CompName.justify = "center"; 
	txt_CompName.alignment = ["fill","center"]; 
	txt_CompName.preferredSize.height = 30;

// var txt_CompNamePrompt = group11.add("statictext", undefined, undefined, {name: "compNamePromptTXT"}); 
//     txt_CompNamePrompt.text = ".mov"; 
//     txt_CompNamePrompt.preferredSize.width = 30;
//     txt_CompNamePrompt.alignment = ["right","center"]; 
//     txt_CompNamePrompt.justify = "left";

// var btn_CompFileType = group11.add("button", undefined, undefined, {name: "compButton"});
// 		//btn_VersionUp.alignment = ["fill","center"]; 
//     btn_CompFileType.preferredSize.width = 95;
//     btn_CompFileType.alignment = ["right","center"]; 
//     btn_CompFileType.text = "PRORES"; 


// PRESET GROUP
// ======
var preset_group = main_group.add("group", undefined, {name: "group2"}); 
	preset_group.alignment = ["center","fill"]; 
	preset_group.orientation = "row"; 
	preset_group.alignChildren = ["fill","top"]; 
	preset_group.spacing = 10; 
	preset_group.margins = 0;
	preset_group.preferredSize.width = 300;

var txt_Preset = preset_group.add("statictext", undefined, undefined, {name: "compNamePromptTXT"}); 
	txt_Preset.text = "Presets:"; 
	txt_Preset.preferredSize.width = 50;
	txt_Preset.alignment = ["left","center"]; 
	txt_Preset.justify = "left";

var preset_list_array = LoadPresetList();
var drp_presets = preset_group.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: preset_list_array}); 
	drp_presets.selection = 1;
	drp_presets.preferredSize.width = 200;

var btn_save_preset = preset_group.add("button", undefined, undefined, {name: "compButton"});
	btn_save_preset.alignment = ["fill","center"];
	btn_save_preset.preferredSize.width = 95;
	btn_save_preset.text = "Save Preset";


var txt_Files = main_group.add("statictext", undefined, undefined, {name: "statictext1", multiline: true}); 
	// txt_Files.alignment = ["fill",""]; 
	txt_Files.preferredSize.width = txt_Files.minimumSize.width;
	// txt_Files.hide();
		
// NAMING SETTINGS PANEL
// ======
var pnl_naming = main_group.add("panel", undefined, undefined, {name: "panel1"}); 
	//pnl_Naming.text = "Naming"; 
	pnl_naming.orientation = "column"; 
	pnl_naming.alignChildren = ["left","top"]; 
	pnl_naming.spacing = 10; 
	pnl_naming.margins = 10; 
	pnl_naming.alignment = ["fill","top"]; 
	//pnl_Naming.preferredSize.width = 1000;

// Name Inclusions Group
// ======
var name_incl_group = pnl_naming.add("group", undefined, {name: "group7"}); 
	name_incl_group.orientation = "row"; 
	name_incl_group.alignChildren = ["left","center"]; 
	name_incl_group.spacing = 10; 
	name_incl_group.margins = 0; 

var txt_name_incl = name_incl_group.add("statictext", undefined, undefined, {name: "statictext5"}); 
	txt_name_incl.text = "Naming Inclusions: "; 
	txt_name_incl.preferredSize.width = textColumnWidth;
	txt_name_incl.alignment = ["left","top"]; 
	txt_name_incl.justify = "right";

// Name Inclusions Options Group
// ======
var name_incl_options_group = name_incl_group.add("group", undefined, {name: "group3"});
	name_incl_options_group.orientation = "column"; 
	name_incl_options_group.alignChildren = ["left","center"]; 
	name_incl_options_group.alignment = ["fill","center"];
	name_incl_options_group.spacing = 10; 
	name_incl_options_group.margins = 0; 

var cbx_remove_hash = name_incl_options_group.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
	cbx_remove_hash.text = "Remove \u0022#\u0022 Character"; 
	cbx_remove_hash.value = true;

var cbx_Date = name_incl_options_group.add("checkbox", undefined, undefined, {name: "checkbox2"}); 
	cbx_Date.text = "Add Date"; 
	cbx_Date.value = true;



// Date Format
// ======
var grpDateFormat = pnl_naming.add("group", undefined, {name: "group3"}); 
	grpDateFormat.orientation = "row"; 
	grpDateFormat.alignChildren = ["left","center"]; 
	grpDateFormat.spacing = 10; 
	grpDateFormat.margins = 0; 

var txt_DateFormatPrompt = grpDateFormat.add("statictext", undefined, undefined, {name: "statictext2"}); 
	txt_DateFormatPrompt.text = "Date Format:"; 
	txt_DateFormatPrompt.alignment = ["left","center"]; 
	txt_DateFormatPrompt.preferredSize.width = textColumnWidth;
	txt_DateFormatPrompt.justify = "right"; 

var etx_DateFormat = grpDateFormat.add('edittext {properties: {name: "edittext1"}}'); 
	etx_DateFormat.text = "yyddmm"; 
	etx_DateFormat.preferredSize.width = 200; 

var txt_DateFormatPreview = grpDateFormat.add("statictext", undefined, undefined, {name: "statictext2"}); 
	txt_DateFormatPreview.preferredSize.width = 100;


// Prefix
// ======
var grpPrefix = pnl_naming.add("group", undefined, {name: "grpPrefix"}); 
	grpPrefix.orientation = "row"; 
	grpPrefix.alignChildren = ["left","center"]; 
	grpPrefix.spacing = 10; 
	grpPrefix.margins = 0; 

var txt_PrefixPrompt = grpPrefix.add("statictext", undefined, undefined, {name: "prefix"});
	txt_PrefixPrompt.text = "Prefix:";
	txt_PrefixPrompt.alignment = ["left","center"]; 
	txt_PrefixPrompt.preferredSize.width = textColumnWidth;
	txt_PrefixPrompt.justify = "right"; 

var etx_Prefix = grpPrefix.add('edittext {properties: {name: "etxPrefix"}}'); 
	etx_Prefix.text = ""; 
	etx_Prefix.preferredSize.width = 200;

// Capitalization
// ======
var grpCapitalization = pnl_naming.add("group", undefined, {name: "group3"});
	grpCapitalization.orientation = "row";
	grpCapitalization.alignChildren = ["left","center"];
	grpCapitalization.spacing = 10;
	grpCapitalization.margins = 0;

var txt_CapitalizationPrompt = grpCapitalization.add("statictext", undefined, undefined, {name: "statictext2"});
	txt_CapitalizationPrompt.text = "Capitalization:";
	txt_CapitalizationPrompt.alignment = ["left","center"];
	txt_CapitalizationPrompt.preferredSize.width = textColumnWidth;
	txt_CapitalizationPrompt.justify = "right";

var capitalization_array = ["None", "ALL CAPS", "lowercase", "Sentence Case", "Title Case"];
var drp_CapitalizationStyle = grpCapitalization.add("dropdownlist", undefined, undefined, {name: "dropdown2", items: capitalization_array});
	drp_CapitalizationStyle.selection = 0;
	drp_CapitalizationStyle.preferredSize.width = 200;

// Spaces Handling
// ======
var grpSpaces = pnl_naming.add("group", undefined, {name: "group3"}); 
	grpSpaces.orientation = "row"; 
	grpSpaces.alignChildren = ["left","center"]; 
	grpSpaces.spacing = 10; 
	grpSpaces.margins = 0; 

var txt_SpacesReplacementPrompt = grpSpaces.add("statictext", undefined, undefined, {name: "statictext2"}); 
	txt_SpacesReplacementPrompt.text = "Replace Spaces:"; 
	txt_SpacesReplacementPrompt.alignment = ["left","center"]; 
	txt_SpacesReplacementPrompt.preferredSize.width = textColumnWidth;
	txt_SpacesReplacementPrompt.justify = "right"; 

var spacesReplacement_array = [" ","_","-",""]; 
var drp_SpacesReplacement_array = ["Keep Spaces","Underscore","Dash","Remove"]; 
var drp_SpacesReplacement = grpSpaces.add("dropdownlist", undefined, undefined, {name: "dropdown2", items: drp_SpacesReplacement_array}); 
		drp_SpacesReplacement.selection = 0; 
		drp_SpacesReplacement.preferredSize.width = 200;

// Info Separator
// ======
var grpInfoSeparator = pnl_naming.add("group", undefined, {name: "group3"});
	grpInfoSeparator.orientation = "row"; 
	grpInfoSeparator.alignChildren = ["left","center"]; 
	grpInfoSeparator.spacing = 10; 
	grpInfoSeparator.margins = 0; 

var txt_InfoSeparatorPrompt = grpInfoSeparator.add("statictext", undefined, undefined, {name: "statictext2"}); 
	txt_InfoSeparatorPrompt.text = "Separator Charactor:"; 
	txt_InfoSeparatorPrompt.alignment = ["left","center"]; 
	txt_InfoSeparatorPrompt.preferredSize.width = textColumnWidth;
	txt_InfoSeparatorPrompt.justify = "right"; 

var separator_array = [" ","_","-",""]; 
var drp_InfoSeparatorReplacement_array = ["Spaces","Underscore","Dash","Remove"]; 
var drp_InfoSeparatorReplacement = grpInfoSeparator.add("dropdownlist", undefined, undefined, {name: "dropdown2", items: drp_InfoSeparatorReplacement_array}); 
		drp_InfoSeparatorReplacement.selection = 1; 
		drp_InfoSeparatorReplacement.preferredSize.width = 200; 

// Versioning
// ======
var group5 = pnl_naming.add("group", undefined, {name: "group5"}); 
	group5.orientation = "row"; 
	//group5.alignChildren = ["fill","top"]; 
		group5.alignment = ["fill","fill"]; 
	group5.spacing = 10; 
	group5.margins = 0; 

var txt_VersionPrompt = group5.add("statictext", undefined, undefined, {name: "statictext4"}); 
	txt_VersionPrompt.text = "Versioning Prefix: "; 
		txt_VersionPrompt.alignment = ["left","top"]; 
		txt_VersionPrompt.preferredSize.width = textColumnWidth;
		txt_VersionPrompt.justify = "right"; 

var lbx_VersioningPrefixArray = ["None","Lowercase v","Uppercase V"];
var versionPrefixArray = ["","v","V"];
var lbx_VersioningPrefix = group5.add("dropdownlist", undefined, undefined, {name: "listbox1", items: lbx_VersioningPrefixArray}); 
	lbx_VersioningPrefix.preferredSize.width = 200; 
	lbx_VersioningPrefix.alignment = ["left","fill"];
	lbx_VersioningPrefix.selection = 1;

// GROUP4
// ======
var group4 = pnl_naming.add("group", undefined, {name: "group4"}); 
	group4.orientation = "row"; 
	group4.alignChildren = ["left","center"]; 
	group4.alignment = ["fill","fill"]; 
	group4.spacing = 10; 
	group4.margins = 0; 

var txt_ZeroPadPrompt = group4.add("statictext", undefined, undefined, {name: "statictext3"}); 
	txt_ZeroPadPrompt.text = "Increment Zero Padding: ";
		txt_ZeroPadPrompt.alignment = ["left","top"]; 
		txt_ZeroPadPrompt.preferredSize.width = textColumnWidth;
		txt_ZeroPadPrompt.justify = "right"; 

var sld_ZeroPadding = group4.add("slider", undefined, undefined, undefined, undefined, {name: "slider1"}); 
	sld_ZeroPadding.minvalue = 1; 
	sld_ZeroPadding.maxvalue = 5; 
	sld_ZeroPadding.value = 3; 
	sld_ZeroPadding.preferredSize.width = 200; 
		sld_ZeroPadding.alignment = ["left","fill"]; 

var txt_ZeroPadPreview = group4.add("statictext", undefined, undefined, {name: "statictext3"}); 
		txt_ZeroPadPreview.text = 3;
		txt_ZeroPadPreview.alignment = ["left","fill"]; 

// GROUP6
// ======
var group6 = pnl_naming.add("group", undefined, {name: "group6"}); 
	group6.orientation = "row"; 
	group6.alignChildren = ["left","center"];
		group6.alignment = ["fill","center"];
	group6.spacing = 10; 
	group6.margins = 0; 

var txt_name_incl = group6.add("statictext", undefined, undefined, {name: "statictext5"}); 
	txt_name_incl.text = "Increment Version: "; 
	txt_name_incl.preferredSize.width = textColumnWidth;
	txt_name_incl.alignment = ["left","center"]; 
	txt_name_incl.justify = "right"; 

var btn_VersionUp = group6.add("button", undefined, undefined, {name: "button1"});
		//btn_VersionUp.alignment = ["fill","center"]; 
	btn_VersionUp.preferredSize.width = 95;
	btn_VersionUp.text = "Up"; 
		
var btn_VersionDown = group6.add("button", undefined, undefined, {name: "button2"}); 
		//btn_VersionDown.alignment = ["fill","center"]; 
	btn_VersionDown.preferredSize.width = 95;
	btn_VersionDown.text = "Down";



// Divider
// ======
var divider1 = pnl_naming.add("panel", undefined, undefined, {name: "divider1"}); 
		divider1.alignment = "fill"; 
// Divider
// ======

var group9 = pnl_naming.add("group", undefined, {name: "group6"}); 
	group9.orientation = "row"; 
	group9.alignChildren = ["left","top"];
		group9.alignment = ["fill","center"];
	group9.spacing = 10; 
	group9.margins = 0; 

var txt_Dur = group9.add("statictext", undefined, undefined, {name: "statictext5"}); 
	txt_Dur.text = "Video Settings: "; 
	txt_Dur.preferredSize.width = textColumnWidth;
	txt_Dur.alignment = ["left","top"]; 
	txt_Dur.justify = "right";

var group10 = group9.add("group", undefined, {name: "group6"}); 
	group10.orientation = "column"; 
	group10.alignChildren = ["left","center"];
	group10.alignment = ["fill","center"];
	group10.spacing = 10; 
	group10.margins = 0; 

var cbx_UseAlphaChannel = group10.add("checkbox", undefined, undefined, {name: "checkbox3"}); 
	cbx_UseAlphaChannel.text = "Use Alpha Channel"; 
		cbx_UseAlphaChannel.value = true;

	temp_useAlpha = cbx_UseAlphaChannel.value;

var cbx_UseSound = group10.add("checkbox", undefined, undefined, {name: "checkbox4"}); 
	cbx_UseSound.text = "Sound ON"; 

var listbox2_array = ["Length of Comp","Work Area Only"]; 
var lbx_RenderLength = group10.add("listbox", undefined, undefined, {name: "listbox2", items: listbox2_array}); 
		lbx_RenderLength.selection = 0;
		lbx_RenderLength.preferredSize.width = 200;

var cbx_RenderPngSeq = group10.add("checkbox", undefined, undefined, {name: "checkbox5"}); 
	cbx_RenderPngSeq.text = "Render PNG Sequence"; 

var cbx_RenderToProjFolder = group10.add("checkbox", undefined, undefined, {name: "checkbox6"}); 
	cbx_RenderToProjFolder.text = "Render to this Projects \u0022Render Folder\u0022"; 
		cbx_RenderToProjFolder.value = true;

// GROUP6
// ======
var group6 = main_group.add("group", undefined, {name: "group6"}); 
	group6.orientation = "row"; 
	group6.alignChildren = ["right","center"]; 
	group6.spacing = 10; 
	group6.margins = 5; 

var cbx_ClearRenderQueue = group6.add("checkbox", undefined, undefined, {name: "checkbox7"}); 
	cbx_ClearRenderQueue.text = "Clear the Render Queue"; 
		cbx_ClearRenderQueue.value = true;

// var btn_AddToQueue = group6.add("button", undefined, undefined, {name: "button1"}); 
//     btn_AddToQueue.text = "Add to Queue";

var btn_AddProResToQueue = group6.add("button", undefined, undefined, {name: "button1"}); 
	btn_AddProResToQueue.text = "Render ProRes";

var btn_AddMP4ToQueue = group6.add("button", undefined, undefined, {name: "button1"}); 
	btn_AddMP4ToQueue.text = "Render MP4";

// var btn_AmeQueue = group6.add("button", undefined, undefined, {name: "button4"}); 
//     btn_AmeQueue.text = "Queue in AME"; 

var btn_RenderPNG = group6.add("button", undefined, undefined, {name: "button2"}); 
	btn_RenderPNG.text = "Quick Save PNG"; 

var btn_Cancel = group6.add("button", undefined, undefined, {name: "button3"}); 
	btn_Cancel.text = "Cancel"; 

// var btn_hide = group6.add("button", undefined, undefined, {name: "buttonhide"}); 
//     btn_hide.text = "Hide"; 



// BUTTONS
// =======
// Render Prores + Alpha + Sound
// Render Prores + Alpha + No Sound
// Render Prores + No Alpha + Sound
// Render Prores + No Alpha + No Sound
// Render MP4 + Sound
// Render MP4 + No Sound
// Render PNG + Alpha
// Render PNG + No Alpha






DefaultRenderPrefs();
// ChangeFileType();
LoadRenderPrefs();
UpdateCompName();
LoadFilesFromFolder();


btn_save_preset.onClick = function() { SavePreset(); };
// btn_CompFileType.onClick = function() { ChangeFileType(); };
cbx_Date.onClick = function() { UpdateCompName(); };
cbx_remove_hash.onClick = function() { UpdateCompName(); };
etx_DateFormat.onChanging = function() { UpdateCompName(); };
etx_Prefix.onChanging = function() { UpdateCompName(); };
drp_CapitalizationStyle.onChange = function() { UpdateCompName(); };
sld_ZeroPadding.onChanging = function() { UpdateCompName(); txt_ZeroPadPreview.text = Math.round(sld_ZeroPadding.value);  };
lbx_VersioningPrefix.onChange = function() { UpdateCompName(); };
drp_InfoSeparatorReplacement.onChange = function() { UpdateCompName(); };
drp_SpacesReplacement.onChange = function() { UpdateCompName(); };
//cbx_RenderPngSeq.onClick = function() { UpdateCompName(); };
//cbx_RenderToProjFolder.onClick = function() { UpdateCompName(); };
btn_VersionUp.onClick = function() { versionIncrement++; UpdateCompName(); };
btn_VersionDown.onClick = function() { versionIncrement--; UpdateCompName(); };

// btn_AddToQueue.onClick = function() { SaveRenderPrefs(); AddToRenderQueue(); dialog.close();};
btn_AddMP4ToQueue.onClick = function() { SaveRenderPrefs(); AddToRenderQueue("MP4"); main_window.close();};
btn_AddProResToQueue.onClick = function() { SaveRenderPrefs(); AddToRenderQueue("ProRes"); main_window.close();};
btn_RenderPNG.onClick = function() { pngLocation = QuickSavePNG(); app.project.renderQueue.showWindow(false); system.callSystem("explorer " + pngLocation); main_window.close(); };
btn_Cancel.onClick = function() { app.project.renderQueue.showWindow(false); currentComp.openInViewer(); main_window.close(); };
//btn_hide.onClick = function() { txt_Files.visible == true ? txt_Files.hide() : txt_Files.show(); };



// group6.visible = false;
txt_Files.visible = false;



main_window.show();




function UpdateCompName()
{
	txt_CompName.text = "" + GetFileName(); 
}



function UpFolder(filePath, amtOfFolders)
{
	for (var i = 0; i < amtOfFolders; i++) 
	{
		slashLocation = filePath.lastIndexOf("\\");
		filePath = filePath.substring(0, slashLocation);
	}

	return filePath;
}



function LoadFilesFromFolder()
{
	p = GetPath();
	fileList = Folder(p).getFiles("*").sort();
	a = "";
	h = 0;
	for(i=0; i< fileList.length; i++)
	{
		filePathString = fileList[i].toString();
		fileString = filePathString.substring(filePathString.lastIndexOf("/")+1,filePathString.length);
		// If the file contains a "%20" then replace it with a space
		if (fileString.indexOf("%20") != -1)
		{
			fileString = fileString.replace(/%20/g, " ");
		}
		a += fileString + "\n";
		h += 15;
	}
	
	txt_Files.text = a;
	txt_Files.preferredSize.height = 150;
}



function GetDate()
{
	timeStr = system.callSystem("cmd.exe /c \"date /t\"");
	date = timeStr.split(" ")[1];
	date = date.split("/");
	mm = date[0];
	dd = date[1];
	year = date[2];
	yy = year.substring(2,4);

	inputDate = etx_DateFormat.text;

	// make text lower
	inputDate = inputDate.toLowerCase();

	dateFormatted = "";

	for(i = 0; i < inputDate.length; i++)
	{
		if(inputDate.substring(i,i+2) == "mm")
		{
			dateFormatted += mm;
			// remove this substring from the inputDate
			inputDate = inputDate.substring(0,i) + inputDate.substring(i+2,inputDate.length);
		}
		if(inputDate.substring(i,i+2) == "dd")
		{
			dateFormatted += dd;
			// remove this substring from the inputDate
			inputDate = inputDate.substring(0,i) + inputDate.substring(i+2,inputDate.length);
		}
		if(inputDate.substring(i,i+4) == "yyyy")
		{
			dateFormatted += year;
			// remove this substring from the inputDate
			inputDate = inputDate.substring(0,i) + inputDate.substring(i+4,inputDate.length);
		}
		else if(inputDate.substring(i,i+2) == "yy")
		{
			dateFormatted += yy;
			// remove this substring from the inputDate
			inputDate = inputDate.substring(0,i) + inputDate.substring(i+2,inputDate.length);
		}
		if(inputDate.substring(i,i+1) == " ")
		{
			dateFormatted += " ";
			// remove this substring from the inputDate
			inputDate = inputDate.substring(0,i) + inputDate.substring(i+1,inputDate.length);
		}
		if(inputDate.substring(i,i+1) == "-")
		{
			dateFormatted += "-";
			// remove this substring from the inputDate
			inputDate = inputDate.substring(0,i) + inputDate.substring(i+1,inputDate.length);
		}
		if(inputDate.substring(i,i+1) == "_")
		{
			dateFormatted += "_";
			// remove this substring from the inputDate
			inputDate = inputDate.substring(0,i) + inputDate.substring(i+1,inputDate.length);
		}

	}

	UpdatePreviewDate(dateFormatted);

	return dateFormatted;
}


function UpdatePreviewDate()
{
	txt_DateFormatPreview.text = "\"" + dateFormatted + "\""; 
}

function GetFileListFromDir(dirPath)
{
	var fileList = new Array();
	var dir = new Folder(dirPath);
	var files = dir.getFiles();
	for(var i = 0; i < files.length; i++) {
		fileList.push(files[i]);
		if(files[i] instanceof Folder)
		{
			// alert("folder");
			true;
		}

	}
	
	return fileList;
}


function GetFileName() {
	// Get a list of files from the directory path
	filelist = GetFileListFromDir(GetPath());

	// Get the name of the active composition
	compName = app.project.activeItem.name;

	// If the "Remove '#' from main comp name" option is checked, remove the "#" from the composition name
	if(cbx_remove_hash.value == true) {
		mainComp = "# ";
		if(compName.indexOf(mainComp) != -1) {
			compName = compName.replace(mainComp, "");
		}
	}

	// Replace all spaces in the composition name with the selected spaces replacement option
	compName = compName.replace(/ /g, spacesReplacement_array[drp_SpacesReplacement.selection.index]);

	// Get the selected info separator
	separator = separator_array[drp_InfoSeparatorReplacement.selection.index];

	// Get the prefix entered by the user and append the selected info separator
	var prefix = etx_Prefix.text == "" ? "" : etx_Prefix.text + separator;

	// If the "Include date in file name" option is checked, append the date to the file name
	date = cbx_Date.value == true ? separator + GetDate() : "";

	// Enable/disable date format preview and date format text input based on whether the "Include date in file name" option is checked
	txt_DateFormatPreview.enabled = cbx_Date.value;
	etx_DateFormat.enabled = cbx_Date.value;

	// Check the filelist for any files that match the compName
	nameExists = false;
	highestVersion = 0;
	highestVersionName = "";

	a = "";

	// Strip the file extension from every file in the filelist
	for(i = 0; i < filelist.length; i++) {
		filelist[i].name = filelist[i].name.substring(0, filelist[i].name.lastIndexOf("."));
		a += filelist[i].name.substring(0, filelist[i].name.lastIndexOf(".")) + "\n";
	}

	// Loop through the filelist to find any files that match the compName and to find the highest version number
	for(i = 0; i < filelist.length; i++) {
		if(!nameExists) {
			if(filelist[i].name.indexOf(compName) != -1) {
				nameExists = true;
			}
		} else {
			// Find the highest version number at the end of the file name
			dotInd = filelist[i].name.substring(filelist[i].name.lastIndexOf("."));
			version = filelist[i].name.match(/\d+(?=\.\w+$)/g);
			if(version > highestVersion) {
				highestVersion = version;
				highestVersionName = filelist[i].name;
			}
		}
	}

	// Create the output file name with the prefix, composition name, date, and zero padding
	outputFileName = "";
	fileExists = true;

	for(i = 1; i < 100; i++) {

		// Set the zero padding to the selected "separator" option
		zeroPadding = "" + separator;
		
		// Set the zero padding based on the selected versioning prefix and zero padding slider value
		zeroPadding += versionPrefixArray[lbx_VersioningPrefix.selection.index];
		
		// Round the zero padding slider value to the nearest integer
		sld_ZeroPadding.value = Math.round(sld_ZeroPadding.value);
		txt_ZeroPadPreview.text = Math.round(sld_ZeroPadding.value);
		if(sld_ZeroPadding.value > 1) {
			var currentnumber = "0000" + (i);
			zeroPadding += currentnumber.slice(-sld_ZeroPadding.value);
		}

		// Construct the output file name with the prefix, composition name, date, and zero padding
		outputFileName = prefix + "" + compName + "" + date + "" + zeroPadding;
		outputFileNameTest = prefix + "" + compName + "*" + zeroPadding + "*";

		// Get a list of files that match the output file name pattern and sort them alphabetically
		fileList = Folder(GetPath()).getFiles(outputFileNameTest).sort();

		// If a file with the same name already exists, increment the version number and try again
		if(fileList.length != 0)
			continue;
		else {
			// Create the output file name with the prefix, composition name, date, and incremented version number
			outputFileName = prefix + "" + CapitalizationStyle(compName) + "" + date + "" + zeroPadding;
			break;
		}


		
	}

	return outputFileName;
}

function CapitalizationStyle(strToChange)
{
	//["None", "ALL CAPS", "lowercase", "Sentence Case", "Title Case"];
	// All caps
	if(drp_CapitalizationStyle.selection.index == 1)
	{
		strToChange = strToChange.toUpperCase();
	}
	// lowercase
	if(drp_CapitalizationStyle.selection.index == 2)
	{
		strToChange = strToChange.toLowerCase();
	}
	// Sentence case
	if(drp_CapitalizationStyle.selection.index == 3)
	{
		strToChange = strToChange.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	// Title case
	if(drp_CapitalizationStyle.selection.index == 4)
	{
		strToChange = strToChange.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	return strToChange;
}

function GetPath()
{
	// alert("GetPath()");

	if(isSavedFile == false)
		return;

	fullPath = "";

	outputFolder = app.project.file.fsName;
	outputFolder = File.decode(outputFolder);
	outputFolder = UpFolder(outputFolder, 1);

	// exportFolder = "04 Exports";

	// fullPath += "" + outputFolder +  "\\" + exportFolder + "\\";

	fullPath = outputFolder + "\\";
	// alert(fullPath);


	return fullPath;
}


function CleanRenderQueue()
{
	var renderQueue = app.project.renderQueue;
	while (renderQueue.numItems > 0) {
		renderQueue.item(1).remove();
	}
}


function ChangeRenderSettings(item, outputType)
{
	outputModule = item.outputModule(1);

	moduleTemplate = cbx_UseAlphaChannel.value == true ? "ProRes RGB ALPHA" : "ProRes RGB";
	moduleTemplate = outputType == "ProRes" ? moduleTemplate : "H264";
	if(cbx_RenderPngSeq.value) { moduleTemplate = cbx_UseAlphaChannel.value == true ? "PNG with Alpha" : "PNG"} ;

	outputModule.applyTemplate(moduleTemplate);

	outputAudio = cbx_UseSound.value == true ? "On" : "Off";

	if (cbx_RenderPngSeq.value == true) {};
	if (cbx_RenderToProjFolder.value == true)	{};

	timeSpan = listbox2_array[lbx_RenderLength.selection.index];

	var outputModuleSettings = {
		"Output Audio":outputAudio,
	};

	var itemSettings = {
		"Time Span":timeSpan,
	};

	outputModule.setSettings(outputModuleSettings);
	item.setSettings(itemSettings);
	outputModule.file = File(GetPath() + txt_CompName.text);

}


function AddToRenderQueue(renderType)
{
	// app.project.renderQueue.showWindow(true);
	if(cbx_ClearRenderQueue.value == true) { CleanRenderQueue(); };

	// add comp to render queue
	var item = app.project.renderQueue.items.add(app.project.activeItem);
	ChangeRenderSettings(item, renderType);
}


function AddToAME()
{
	app.project.renderQueue.showWindow(true);
	if(cbx_ClearRenderQueue.value == true) { CleanRenderQueue(); };

	// add comp to render queue
	var item = app.project.renderQueue.items.add(app.project.activeItem);
	ChangeRenderSettings(item);
	app.project.renderQueue.queueInAME(false);

}

function QuickSavePNG()
{
  var comp = app.project.activeItem;

  var defaultLocation = new File(GetPath() + txt_CompName.text + ".png");
  var location = defaultLocation.saveDlg("Choose save location", "*.png");
  if (!location) {
	return;
  }
	
  var savedFile = comp.saveFrameToPng(comp.time, location);

  if (savedFile._hasException) {
	alert(["Couldn't save file!", savedFile.exception.toString()].join("\n"));
	return;
  }

//   alert("Saved file to " + location);
//   alert("Saved file to " + location.fsName);
//   alert(GetPath() + txt_CompName.text + ".png");

  return location.fsName;

}

// function ChangeFileType()
// {
// 	txt_CompNamePrompt.text = txt_CompNamePrompt.text == ".mov" ? ".mp4" : ".mov"; 
// 	btn_CompFileType.text = btn_CompFileType.text == "PRORES" ? "H.264" : "PRORES";
// 	if(btn_CompFileType.text == "PRORES")
// 	{
// 		cbx_UseAlphaChannel.enabled = true;
// 		cbx_UseAlphaChannel.value = temp_useAlpha;
// 	}
// 	else
// 	{
// 		temp_useAlpha = cbx_UseAlphaChannel.value;
// 		cbx_UseAlphaChannel.enabled = false;
// 		cbx_UseAlphaChannel.value = false;
// 	}
// }



function LoadPresetList()
{
	presetList = [];
	presetList.push("Default");

	// var presetFolder = new Folder(presetFolderLocation);
	// var presetFiles = presetFolder.getFiles("*.json");

	// for(var i = 0; i < presetFiles.length; i++)
	// {
	// 	presetList.push(presetFiles[i].name);
	// }

	return presetList;


}

function LoadPreset(presetName)
{
	// alert("LoadPreset()");

	// presetFile = new File(presetFolderLocation + presetName);
	// presetFile.open("r");
	// presetData = presetFile.read();
	// presetFile.close();

	// presetData = JSON.parse(presetData);

	// cbx_RemoveMainCompChar.value = presetData.cbx_RemoveMainCompChar;
	// drp_SpacesReplacement.selection = presetData.drp_SpacesReplacement;
	// drp_InfoSeparatorReplacement.selection = presetData.drp_InfoSeparatorReplacement;
	// cbx_Date.value = presetData.cbx_Date;
	// etx_DateFormat.text = presetData.etx_DateFormat;
	// lbx_VersioningPrefix.selection = presetData.lbx_VersioningPrefix;
	// sld_ZeroPadding.value = presetData.sld_ZeroPadding;
	
	// cbx_UseAlphaChannel.value = presetData.cbx_UseAlphaChannel;
	// cbx_UseSound.value = presetData.cbx_UseSound;
	// cbx_RenderPngSeq.value = presetData.cbx_RenderPngSeq;
	// cbx_RenderToProjFolder.value = presetData.cbx_RenderToProjFolder;
	// cbx_ClearRenderQueue.value = presetData.cbx_ClearRenderQueue;
	// lbx_RenderLength.selection = presetData.lbx_RenderLength;

	// alert("Preset Loaded");

}

function SavePreset(presetName)
{
	// alert("SavePreset()");



	// Popup a dialog asking for the name of the preset using the name of the project as the default
	var presetName = prompt("Enter a name for the preset", app.project.file.name, "Save Preset");

	// presetData = {
	// 	"cbx_RemoveMainCompChar":cbx_RemoveMainCompChar.value,
	// 	"drp_SpacesReplacement":drp_SpacesReplacement.selection.index,
	// 	"drp_InfoSeparatorReplacement":drp_InfoSeparatorReplacement.selection.index,
	// 	"cbx_Date":cbx_Date.value,
	// 	"etx_DateFormat":etx_DateFormat.text,
	// 	"lbx_VersioningPrefix":lbx_VersioningPrefix.selection.index,
	// 	"sld_ZeroPadding":sld_ZeroPadding.value,
		
	// 	"cbx_UseAlphaChannel":cbx_UseAlphaChannel.value,
	// 	"cbx_UseSound":cbx_UseSound.value,
	// 	"cbx_RenderPngSeq":cbx_RenderPngSeq.value,
	// 	"cbx_RenderToProjFolder":cbx_RenderToProjFolder.value,
	// 	"cbx_ClearRenderQueue":cbx_ClearRenderQueue.value,
	// 	"lbx_RenderLength":lbx_RenderLength.selection.index,
	// };

	// presetData = JSON.stringify(presetData);

	// presetFile = new File(presetFolderLocation + presetName);
	// presetFile.open("w");
	// presetFile.write(presetData);
	// presetFile.close();

	// alert("Preset Saved");

}

function DefaultRenderPrefs()
{
	// Comp Name
	cbx_remove_hash.value = true;
	drp_SpacesReplacement.selection = 0;
	drp_InfoSeparatorReplacement.selection = 1;
	cbx_Date.value = false;
	etx_DateFormat.text = "MMDDYY";
	lbx_VersioningPrefix.selection = 0;
	sld_ZeroPadding.value = 2;
	txt_ZeroPadPreview.text = Math.round(sld_ZeroPadding.value);
	
	// Render Settings
	cbx_UseAlphaChannel.value = true;
	cbx_UseSound.value = false;
	cbx_RenderPngSeq.value = false;
	cbx_RenderToProjFolder.value = isSavedFile;
	cbx_RenderToProjFolder.enabled = isSavedFile;
	cbx_ClearRenderQueue.value = true;
	lbx_RenderLength.selection = 0;
}

function MakeRenderPrefsText()
{
	var prefsObj = {
		pref_MainCompCharacter: cbx_remove_hash.value,
		pref_Date: cbx_Date.value,
		pref_DateFormat: etx_DateFormat.text,
		pref_Prefix: etx_Prefix.text,
		pref_ZeroPadding: sld_ZeroPadding.value,
		pref_VersioningPrefix: lbx_VersioningPrefix.selection.index,
		pref_UseAlphaChannel: cbx_UseAlphaChannel.value,
		pref_UseSound: cbx_UseSound.value,
		pref_RenderLength: lbx_RenderLength.selection.index,
		pref_RenderPngSeq: cbx_RenderPngSeq.value,
		pref_RenderToProjFolder: cbx_RenderToProjFolder.value,
		pref_ClearRenderQueue: cbx_ClearRenderQueue.value,
		// pref_CompNamePrompt: txt_CompNamePrompt.text,
		// pref_CompFileType: btn_CompFileType.text,
		pref_SpacesReplacement: drp_SpacesReplacement.selection.index,
		pref_InfoSeparatorReplacement: drp_InfoSeparatorReplacement.selection.index,
	};
	return JSON.stringify(prefsObj)
}

function SaveRenderPrefs()
{
	renderPrefsFilePath = GetRenderPrefsFilePath();
	SaveFile(renderPrefsFilePath, MakeRenderPrefsText());
}

function GetRenderPrefsFilePath()
{
	outputFolder = app.project.file.fsName;
	outputFolder = File.decode(outputFolder);
	outputFolder = UpFolder(outputFolder, 1);
	fileName = outputFolder.split("\\");
	fileName = fileName[fileName.length-2] + "_render-prefs.json";
	fileName = fileName.replace(/ /g, "-");

	d = File.decode(app.project.file.fullName).replace(/\//g, "\\");
	fullFilePath = UpFolder(d, 1).replace(/\\/g, "/") + "/" + fileName;

	return fullFilePath;
}

function readJsonFile(filePath)
{
	var currentLine;
	var jsonContent = [];
	var file = File(filePath);
	file.open("r");
	while(!file.eof) {
		currentLine = file.readln();
		jsonContent.push(currentLine);
	}
	file.close();
	jsonContent = jsonContent.join("");
	var parsedJson = JSON.parse(jsonContent);

	return parsedJson;
}

function LoadRenderPrefs()
{
	if(isSavedFile == false)
		return;
	
	var renderPrefsFilePath = GetRenderPrefsFilePath();
	// var loadedFile = LoadFile(renderPrefsFilePath);

	// if(loadedFile == "")
	// 	return;
	// alert(loadedFile)






	try {
		// loadedFile = loadedFile.join("");
		// var data = JSON.parse(loadedFile);

		var data = readJsonFile(renderPrefsFilePath);
		// alert(data);
	


		cbx_remove_hash.value = 							data.pref_MainCompCharacter;
		cbx_Date.value = 									  				 data.pref_Date;
		etx_DateFormat.text = 										   data.pref_DateFormat;
		etx_Prefix.text = 											   	   data.pref_Prefix;
		drp_CapitalizationStyle.selection = 							   data.pref_Capitalization;
		sld_ZeroPadding.value = 									  data.pref_ZeroPadding;
		lbx_VersioningPrefix.selection = 					     data.pref_VersioningPrefix;
		cbx_UseAlphaChannel.value = 							  data.pref_UseAlphaChannel;
		cbx_UseSound.value = 											 data.pref_UseSound;
		lbx_RenderLength.selection = 							     data.pref_RenderLength;
		cbx_RenderPngSeq.value = 									 data.pref_RenderPngSeq;
		cbx_RenderToProjFolder.value = 						   data.pref_RenderToProjFolder;
		cbx_ClearRenderQueue.value = 							 data.pref_ClearRenderQueue;
		// txt_CompNamePrompt.text = 								   data.pref_CompNamePrompt;
		// btn_CompFileType.text = 									 data.pref_CompFileType;
		drp_SpacesReplacement.selection = 				        data.pref_SpacesReplacement;
		drp_InfoSeparatorReplacement.selection =	     data.pref_InfoSeparatorReplacement;
	}
	catch(err) {
		alert("ERROR: " + err.message);
	}
}







// ======================================================================================
// File writing functions Save, Load and Override
// ======================================================================================
// Save File
function SaveFile(fileToSave, textToSave)
{	
	var thisFile = File(fileToSave);
	var writeFile = thisFile.exists ? OverrideFile() : true;
	

	if(writeFile)
	{
		thisFile.open("w");
		thisFile.write(textToSave);
		thisFile.close();
	}
}

// Load File
function LoadFile(fileToLoad)
{
	var fileContent = "";
	var thisFile = File(fileToLoad);

	if(thisFile.exists) {
		thisFile.open("r");
		fileContent = thisFile.read();
		thisFile.close();
	}	else	{
		fileContent = LoadFileNotFound();
	}

	return fileContent; 
}

// Override the file
function OverrideFile()
{
	// return confirm("Overwrite?");
	return true;
}

// Do this if the file loaded is not found
function LoadFileNotFound()
{
	//alert("File not found");
	return "";
}
