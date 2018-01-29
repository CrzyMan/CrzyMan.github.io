/* Written solely by Tyler Whitehouse */

const groupTagType = "DIV";

/**	Aggregator Object assembles a single level DOM tree from a standard into a multi-level dom tree
	PARAMS:
		options : Object - An object whose properties contain the setup information
*/
function Aggregator(options) {
	// Default options are nothing (empty obejct)
	options = options || {};
	
	// Where we are storing all the data
	let root = makeLevel();
	this.getRoot = () => root;
	// Important tags
	// Are provided in the options or default to empty so you can add some later I guess
	const iTags = options.importantTags || [];
	// Blacklisted tags
	// Are provided in the options or default to empty so you can add some later I guess
	const bTags = options.blacklistedTags || [];
	// Clause id regular expression
	// If the string starts off with one or more letters and is then followed by one or more
	const clauseRegEx = /^(([a-zA-Z]+(\.\w+)+)|[0-9]+[a-zA-Z]*(\.\w+)*)$/;
	// List of second word first characters that are conducive to false positive
	// Are provided in the options or default to empty so you can add some later I guess
	const fpfc = options.falsePositiveFirstCharacters || [];
	
	// DIV we assemble the group into
	let group;
	// Set up the group
	resetGroup();

	
	
	/** Determines whether this element is an important one
		PARAMS:
			el : Element - The element we are looking at
		RETURNS:
			Boolean - If this element is important
	*/
	function isImportant(el){
		let result = false;
		
		// Objects are "truthy". So, if the element exists and its tag name is in iTags, it is important
		if (el && iTags.includes(el.tagName)) result = true;
		
		return result;
	}
	
	/** Determines whether this element is a blacklisted one
		PARAMS:
			el : Element - The element we are looking at
		RETURNS:
			Boolean - If this element is blacklisted
	*/
	function isBlacklisted(el){
		let result = false;
		
		// Objects are "truthy". So, if the element exists and its tag name is in iTags, it is important
		if (el && bTags.includes(el.tagName)) result = true;
		
		return result;
	}
	
	/** Returns the clause ID if it is the first "word" of an element
		PARAMS:
			el : Element - The element we are looking at
		RETURNS:
			String/undefined - Clause
	*/
	function getClauseId(el){
		let id;
		
		// If element isn't null/undefined
		if (el){
			// Get the first "word"
			const inner = el.innerText;
			const trimmed = inner.trim();
			const splitted = trimmed.split(" ");
			const first = splitted[0];
			const second = splitted[1];
			
			// is it in clause id form?
			if (clauseRegEx.test(first)){
				
				// Check if it is a false positive
				if (!isClauseStartFalsePositive(splitted)){
					id = first;
				}
				
			} else if (first === "Annex" && splitted.length == 2){
				/* EDGE CASE: Annexes (They are a pain)
					General form - "<h2>ANNEX \w+<h2>"
					We are just using the Annex letter/number instead
				*/
				id = second;
			}
		}
		
		return id;
	}
	
	/** Checks for all of the edge cases that we find while attempting to identify the start of a clause
		I separated this out to make getClauseId() easier to read
		PARAMS:
			splitted : Array<String> - The trimmed inner text of the element, split by " "
		RETURNS:
			Boolean - Whether or not it was a false positive
	*/
	function isClauseStartFalsePositive(splitted){		
		let result = false;
		// There are some false positives that can be found by checking the first character of the second word
		
		// Check if there is a second "word"
		if (splitted.length > 1){
			// Check if first character is in False Positive First Character (fpfc) list
			if (fpfc.includes(splitted[1].charAt(0))){
				result = true;
			}
		}
		return result;
	}
	
	/** Transfers the group that has been built into the data structure
		PARAMS:
			void
		RETURNS:
			void
	*/
	function insertGroup(){
		
		// If a group id has not been assigned, bail out
		if (group.id.length == 0) return;
		
		// Get Level
		const cl = root.getRelativeLevel(group.id);
		/* */
		
		// our current level is an object which will only contain this group
		
		cl.element = group;
	}
	
	/** Sets the clause id of the group that is currently being built
		PARAMS:
			id : String - The clause id
		RETURNS:
			void
	*/
	function assignGroupId(id){
		group.id = id;
	}
	
	/** Adds a clone of the element to the group we are building
		PARAMS:
			curr : Element - The element we are adding to the group
		RETURNS:
			void
	*/
	function addToGroup(curr){
		group.appendChild(curr.cloneNode(true));
	}
	
	/** Pops the last element out of the group and returns it
		PARAMS:
			void
		RETURNS:
			Element/undefined - The last element in the group, undefined if no child elements
	*/
	function popOffGroup(){
		let result;
		
		// If there are elements in the group
		if (group.childElementCount){
			
			// remove the last element and return it
			result = group.removeChild(group.lastElementChild);
		}
		
		return result;
	}
	
	/** Clears out the old group, and makes a new one
		PARAMS:
			void
		RETURNS:
			void
	*/
	function resetGroup(){
		group = document.createElement(groupTagType);
	}
	
	/** Clears out the old tree, and makes a new one
		PARAMS:
			void
		RETURNS:
			void
	*/
	function resetRoot(){
		root = makeLevel("root");
	}
	
	/** Starts going through the DOM tree on one level and produces a datasctructure from it
		PARAMS:
			start : Element - The element we will start with
		RETURNS:
			Object - The root level
	*/
	this.consume = function(start){		
		resetRoot();
		resetGroup();
		
		// Set up an iterator to go through the DOM tree
		const iter = new DOMIterator(start);
		
		// Until we reach the end
		while (!isEnd(iter.curr)){
		
			// Do we care about this element?
			if (!isBlacklisted(iter.curr)){
				
				// Do we need to do something because it is a special element?
				if (isImportant(iter.curr)){
					
					// Get the clause ID (undefined if none)
					let id = getClauseId(iter.curr);
					
					// If it is the start of a clause (there is an ID here)
					if (id){
						
						// We might need to grab an anchor that is in the wrong group
						let ancr, ancr2;
						
						// If this clause has an anchor right before it (it should have one)
						if (iter.curr.previousElementSibling.tagName == "A"){
							
							// Get the anchor from the last group
							ancr = popOffGroup();
							
							// Annexes are really silly and make things difficult
							if (iter.curr.innerText.split(" ")[0] === "Annex"){
								popOffGroup();
								popOffGroup();
								popOffGroup();
								popOffGroup();
								ancr2 = popOffGroup();
							}
						}
					
						insertGroup();
						resetGroup();
						assignGroupId(id);
						
						// If we grabbed an anchor
						if (ancr){
							if (ancr2){
								addToGroup(ancr2);
							}
							
							// Make it be the start of this group
							addToGroup(ancr);
						}
						
						addToGroup(iter.curr);
						
					} else { // It isn't the start of a clause
						
						addToGroup(iter.curr);
						
					}
					
				} else { // It is a part of the clause we are already in
						 // It's probably a table or something like that
					
					addToGroup(iter.curr);
				}
			}
			
			// Move on to the next element
			iter.step();
		}
		
		return root;
	}
	
	/** Determines whether or not an element is the end of the "stream"
		Assigned as what is supplied or the default
		PARAMS:
			el : Element - The element we are checking
		RETURNS:
			Boolean - if the element was the end
	*/
	var isEnd = options.isEnd || function(el){
		let result = true;
		
		// Elements are "truthy" so, if the this element exists and so does the next one, this isn't the end
		if (el && el.nextElementSibling) result = false;
		
		return result;
	}
	
	// Deprecated because we pass in all of the important tags at construction
	/** Adds a tag to the list of important tags
		PARAMS:
			tag : String - The tag of the elements that are important
		RETURNS:
			void
	*
	this.addImportantTag = function(tag){
		iTags.push(tag.toUpperCase());
	}
	/* */
	
	// Deprecated because we pass in all of the blacklisted tags at construction
	/** Adds a tag to the list of blacklisted tags
		PARAMS:
			tag : String - The tag of the elements that are blacklisted
		RETURNS:
			void
	*
	this.addBlacklistTag = function(tag){
		bTags.push(tag.toUpperCase());
	}
	/* */
	
	// Deprecated because we pass in all of the false positive inducing first characters for the second words at construction
	/** Adds a character to the list of blacklisted characters that, when the first character in the second word when we find a clause start
		are indicative of a false positive
		PARAMS:
			c : String[length = 1] - The first character of the second word which would be indicative of a false positive
		RETURNS:
			void
	*
	this.addFalsePositveFirstCharacter = function(c){
		if (c.length == 1){
			fpfc.push(c);
		}
	}
	/* */
	
	// Deprecated because we pass in all of the important tags at construction
	/** Adds tags to the list of important tags
		PARAMS:
			tags : Array<String> - The tags of the elements that are important
		RETURNS:
			void
	*
	this.addImportantTags = function(tags){
		tags.forEach(this.addImportantTag)
	}
	/* */
	
	// Deprecated because we pass in all of the blacklisted tags at construction
	/** Adds tags to the list of Blacklisted tags
		PARAMS:
			tags : Array<String> - The tags of the elements that are blacklisted
		RETURNS:
			void
	*
	this.addBlacklistTags = function(tags){
		tags.forEach(this.addBlacklistTag)
	}
	/* */
	
	// Deprecated because we pass in all of the false positive inducing first characters for the second words at construction
	/** Add characters to the list of blacklisted characters that, when the first character in the second word when we find a clause start
		are indicative of a false positive
		PARAMS:
			cs : Array<String[length = 1]> - A list of first characters of the second word which would be indicative of a false positive
		RETURNS:
			void
	*
	this.addFalsePositiveFirstCharacters = function(cs){
		cs.forEach(this.addFalsePositveFirstCharacter);
	}
	/* */
}








/** Makes an empty level, Basically a class all on its own, but needed by Aggregator
	PARAMS:
		defaultID : String/undefined - Either the ID of this level (used for the element), or nothing
	RETURNS:
		Object - The empty level
*/
function makeLevel(defaultID){
	const l = {};
	
	/** Traverses through the tree and gets the level that would be there
		PARAMS:
			id : String - The relative ID of the level we are looking for
		RETURNS:
			Object : The level we are looking for
	*/
	l.getRelativeLevel = function(id, prepend){
		// if no prepend, make empty string
		prepend = prepend || "";
				
		let result;
		
		// If it has the child
		if (l.hasChild(id)) {
			result = l.getChild(id, prepend);
		} else {
			// Split into levels
			const levels = id.split(".");
			// get the first level
			const first = levels.shift();
			
			const child = l.getChild(first, prepend);
			
			// If this level didn't have the child to start off with
			if (levels.length == 0) {
				result = child;
			} else {
				// get the relative level to the next level
				const relLev = levels.join(".");
				
				// Add the ".", but only if it is needed
				if (prepend.length > 0) prepend += ".";
				
				const nextPrepend = prepend + first;
				result = child.getRelativeLevel(relLev, nextPrepend);
			}
			
		}
		return result;
	}
	
	/** Traverses through the tree and gets the level that would be there
		PARAMS:
			id : String - The relative ID of the level we are looking for
		RETURNS:
			Element : The element at the level we are looking for
	*/
	l.getRelativeElement = function(id){
		// If the id isn't a thing
		if (!id) return;
		
		// get the level of this element
		const level = l.getRelativeLevel(id);
		
		return level.element;
	}
	
	/** Traverses through the entire sub-tree and retrieves all of the keys in preorder
		PARAMS:
			prepend : String - The string that needs to be prepended onto these keys to maintain relative levels
		RETURNS:
			Array<String> - ALL of the keys, in preorder (useful), for the entire tree
	*/
	l.getAllKeys = function(prepend){
		// If not provided, make blank result
		let result = [];
		
		// If not provided, make prepend empty string
		prepend = prepend || "";
		
		// Grab the keys from this level
		const childrenKeys = Object.keys(l.children).sort(keySort);
		
		// Assemble in preorder
		for (let i = 0; i < childrenKeys.length; i++){
			// Add this child's key, including the prepend
			result.push(prepend + childrenKeys[i])
			
			// Grab this stuff for convenience
			const nextChild = l.getChild(childrenKeys[i]);
			const nextPrepend = prepend + childrenKeys[i] + ".";
			
			// Concatenate this child's subtree's keys
			const nextKeys = nextChild.getAllKeys(nextPrepend);
			result = result.concat(nextKeys);
		}
		
		return result;
	}
	
	/** Determines whether or not this level has a specific child
		PARAMS:
			id : String - The name of the child we are looking for
		RETURNS:
			Boolean - If the child exists
	*/
	l.hasChild = function(id){
		return l.children.hasOwnProperty(id);
	}
	
	/** Guaranteed to return a child with a specific name (could be dangerous)
		PARAMS:
			id : String - The name of the child we are looking for
		RETURNS:
			Object : The level that is the child we are looking for
	*/
	l.getChild = function(id, prepend){
		// If no prepend supplied, make empty string
		prepend = prepend || "";
		
		// If prepend supplied, add the "." to it
		if (prepend.length > 0) prepend += "."
		
		// Make it have the child
		if (!l.hasChild(id)){
			l.children[id] = makeLevel(prepend + id);
		}
		
		// return that child
		return l.children[id];
	}
	
	l.children = {};
	l.element = makeGroupElement(defaultID);
	
	return l;
}

/** Makes the element that would go inside a level and contains a group
	PARAMS:
		id : String/undefined - The clause id that the element should have
	RETURNS:
		Element - The element that can go inside a level
*/
function makeGroupElement(id){
	const el = document.createElement(groupTagType);
	el.id = id;
	return el;
}

/** Returns a DOM iterator
	PARAMS:
		start : Element - The start point
	RETURNS:
		DOMIterator - The iterator
*/
function DOMIterator(start){
	this.curr = start;
	
	/** Steps the focus of this iterator to the next sibling in the DOM tree
		PARAMS:
			void
		RETURNS:
			Element/null - The new element we are focusing on
	*/
	this.step = function(){
		
		// If there is a 
		if (this.curr){
			this.curr = this.curr.nextElementSibling;
		}
		
		return this.curr;
	}
}

/** Calculates the summation of the character codes of a string
	PARAMS:
		str : String - The string we are evaluating
	RETURNS:
		Number - The sum
*/
function sumCharCodes(str){
	let sum = 0;
	
	for (let i = 0; i < str.length; i++){
		sum += str.charCodeAt(i);
    }
	
	return sum;
}

/** Custom ascending sorting for a single level key (i.e. "1", "1DV", "11", "A", "H")
	PARAMS:
		a : String - One ID
		b : String - Another ID
	RETURNS:
		Number : 0 same value, >0 => a>b, <0 => a>b
*/
function keySort(a, b){
	// get the number, if there is no number, set the value to be 100000, because that is higher than any number than could reasonably exist in a standard with an ordinal scheme
	const valA = (parseInt(a)||100000)*1000 + sumCharCodes(a);
	const valB = (parseInt(b)||100000)*1000 + sumCharCodes(b);
	
	return valA - valB;
}