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
/// 
///  With all the settings needed for this, it might need to have another panel that is just for the "backend" settings like opening the relevant folders or anything else that crops up.
///  It may also be helpful to have the Project Sort button persistent on the panel, for ease of use (with maybe an option on the settings panel to hide it).
///  All these things should be added to a document that gets saved somewhere that stores each shows information.
///  Each show should get their own document that we can share with each other.
///  This should also handle error messages, that help with understanding if something is missing.
///