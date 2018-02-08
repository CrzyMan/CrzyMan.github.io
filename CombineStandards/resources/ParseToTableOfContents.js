/* Written solely by Tyler Whitehouse */

// Requres Aggregator.js

/** Takes in a tree and turns it into logically orchestrated HTML cause I can
*/
function parseToTableOfContents(root, prevDepth){
	const curDepth = prevDepth + 1 || 0;
	
	const elStr = "div";
	const className = "tableOfContentsLine";
	
	// Grab this element
	const result = document.createElement(elStr);
	result.classList.add(className);
	
	const elementQuery = "h2, h4";
	
	// If we are past the root element
	if (curDepth > 0){
		const temp = root.element.querySelector(elementQuery) || document.createElement(elStr);
		const toAdd = document.createElement("a");
		toAdd.href = "#";
		toAdd.innerHTML = temp.innerText;
		result.appendChild(toAdd);
	}
	
	// Get all of the child keys
	const keys = Object.keys(root.children).sort(keySort);
	
	
	// if we aren't too deep in the tree already
	if (curDepth < 2){	
		// To save on memory
		let el;
		// For each child
		for (let i = 0; i < keys.length; i++){
			
			// Get the element from the child
			
			el = parseToTableOfContents(root.getChild(keys[i]), curDepth);
			
			// Append all of the children
			result.appendChild(el);
		}
	}
	
	return result;
}