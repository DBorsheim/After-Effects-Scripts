///
///  SHOW STYLER.JSX
///  - Derek Borsheim
/// 
///  Show styler takes KBar and the Apply Font Style plugins and combines them then adds the functionality of having different shows save their styles.
///  There would be a dropdown at the top designating the Show (IOKTBS, Monstrum, etc.) that is selected to style.
/// 
///  Below that would be a list of actions including:
///  	- Apply a font style
///  	- Run a script (.jsx)
///  	- Apply a preset to an item
///  	- Ability to add each of these in through different methods
///  		- Adding through the explorer menu and selecting a file to be associated with the show
///  		- Adding through a button based on something selected (mainly used for fonts, not sure this can be used with anything else)
///  	- Ability to remove items out of the list
///  	- Open the relevant folders
///  	- Maybe create even an episode specific file too so you can create assets for the specific episode that are used repeatedly
///  		- File can be stored relative to the AE path, next to it
///  		- A generate button could also create the needed comp to copy things out of
///  		- Maybe even auto fill, with an update button that adds all the layers to the panel
///  	- Maybe have a search function where you can type something in and it will look through the entire document including layers for matches
/// 
///  With all the settings needed for this, it might need to have another panel that is just for the "backend" settings.
///  	- Opening the relevant folders for fonts, scripts, etc.
///  	- Project sort options
///  		- Sort PSDs into individual folders
///  		- Sort Vectors into individual folders
///  		- Maybe also a tool thatc an take the psds and vectors back out of their individial folders and rename them their original name.
///				- Use "psds/vectors[1].file.name" to reference the original name
///  		- Renaming precomps with (Previous comp name + " > ")
///  It may also be helpful to have the Project Sort button persistent on the panel, for ease of use (with maybe an option on the settings panel to hide it).
///  All these things should be added to a document that gets saved somewhere that stores each shows information.
///  Each show should get their own document that we can share with each other.
///  This should also handle error messages, that help with understanding if something is missing.
///
///  It could be great to have certain scripts that are used often to not open in a new window, but change the UI window to account for them.
///  	- Randomizer script to randomize the in points takes an integer value to randomize the values. ("20", to pick between 0-20 for where to start the layer)
///  	- Set anchor point, click to bring menu up with muliple buttons on
///
///  WHAT IF THIS WAS A BIGGER SCRIPT THAN ALL OF THIS
///		What if the script was like KBar, but could bring up different panels into the existing panel. Like the previous suggestion above about the randomizer and set anchor point.
///		The "main" screen could be set up however you like (maybe almost like Home Assistant) and you could create buttons that take you to new panels or run specific scripts.
///		It could use MDI icons to help icons.
///		
///		
///	 Render settings for the "Render Button"
///	 	- Settings that effect when you hit the render button
///	 		- Motion Blur Checked On/Off
///	 		- Which preset to use
///	 		- Which relative file path to use
///	 		- How to version "_01" or "v1" etc.
///	 	- Render to Frame (Image render)
///	 		- Render location
///	 		- Render file type (png, jpg)
///	 		- Whether to add the frame number or not
///
///  Button to Render to Frame
///  	Still don't have this completely working. The file name doesn't seem to be controllable.
///  	AE seems to automatically add the frame number at the end no matter what.
///  	Maybe possible to also alter the render button? Maybe you can change the file name then.
///
