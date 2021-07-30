/* **************** */
/* TYPE DEFINITIONS */
/* **************** */
/**
 * @typedef  {Object}	Command
 * @property {String} 	Command.title
 * @property {Array<String>} Command.specialTags
 * @property {String} 	Command.description
 * @property {String} 	Command.usage
 * @property {Array<String>}	Command.permissions
 * @property {Array<String>}	Command.costs
 * @property {String} 	Command.globalRateLimit
 * @property {String} 	Command.userRateLimit
 */

/* ***************** */
/* UTILITY FUNCTIONS */
/* ***************** */

/**
 * Query helper
 * @param {String} q query
 * @param {Node} el Element to execute the query on
 * @returns {Node}
 */
function $(q, el){ return (el || document).querySelector(q); }

/**
 * QueryAll helper
 * @param {String} q query
 * @param {Node} el Element to execute the query on
 * @returns {Array<Node>}
 */
function $$(q, el){ return Array.from((el || document).querySelectorAll(q)); }


/* ************** */
/* DOM REFERENCED */
/* ************** */
const elem_menuZone = $("#menuZone");
const elem_searchZone = $("#searchZone");
const elem_commandsZone = $("#commandsZone");

const template_command = $("#commandTemplate");
const template_commandSection = $("#commandSectionTemplate");


/* **************** */
/* HELPER FUNCTIONS */
/* **************** */

/**
 * Fills a command template with a command
 * @param {Command} cmd The command we are using to populate the template
 * @returns {DocumentFragment}
 */
function getFilledCommandTemplate(cmd){
	const elem_command = getCommandTemplateClone();

	$(".titleHolder", elem_command).textContent = cmd.title;

	addSpecialTagsTo(cmd, $(".specialTags", elem_command));

	addDescriptionTo(cmd, $(".descriptionHolder", elem_command));
	
	addUsageTo(cmd, $(".usageHolder", elem_command));

	addPermissionsTo(cmd, $(".permissions", elem_command));

	addCostsTo(cmd, $(".costs", elem_command));

	addGlobalRateLimitTo(cmd, $(".globalRateLimitHolder", elem_command));

	addUserRateLimitTo(cmd, $(".userRateLimitHolder", elem_command));

	return elem_command;
}

/**
 * Adds a command's description to it's element
 * @param {Command} cmd 
 * @param {Node} elem_description 
 */
function addDescriptionTo(cmd, elem_descriptionHolder){
	elem_descriptionHolder.appendChild(
		makeDivWithClassesAndText(["description"], cmd.description)
	);
}

/**
 * Adds a command's usage to it's element
 * @param {Command} cmd 
 * @param {Node} elem_usageHolder 
 */
function addUsageTo(cmd, elem_usageHolder){
	elem_usageHolder.appendChild(
		makeDivWithClassesAndText(["usage"], cmd.usage)
	);
}

/**
 * Adds a command's special tags to it's element
 * @param {Command} cmd 
 * @param {Node} elem_specialTags 
 */
function addSpecialTagsTo(cmd, elem_specialTags){
	// Get each special tag
	cmd.specialTags
	// For each tag
	.forEach(tag => {
		// Add to the special tags element
		elem_specialTags.appendChild(
			// The element for this special tag
			makeDivWithClassesAndText(["specialTag", tag], tag)
		);
	});
}



/**
 * Add a command's permissions to it's element
 * @param {Command} cmd 
 * @param {Node} elem_permissions 
 */
function addPermissionsTo(cmd, elem_permissions){
	// Get each permission level
	cmd.permissions
	// For each one
	.forEach(level => {
		// Add to the permissions element
		elem_permissions.appendChild(
			// The element for this permission
			makeDivWithClassesAndText(["permission", level], level)
		);
	});
}


/**
 * Add a command's permissions to it's element
 * @param {Command} cmd 
 * @param {Node} elem_costs 
 */
function addCostsTo(cmd, elem_costs){
	// Get the costs
	cmd.costs
	// For each cost
	.forEach(cost => {
		// Add to the costs element
		elem_costs.appendChild(
			// The element for this cost
			makeDivWithClassesAndText(["cost"], cost)
		);
	});
}


/**
 * Adds a command's global rate limit holder to it's element
 * @param {Command} cmd 
 * @param {Node} elem_globalRateLimitHolder 
 */
function addGlobalRateLimitTo(cmd, elem_globalRateLimitHolder){
	elem_globalRateLimitHolder.appendChild(
		makeDivWithClassesAndText(["rateLimit"], cmd.globalRateLimit)
	);
}


/**
 * Adds a command's user rate limit holder to it's element
 * @param {Command} cmd 
 * @param {Node} elem_userRateLimitHolder 
 */
 function addUserRateLimitTo(cmd, elem_userRateLimitHolder){
	elem_userRateLimitHolder.appendChild(
		makeDivWithClassesAndText(["rateLimit"], cmd.userRateLimit)
	);
}


/**
 * Takes in some classes and text and gives back a 
 * @param {Arrray<String>} classes 
 * @param {String} text 
 * @returns {Node} The element
 */
function makeDivWithClassesAndText(classes, text){
	const elem = document.createElement("div");
	// make sure class names are validd
	classes = classes.map(className => {
		return className
			.replace(" ", "_");
	})
	elem.classList.add(...classes);
	elem.textContent = text;
	return elem;
}

/**
 * Fills a command template with a command
 * @param {Command} cmd The command we are using to populate the template
 * @param {String} name The name of this command section
 * @returns {DocumentFragment}
 */
 function getFilledCommandSectionTemplate(cmd, name){
	const elem_sectionHolder = getCommandSectionTemplateClone();

	$(".titleHolder", elem_sectionHolder).textContent = name;

	const elem_commands = $(".commands", elem_sectionHolder);

	addCommandsTo(cmd, elem_commands);
	
	return elem_sectionHolder;
 }

/**
 * 
 * @param {Array<Command>} commands 
 * @param {Node} parent 
 */
function addCommandsTo(commands, parent){
	// If commands is a list
	if (Array.isArray(commands)){
		commands.forEach(cmd => {
			// add each to the parent
			parent.appendChild(
				getFilledCommandTemplate(cmd)
			);
		});
		// bail
		return;
	}

	// If commands is an object with sections
	// Get all the sections
	const sectionNames = Object.keys(commands);
	// Go through each section
	for (let sectionName of sectionNames){
		// Make a section template
		const elem_section = getFilledCommandSectionTemplate(commands[sectionName], sectionName);
		
		// Add this section to the parent
		parent.appendChild(elem_section);
	}

}

/**
 * 
 * @returns {DocumentFragment} Template for the command
 */
function getCommandTemplateClone(){
	return template_command.content.cloneNode(true);
}

/**
 * 
 * @returns {DocumentFragment} Template for the command
 */
 function getCommandSectionTemplateClone(){
	return template_commandSection.content.cloneNode(true);
}


/* ************** */
/* BUSINESS LOGIC */
/* ************** */

addCommandsTo(commands.Categories, $("#commandsZone"));

$$(".command").forEach(elem_cmd => {
	elem_cmd.addEventListener("click", () => {
		// if not selected
		if (!elem_cmd.matches(".selected")){
			// selected
			elem_cmd.classList.add("selected");
			// bail
			return;
		}

		// de-select
		elem_cmd.classList.remove("selected");
	});
});