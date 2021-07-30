/********************/
/* Type Definitions */
/********************/
/**
 * @typedef ChatCommand
 * @property {String} name
 * @property {String} description
 */



/*********************/
/* Utility Functions */
/*********************/

/**
 * Executes a selector query on a node and returns the first match
 * @param {String} q - The selector query
 * @param {Node} el - The node to execute the query on, defaults to document
 * @returns {Node}
 */
function $(q, el = document){
	return el.querySelector(q);
}

/**
 * Executes a selector query on a node and returns all matching elements
 * @param {String} q - The selector query
 * @param {Node} el - The node to execute the query on, defaults to document
 * @returns {Array<Node>}
 */
 function $$(q, el = document){
	return Array.from(el.querySelectorAll(q));
}


/******************/
/* DOM References */
/******************/
const div_everyone = $("#everyone");
const div_subs = $("#subs");
const div_mods = $("#mods");
const template_command = $("#commandTemplate");



/********************/
/* Helper Functions */
/********************/
/**
 * Populates a command template and adds it to the category div
 * @param {ChatCommand} cmd - Command data
 * @param {Node} parent - Category div to add it to
 */
function addCommandTo(cmd, parent){
	const fragment = template_command.content.cloneNode(true);
	$(".name", fragment).textContent = cmd.name;
	$(".description", fragment).textContent = cmd.description;
	parent.appendChild(fragment);
}


const categoryParentMap = {
	"everyone": div_everyone,
	"subs": div_subs,
	"mods": div_mods
}

function populateCategories(){
	// For each category
	for (categoryName in categories){
		// Get this category
		const category = categories[categoryName];
		// Get this category's parent element
		const parent = categoryParentMap[categoryName];
		// For each command in this category
		for (command of category.commands){
			// Add this command to the parent element
			addCommandTo(command, parent);
		}
	}
}

populateCategories();