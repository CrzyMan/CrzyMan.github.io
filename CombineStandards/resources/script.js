/* */
// Handle File dropping
const dropWrapper = document.getElementById("dropWrapper");
dropWrapper.ondragover = function(evt){
	evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

/* */



/** Places a script into the head of the document and gives back a promise
	PARAMS:
		src : String - The path to the script
		callback : function - The callback function to be called once the script is loaded
	RETURNS:
		Promise - The promise that will resolve once the script loads
*/
function loadScript(src){
	return new Promise((resolve, reject) => {
		const s = document.createElement("script");
		// s.async = true; // Based on experimentation, this does not speed things up
		s.src = src;
		s.onload = resolve;
		s.onerror = () => reject(src);
		document.head.appendChild(s);
	});
}

const parser = new DOMParser();
/** Takes a string and returns the DOM version
	PARAMS:
		str : String - the string of the HTML file we are processing
	RETURNS:
		DOM : The DOM version of the HTML
*/
function strToDOM(str){
	return parser.parseFromString(str, "text/html");
}

// Holds the standards
const Standards = {};


/** Loads in the scripts for the Aggregator, Combiner, and parser
	PARAMS:
		void
	RETURNS:
		Promise - Resolves once the scripts are all loaded
*/
function loadNeededScripts(){
	return new Promise((resolve, reject) => {
		Promise.all([
			loadScript("resources/Aggregator.js"),
			loadScript("resources/Combine.js"),
			loadScript("resources/ParseToHTML.js")
		])
		.then(resolve)
		.catch(reject);
	});
}


let ag;
var root1, root2, comboRoot, comboDom, dom1, dom2;

/** Wait until a new part is dropped in
	PARAMS:
		void
	RETURNS:
		Promise - The promise that will resolve upon loading the file
*/
function waitForStandard(num){
	
	return new Promise((resolve, reject) => {
		
		document.querySelector(".dropZone" + num).ondrop = function (e) {
			e.preventDefault();
			
			if (num == 1){
				document.querySelector(".dropZone1").classList.add("fadeOut");
			} else if (num == 2){
				document.querySelector(".dropZone2").classList.add("fadeOut");
			}

			var file = e.dataTransfer.files[0],
				reader = new FileReader();
			
			const fileName = file.name.split(".html")[0];
			
			reader.onload = function (event) {
				
				// Switch over the drop zones
				if (num == 1){
					document.querySelector(".dropZone1").style.display = "none";
					//document.querySelector(".dropZone1").classList.add("fadeOut");
					
					document.querySelector(".dropZone2").classList.remove("hide")
					
					// Process the 
					dom1 = strToDOM(event.currentTarget.result);
					const start = dom1.getElementById("start");
					root1 = ag.consume(start);
				} else if (num == 2){
					document.querySelector("#dropWrapper").style.display = "none";
					document.querySelector(".loadWrapper").classList.remove("hide")
					
					dom2 = strToDOM(event.currentTarget.result);
					const start = dom2.getElementById("start");
					root2 = ag.consume(start);
				}
				resolve([fileName, event.currentTarget.result]);
			};
			
			reader.onabort = reject;
			
			reader.readAsText(file);

			return false;
		};
	});
}

/** Prompt for standards, then load them in and return the full standard string
	PARAMS:
		void
	RETURNS:
		Promise - Resolves once the scripts are loaded and returns an array with the standard 1 and standard 2 full strings
*/
function getStandards(){
	return new Promise((resolve, reject) => {
		Promise.all([
			waitForStandard(1),
			waitForStandard(2)
		])
		.then((stds) => {
			wait(50)
			.then(() => resolve(stds));
		});
	});
}

/** Passes the standards to the aggregator, combiner, then the toHTML parser, then displays
	PARAMS:
		stds : Array<String> - The list of full standard strings
	RETURNS:
		void
*/
function parseAndShowStandards(stds){
	// Processing: 			~800ms
	// Rendering to screen: ~1400ms
	
	// Processing could be done sooner, 
	
	/* Offboarded to when the file is dropped *
	// Get the two DOMs
	const dom1 = strToDOM(stds[0][1]);
	const dom2 = strToDOM(stds[1][1]);

	// I added the ID "start" to the elements I wanted the aggregator to start with
	const start1 = dom1.getElementById("start");
	const start2 = dom2.getElementById("start");
	
	// Aggregate each tree
	root1 = ag.consume(start1);
	root2 = ag.consume(start2);
	/* */
	
	// Combine the trees
	comboRoot = combine(root1, root2);
	
	// Parse tree to HTML
	comboDom = parseToHTML(comboRoot);
	
	// Hide the load wrapper
	hideLoadWrapper();
	
	// Add to page
	document.body.appendChild(comboDom);
	
	// Change Title
	document.title = stds[1][0] + " and " + stds[0][0];
	
}

/** Set up the aggregator
	PARAMS:
		void
	RETURNS:
		void
*/
function setUpAg(){
	/*
		"important" set is "p", "blockquote", and "h4"
		the "<H2>" title element right before the clauses start is the "start" element
		aggregator handles elements and assembling them into a favorable format
		"end" element is either null(end of DOM level)
	*/
	
	// Initialize
	ag = new Aggregator({
		importantTags:
			["P", "BLOCKQUOTE", "H4", "H2"],
			
		blacklistedTags:
			["FONT"],
			
		falsePositiveFirstCharacters:
			['=', '°', 'K', 'N']
	});
	
	// Add important tags
	//ag.addImportantTags();
	
	// Add blacklist tags
	//ag.addBlacklistTags(["FONT"]);
	
	// Add blacklisted false positive inducing second word first characters
	//ag.addFalsePositiveFirstCharacters(['=', '°', 'K', 'N']);
}


/** Usually will be called when a path to a standard can't be found, and will alert the user
	PARAMS:
		path : String - The path to the file
	RETURNS:
		void
*/
function stdsError(path){
	hideLoadWrapper();
	if (path){
		alert("Couldn't find standard: " + extractStandardFromPath(path));
	}
}

/** Takes a path to a standard and extracts the name of the standard
	PARAMS:
		path : String - The path to the file
	RETURNS:
		String - Just the name of the standard
*/
function extractStandardFromPath(path){
	console.log(path);
	const start = path.lastIndexOf("/") + 1;
	const end = path.lastIndexOf(".js");
	return path.substring(start, end);
}

/** Shows the load wrapper
	PARAMS:
		void
	RETURNS:
		void
*/
function showLoadWrapper(){
	document.getElementsByClassName("loadWrapper")[0].classList.remove("hide");
}

/** Hides the load wrapper
	PARAMS:
		void
	RETURNS:
		void
*/
function hideLoadWrapper(){
	document.getElementsByClassName("loadWrapper")[0].classList.add("hide");
}

/** Returns a promise that resolves once the page loads
	PARAMS:
		void
	RETURNS:
		Promise - Resolves once the page loads
*/
function loadBody(){
	return new Promise((resolve) => {
		document.body.onload = resolve;
	});
}

/** Curries and returns a function that returns a promise that resolves after a provided number of milliseconds
	PARAMS:
		time : Number - The number of milliseconds we are going to wait
	RETURNS:
		Function - returns a functionpromise that resolves after the provided number of milliseconds
*/
function wait(time){
	return new Promise((resolve) => window.setTimeout(resolve, time));
}



// Load in needed scripts first, get the standards we are combining, then make HTML
// Using promises cause I wanna
// Also, it cleans up index.html scripts
// Definitely sets up the framework to be ready to download things from a network and need to wait
// Also need to let the page load in first
(function(){
	/* */
	loadBody()
	.then(loadNeededScripts)
	.then(setUpAg)
	.then(getStandards)
	.then(parseAndShowStandards)
	.catch(stdsError)
	/* */
})();
