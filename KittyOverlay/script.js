/******************/
/* TALK TO TWITCH */
/******************/
// Connect to the channel(s)
const client = new tmi.Client({
	channels: [
		"DaCrzyMan",
		"OneNiceKitty"
	]
});
client.connect().catch(console.error);

// Handle message when they come in
client.on("message", handleMessage);


/**
 * 
 * @param {String} channel 
 * @param {Tags} tags 
 * @param {String} message 
 * @param {Boolean} self 
 */
function handleMessage(channel, tags, message, self){
	// For each command
	for (cmd of commands){
		// If the message matches this command
		if (cmd.pattern.test(message)){
			// Run the command
			cmd.callback();
		}
	}
}

// Add the commands
const commands = [];
commands.push({
	"pattern": /^!kitty$/i,
	"callback": runKitty
});

commands.push({
	"pattern": /^!boo$/i,
	"callback": runBoo
});

/*********************/
/* Utility Functions */
/*********************/
$ = (q, el = document) => el.querySelector(q);
$$ = (q, el = document) => Array.from(el.querySelectorAll(q));

/******************/
/* DOM References */
/******************/
const video_kitty = $("#kitty video");
const video_boo = $("#boo video");


/*************/
/* Constants */
/*************/
const animationDuration = 1000;
const classNameToHide = "hidden";

/********************/
/* Helper functions */
/********************/
function runKitty(){
	runVideo(video_kitty, 5300);
}

function runBoo(){
	runVideo(video_boo, 1500)
}

function hideVideo(elem){
	elem.classList.add(classNameToHide);
}

function unhideVideo(elem){
	elem.classList.remove(classNameToHide);
}

function wait(ms){
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms);
	});
}

let currentlyShowing = false;

/**
 * Shows one video at a time
 * @param {Element} elem
 * @param {Number} duration 
 */
async function runVideo(elem, duration){
	if (currentlyShowing){
		// bail
		return;
	}

	currentlyShowing = true;

	unhideVideo(elem);

	await wait(animationDuration);

	elem.play();

	await wait(duration);

	hideVideo(elem);

	await wait(animationDuration);

	currentlyShowing = false;
}

