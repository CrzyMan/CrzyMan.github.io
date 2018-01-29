// Requires Aggregator.js

/** Takes tree2 and prepends it into tree1
	PARAMS:
		root1 : Object - The root level of a tree1, receiving from tree2
		root2 : Object - The root level of a tree2, giving to tree1
	RETURNS:
		Object - The root of the combined trees
*/
/* Written solely by Tyler Whitehouse */

function combine(root1, root2){
	/*
	for each key in root2
		mark the element in root2
		find the level in root1
		add the root2 element as the first childElement inside the root1 element
	endFor (level in root2)
	*/
	// Get all of the keys in tree 2
	const keys = root2.getAllKeys();
	
	// So we aren't relying so much on garbage collection
	let el1, el2;
	
	// For each key in tree 2
	for (let i = 0; i < keys.length; i++){
		
		// Get the element in tree 2
		el2 = root2.getRelativeElement(keys[i]);
		
		// Mark it so we know it is different
		markAsSpecific(el2);
		
		// Get the element in tree 1
		el1 = root1.getRelativeElement(keys[i]);
		
		// If there are no childElements
		if (el1.children.length == 0){
			
			// then just add the element from tree 2 into tree 1
			el1.appendChild(el2);
			
		} else {// otherwise
		
			// Prepend the element from tree 2 into the element in tree 1
			el1.children[0].before(el2);
		}
	}
	
	return root1;
}

function markAsSpecific(el){
	el.classList.add("specific");
}