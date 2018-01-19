/* Written solely by Tyler Whitehouse */

// Requres Aggregator.js

/** Takes in a tree and turns it into logically orchestrated HTML cause I can
*/
function parseToHTML(root){
	// do some recursive thing I guess
	
	// Grab this element
	const result = root.element;
	
	if (!result){
		console.log("YA DONE MESSED UP A-A-RON!");
	}
	
	// Get all of the child keys
	const keys = Object.keys(root.children).sort(keySort);
	
	// To save on memory
	let el;
	// For each child
	for (let i = 0; i < keys.length; i++){
		
		// Get the element from the child
		el = parseToHTML(root.getChild(keys[i]));
		
		// Append all of the children
		result.appendChild(el);
	}
	
	// Add on a line break for better readability
	result.appendChild(createBreak());
	
	return result;
}

function createBreak(){
	const el = document.createElement("p");
	el.appendChild(document.createElement("br"));
	return el;
}