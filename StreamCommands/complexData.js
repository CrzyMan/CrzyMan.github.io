const commands = {
	"Categories": {
		"Bonkalytics": {
			"Bonks": [
				{
					"title": "!bonk",
					"specialTags": [],
					"description": "Plays a bonk noise and adds one (1) to the bonk count",
					"usage": "!bonk",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "Once every 15 seconds",
					"userRateLimit": "Once every 30 seconds"
				},
				{
					"title": "!bonk-",
					"specialTags": [],
					"description": "Plays a reversed bonk noise and subtracts one (1) from the bonk cont",
					"usage": "!bonk-",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!bonks",
					"specialTags": [],
					"description": "Shows how many bonks have been counted",
					"usage": "!bonks",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				}
			],
			"Hugs": [
				{
					"title": "!hug {target}",
					"specialTags": [],
					"description": "Hugs whoever you want it to, and it ",
					"usage": "!hug @7bearsbeyond",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!hug-",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!hugs",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!hugMe",
					"specialTags": [],
					"description": "!hugPlease, !INeedAHug",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				}
			],
			"High Fives": [
				{
					"title": "!hi5 {target}",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!hi5-",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				}
			],
			"Information": [
				{
					"title": "!bonkalytics {stat1} {stat2}",
					"specialTags": ["WIP"],
					"description": "Available stats are 'bonks', 'hugs', and 'hi5s'.",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				}
			]
		},
		"Queue With Me": {
			"Queueing": [
				{
					"title": "!join",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!leave",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				}
			],
			"Information": [
				{
					"title": "!whoisplaying",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!whoisnext",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!position",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				}
			],
			"Queue Management": [
				{
					"title": "!nextMatch",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!wl_add",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!wl_rm",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!cp_add",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!cp_setLimit",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!pushback",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				},
				{
					"title": "!pushbackAll",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free"],
					"globalRateLimit": "None",
					"userRateLimit": "None"
				}
			]
		},
		"Twitch Plays TM": {
			"Driving": [
				{
					"title": "!left",
					"specialTags": ["Chaos Mode"],
					"description": "",
					"usage": "",
					"permissions": ["mod", "sub"],
					"costs": ["free to mods and subs", "100 bits", "1000 Crzy Points"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				},
				{
					"title": "!right",
					"specialTags": ["Chaos Mode"],
					"description": "",
					"usage": "",
					"permissions": ["mod", "sub"],
					"costs": ["free to mods and subs", "101 bits", "1000 Crzy Points"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				},
				{
					"title": "!brake",
					"specialTags": ["Chaos Mode"],
					"description": "",
					"usage": "",
					"permissions": ["mod", "sub"],
					"costs": ["free to mods and subs", "101 bits", "1000 Crzy Points"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				},
				{
					"title": "!acc",
					"specialTags": ["Chaos Mode"],
					"description": "",
					"usage": "",
					"permissions": ["mod", "sub"],
					"costs": ["free to mods and subs", "200 bits", "2000 Crzy Points"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				}
			],
			"Camera": [
				{
					"title": "!cam{1, 2, or 3}",
					"specialTags": ["Chaos Mode"],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				},
				{
					"title": "!cam",
					"specialTags": ["Chaos Mode"],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				},
				{
					"title": "!behind",
					"specialTags": ["Chaos Mode"],
					"description": "",
					"usage": "",
					"permissions": ["mod", "sub"],
					"costs": ["free to mods and subs", "300 bits", "3000 Crzy Points"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				}
			],
			"Other": [
				{
					"title": "!honk",
					"specialTags": ["Chaos Mode"],
					"description": "",
					"usage": "",
					"permissions": ["everyone"],
					"costs": ["free"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				},
				{
					"title": "!quack",
					"specialTags": ["Chaos Mode"],
					"description": "",
					"usage": "",
					"permissions": ["7bearsbeyond"],
					"costs": ["free"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				},
				{
					"title": "!chaosMode",
					"specialTags": [],
					"description": "",
					"usage": "",
					"permissions": ["mod"],
					"costs": ["free to mods and subs", "1,000 bits", "20,000 Crzy Points"],
					"globalRateLimit": "Once every 60 seconds",
					"userRateLimit": "Once every 60 seconds"
				}
			]
		}
	}
};