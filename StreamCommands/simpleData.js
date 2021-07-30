const categories = {
	"everyone": {
		"commands": [
			{
				name: "!commands",
				description: "Shows a link to this page."
			},
			{
				name: "!discord",
				description: "Shows a link to discord."
			},
			{
				name: "!followage",
				description: "Shows how long you've been following DaCrzyMan."
			},
			{
				name: "!watchtime",
				description: "Shows how many total hours you've watched DaCrzyMan."
			},
			{
				name: "!followers",
				description: "Shows how many people follow DaCrzyMan."
			},
			{
				name: "!subs",
				description: "Shows how many people are subscribed to DaCrzyMan."
			},
			{
				name: "!lurk",
				description: "Tells everyone that you'll be lurking."
			},
			{
				name: "!hi",
				description: "Bot will say hello and tell you that you are loved, that you matter, and that you are wanted here."
			},
			{
				name: "!discord",
				description: "Shows a link to discord."
			},
			{
				name: "!club",
				description: "Shows DaCrzyMan's TM Club name."
			},
			{
				name: "!paypal",
				description: "Shows how much DaCrzyMan paypals people so he can win."
			},
			{
				name: "!suggestionBox",
				description: "Shows a link to the suggestion form."
			},
			{
				name: "!bonk",
				description: "Plays a bonk noise and adds one (1) to the bonk count."
			},
			{
				name: "!bonks",
				description: "Shows how many bonks have been counted."
			},
			{
				name: "!hug {username}",
				description: "Hugs whoever you want it to, and it will tell you how many hugs have been given."
			},
			{
				name: "!hugs",
				description: "Shows how many hugs have been counted."
			},
			{
				name: "!hugme",
				description: "Gets you a hug directly from DaCrzyMan."
			},
			{
				name: "!hi5 {username}",
				description: "High 5's whoever you want it to, and it will tell you how many high 5's have been happened."
			},
			{
				name: "!join",
				description: "Put's you in the waitlist to queue up with DaCrzyMan."
			},
			{
				name: "!leave",
				description: "Takes you out of the waitlist to queue up with DaCrzyMan."
			},
			{
				name: "!waitlist",
				description: "Shows you how is currently in the waitlist."
			},
			{
				name: "!whoisplaying",
				description: "Shows who is currently in queue with DaCrzyMan."
			},
			{
				name: "!whoisnext",
				description: "Shows who is next in the waitlist to queue with DaCrzyMan."
			},
			{
				name: "!position",
				description: "Tells you where you are in the queue, or if you aren't."
			},
			{
				name: "!whoisnext",
				description: "Shows who is next in the waitlist to queue with DaCrzyMan."
			},
			{
				name: "!yeet",
				description: "Plays the \"yeet\" audio file."
			},
			{
				name: "!left",
				description: "Makes DaCrzyMan's car turn left a few times. 60s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!right",
				description: "Makes DaCrzyMan's car turn right a few times. 60s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!brake",
				description: "Makes DaCrzyMan's car brake a few times. 60s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!acc",
				description: "Makes DaCrzyMan's car accelerate a few times. 60s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!cam{1, 2, or 3}",
				description: "Set's DaCrzyMan's TM cam to 1, 2, or 3. 30s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!cam",
				description: "Toggles DaCrzyMan's TM cam. 60s cooldown. 30s cooldown in Chaos Mode."
			},
			{
				name: "!behind",
				description: "Make's DaCrzyMan's TM cam look backwards. 120s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!honk",
				description: "Turns DaCrzyMan's horn on. 30s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!quack",
				description: "An alias for !honk that only @7BearsBeyond can use. 30s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!cooldown {command}, !cd {command}",
				description: "Returns the cooldown for the command."
			},
			{
				name: "!rngcooldown",
				description: "Resets its own cooldown to a random duration between 0s and 180s."
			},
			{
				name: "!remindme {minutes} {reminder}",
				description: "Posts the reminder in however many minutes you tell it to."
			},
			{
				name: "!tutel",
				description: "Pops in the tutel video. 30s cooldown."
			},
			{
				name: "!honk",
				description: "Turns DaCrzyMan's horn on. 30s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!wato",
				description: "\"What-Are-The-Odds\". Checks each opportunity at the same time to see which ones you've beaten. 120s cooldown."
			},
			{
				name: "!wato list",
				description: "Lists all of the opportunities in \"What-Are-The-Odds\"."
			},
			{
				name: "!wom",
				description: "\"Wheel-Of-Misfortune\". Shows the wheel animation, tells you where it lands from 1-1,000,000, and if you won something. and 120s cooldown. 0s cooldown in Chaos Mode."
			},
			{
				name: "!wom list",
				description: "Lists all of the punishments in \"Wheel-Of-Misfortune\" you can inflict on DaCrzyMan."
			}
		]
	},
	"subs": {
		"commands": [
			{
				name: "None",
				description: "!left, !right, !acc, !brake, !behind will probably go behind a paywall and end up here."
			}
		]
	},
	"mods": {
		"commands": [
			{
				name: "!bonk-",
				description: "Removes a bonk, and plays a backwards bonk sound."
			},
			{
				name: "!wl_add @{username}",
				description: "Add a username to the waitlist to queue with DaCrzyMan."
			},
			{
				name: "!wl_rm @{username}",
				description: "Remove a username from the waitlist to queue with DaCzyMan."
			},
			{
				name: "!pushback @{username}",
				description: "Pushes a user from currently playing to the front of the waitlist."
			},
			{
				name: "!pushbackAll",
				description: "Pushes all users from currently playing to the front of the waitlist."
			},
			{
				name: "!cp_setLimit",
				description: "Sets the limit on how many players can be currently playing."
			},
			{
				name: "!nextMatch",
				description: "Grabs users from the waitlist to try and fully fill the currently playing queue."
			},
			{
				name: "!nextMatch {X}",
				description: "Grabs X number of users from the waitlist and pushes them into the currently playing queue."
			},
			{
				name: "!cp_add @{username}",
				description: "Adds a user to the end of the currently playing queue."
			},
			{
				name: "!cp_rm @{username}",
				description: "Removes a user from the currently playing queue."
			},
			{
				name: "!cp_clear",
				description: "Removes everyone from the currently playing queue."
			},
			{
				name: "!chaosmode",
				description: "Toggles Chaos Mode on or off."
			},
			{
				name: "!chaosmode {on, off}",
				description: "Turns Chaose Mode on or off."
			},
			{
				name: "!wato boost",
				description: "Toggles whether wato odds are twice as easy (boosted)."
			},
			{
				name: "!wato boost {on, off}",
				description: "Turns wato boost on or off."
			},
			{
				name: "!rickroll",
				description: "Rick rolls stream."
			},
			{
				name: "!think",
				description: "Shows the \"thinking\" overlay."
			},
			{
				name: "!sudoku",
				description: "Adds one to how many times DaCrzyMan's computer has committed sudoku."
			}
		]
	}
};