/*
*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var LEVEL = 1;
var curr_lev;
var exploring = false, exploreOffX = 0, exploreOffY = 0;

canvas.height = 440;
canvas.width = 600;

images_loaded = 0;
function images_check_in(){
	images_loaded++;
	if (images_loaded==4){
		draw_level();
	}
};
var image_player_sheet = new Image();
image_player_sheet.src = "player_sheet.png";
image_player_sheet.onload = images_check_in;
var image_block = new Image();
image_block.src = "block.png";
image_block.onload = images_check_in;
var image_goal = new Image();
image_goal.src = "goal.png";
image_goal.onload = images_check_in;
var image_brick = new Image();
image_brick.src = "brick.png";
image_brick.onload = images_check_in;


var player = {
	pos: new Vector2d(),
	carrying: false,
	direction: 1,
	lateral: function(d){

		if (exploring){
			exploreOffX+=d;
			draw_level();

			return;
		}

		player.direction=d
		
		// reset player and block, if carrying
		curr_lev[player.pos.y][player.pos.x] = 0;
		if (player.carrying)
			curr_lev[player.pos.y-1][player.pos.x] = 0

		// new player pos (npp) to requested position (rp) and store last position
		var lp = player.pos;
		var rp = player.pos.add(player.direction,0);
		var npp = request_position(player.pos, rp);

		//check if win
		if (curr_lev[npp.y][npp.x]==4){
			// YOU WIN
			curr_lev[player.pos.y][player.pos.x] = 0;
			player.pos = npp;
			draw_level();
			alert("YOU WIN!");

			LEVEL = 1 + LEVEL%levels_comp.length;
			reset_level();
			draw_level();

			return;
		}

		curr_lev[npp.y][npp.x] = 2;


		// carrying clause
		if (player.carrying){
			// request new position where it would be if moved to the side
			// will drop if the player goes down, or will stay then dropped if can't move to the side
			// request position above new player position at level the block used to be at
			var nbp = request_position(lp.add(0,-1), new Vector2d(npp.x,lp.y-1))
			curr_lev[nbp.y][nbp.x] = 3;

			// check if still carrying
			if (nbp.x != npp.x && nbp.y!= npp.y-1){
				player.carrying = false;
			}
		}

		// update player
		player.pos = npp;
		
		draw_level();
	},
	up: function(){
		
		var rp = player.pos.add(player.direction,-1);

		// can move up, carrying restriction and handling updates
		if (curr_lev[player.pos.y][player.pos.x+player.direction]!=0 && curr_lev[player.pos.y-1][player.pos.x]!=1 &&
			curr_lev[player.pos.y][player.pos.x+player.direction]!=4 &&
			!(curr_lev[player.pos.y-2][player.pos.x+player.direction] && player.carrying)){

			if (player.carrying)
				curr_lev[player.pos.y-1][player.pos.x] = 0;

			curr_lev[player.pos.y][player.pos.x] = 0;

			player.pos = request_position(player.pos, rp);
			if (player.carrying){
				curr_lev[player.pos.y-1][player.pos.x] = 3;
			}

			// check if win
			if (curr_lev[player.pos.y][player.pos.x]==4){
				// YOU WIN
				draw_level();
				alert("YOU WIN!");

				LEVEL = 1 + LEVEL%levels_comp.length;
				reset_level();
				draw_level();

			return;
		}


			curr_lev[player.pos.y][player.pos.x] = 2;
			
		}
		draw_level();

	},
	down: function(){
		if (player.carrying){
			//place the block
			curr_lev[player.pos.y-1][player.pos.x] = 0;
			var nbp = request_position(player.pos.add(0,-1), player.pos.add(player.direction,-1));
			curr_lev[nbp.y][nbp.x] = 3;

			// if not right above it anymore
			if (nbp.x != player.pos.x)
				player.carrying = false;

		} else {
			// not carrying
			// if a block to pick up 
			if (curr_lev[player.pos.y][player.pos.x+player.direction]==3 &&
			    !curr_lev[player.pos.y-1][player.pos.x+player.direction] &&
			    !curr_lev[player.pos.y-1][player.pos.x]){
				curr_lev[player.pos.y][player.pos.x+player.direction] = 0;
				curr_lev[player.pos.y-1][player.pos.x] = 3;
				player.carrying = true;
			}
		}
		draw_level();
	}
};

function request_position(current, requested){
	// determine if requested position is currently occupyable
	if (curr_lev[requested.y][requested.x]==0 || curr_lev[requested.y][requested.x]==4){
		//check if need to drop down
		if (!curr_lev[requested.y+1][requested.x]){
			while (curr_lev[requested.y+1][requested.x]==0 || curr_lev[requested.y+1][requested.x]==4) {requested.y++;}
		}
		return requested;
	}
	
	// if not, return substitute position, drop if nothing beneath
	if (!curr_lev[current.y+1][current.x]){
		while (!curr_lev[current.y+1][current.x]) {current.y++;}
	}
	return current;
};

function compress_level(l){
	var key = ['a','b','p','m','g',''];
	var ina = 0, last = 5, str = "";
	for (var row in l){
		for (var col=0; col<l[row].length; col++){
			if (l[row][col] == last){
				ina++;
			} else {
				if (ina >1) str+= ina;
				str+=key[last];
				last = l[row][col], ina = 1;
			}
			if (col == l[row].length-1){
				if (ina >1) str+= ina;
				str+=key[last];
			}
		}
		last = 5, ina = 0, str+=":";
	}
	str = str.slice(0,str.length-1);
	return str;
}

function decompress_level(l){
	var key = {'b': 1, 'm': 3, 'a': 0, 'p': 2, 'g': 4};
	var myLevel = [];
	var post_levels = l.toString().split(':');
	for(var r in post_levels){
		var myar = [];
		var mystr = post_levels[r];
		while (mystr.search(/[a-z]/)!=-1){
			var s = mystr.search(/[a-z]/)+1;
			myar.push(mystr.slice(0,s));
			mystr = mystr.slice(s);
		}
		post_levels[r] = myar;
	}

	
	for (var row=0; row<post_levels.length; row++){
		myLevel.push([])
		for (var col=0; col<post_levels[row].length; col++){

			var str = post_levels[row][col];
			var len = str.length;
			var bl = key[str[len - 1]];
			var num = parseInt(str.slice(0,len -1)) || 1;

			for (var i = 0; i < num; i++){
				myLevel[row].push(bl);
			}
		}
	}
	return myLevel;
}

var levels_comp = [
	// b = 1 brick, m = 1 movable, a = 1 air, p = 1 layer, g = 1 goal, 20b = 20 bricks etc.
	/* level 1 */
	"20b:b18ab:b18ab:b3ab8ab5ab:bg2ab4abamabamp2ab:20b",

	/* Level 2 */
	"ab4a2b9a2b4a:2b17ab:bg18ab:2b19ab:ab11ab3am4ab:ab11abama2mp2ab:a5b3a14b:5ab2amb:5a5b",

	/* level 3 */
	"ab3a13ba:babab13ab:b2ab14ab:b16amb:b15a2mb:ba3b4ap3abma2b:babab4ab2a5b:babab2ma2b2ab:bgba6ba2b:3ba2b3a3b",

	/* level 4 */
	"18ab5a:17abab:7ab8ab3ab:6abab6ab5ab:3a3b3ab4ab7ab:2ab7ab2ab9ab:ab9a2b10ab:ab20amb:ab19a2mb:ab15ap3a3b:2b4ab10ab3ab:bg4abam8a5b:5babam3am2a3b:4ababamababmab:4aba10b:4a3b",

	/* level 5 */
	"5a3b4a9ba:a4b3a4b9ab:b20ab:b20ab:b20ab:b5ab14ab:b5ab14ab:b5ab4m10ab:bg3a7bp8ab:2ba3b5a2bab5amb:abab8aba2b3a2mb:abab8aba2b2a3mb:a3b8aba8b:12a3b",

	/* level 6 */
	"a3b13a4b:ab2a13b3ab:2b18ab:bg18ab:2b18ab:ab16a2mb:ab2m8ab2am2a3b:ab3m7abp3mab:ab4m6a5bab:a5b4a3b3a3b:5ab3amb:5a2ba3b:6a3b",

	/* level 7 */
	"2ab3a5b3a2b3a3b2a:ababab5abab2abab3ab:ab2a2b6a2b3a2b4ab:ab3ab7ab4ab4ab:ab20amb:ab20amb:2b19a2mb:bg3am15a3b:2b3abam5ab4a2bab:ab3abam4a2bamap4b:a2b2aba3m2a2ba3mb:2ab2a6ba7b:2a2bab4a3b:3a3b",

	/* level 8 */
	"a3b7a4b3a7b2a:b3ab5ab4abab7ab:b4ab3ab5a2b9ab:bm4a3b4abab5a3b2ab:b2m9a2b6a2bab2ab:4b7a2b10abgab:3a2b12a2b4a2bab:2ab4amab6ab2ab6ab:2ab4ambab4ab3ab6ab:ab3a3b3ab4ab2ab5amb:ab6abab6a2b5a2mb:b8ab11a6b:b12am12ab:b4am6a3b10amb:b3a3b17a2mb:b8am7am2ap2a3mb:27b",

	/* level 9 */
	"8a3b9a:7ab3ab:6ab5ab2a5b:5ab7a2b4ab:4ab5am8ab:3ab6a2m6amb:2ab7a3b4a2mb:ab12apa4b:b13am4ab:bg11a3b3ab:2b4a2b3ab6amb:ab4a2bm2a2b3a4b:ab4a7b2a2b:a3b2ab5aba2b:3aba2b5a3b:3a3b",

	/* level 10 */
	"3a21b3a:a2b11ab9ab:4bm7a2mbm3a3mam2b:b2a2b2ab3a5b2am3ba2bab:b3ab2a2b8a3ba3b2ab:b3a2b2a2b4m12ab:bg7a7b10ab:2b8ab3a3b8a2b:ab5am3abab2a2b8ab:ab5ab4ab4a2b7ab:a4b2a2b12a6b:3a5b6ap11ab:3ab10ab11ab:3ab9a2b4a8b:3ab8a2b11ab:3ab10am9amb:3abm4a11b3a2mb:3ab2m2a2b9a2ba3mb:3a6b11a6b",

	/* level 11 */
	"29b:b2ab3ab20ab:b5amb2m12a5bab:bm3a3bam2b5am2a2b2agabab:b2m4a3b3ap2am7ababab:3b2a2mb5abam10abab:b3a4b6ab2a3b3a3b2ab:bm12abab6ab2amab:b2m7a3bababm4ab2a4b:4bam3a3b2aba2bm2abamab2ab:b11ama3b2amb3ab3ab:b3am5a2mab3a4b7ab:b4a9b8a5bab:b14am3am2b4abab:4b11am3ab4a2mbab:ba2b3ab4ab10a4bab:2ba3bab4ab3a3mam7ab:bababa2b4ab8a3m4ab:29b"
];

reset_level();
function reset_level(){
	curr_lev = decompress_level(levels_comp[LEVEL-1]);

	player.pos = find_player_pos();
	player.direction = 1;
	player.carrying = false;

}

function find_player_pos(l){
	if (l==null)l=LEVEL;
	l--;
	for (var r = 0; r < curr_lev.length; r++){
		for (var c = 0; c < curr_lev[r].length; c++){
			if (curr_lev[r][c]==2) return new Vector2d(c,r);
		}
	}
	return new Vector2d();
}

//draw_level();
function draw_level(l){
	if (l==undefined) l=LEVEL;

	ctx.clearRect(0,0,canvas.width, canvas.height);
	l--;

	// move screen
	ctx.save()
	var offsetx = 280-(40*player.pos.x),
	    offsety = 200-(40*player.pos.y);
	
	if (player.pos.x > curr_lev[0].length-8){
		offsetx = 280-(40*(curr_lev[0].length-8));
	} else if (player.pos.x < 7){
		offsetx = 280-(40*7);
	}

	offsetx -= exploreOffX*40;
	offsety -= exploreOffY*40;
	
	var first_row = curr_lev[0];
	if (offsetx < 280-(40*(first_row.length-8))){
		exploreOffX--;
		offsetx = 280-(40*(first_row.length-8));
	} else if (offsetx>0){
		exploreOffX++;
		offsetx = 0;
	}
	

	ctx.translate(offsetx, offsety);

	// draw blocks
	for (var row=0; row<curr_lev.length; row++){
		for (var col=0; col<curr_lev[row].length; col++){
			if (curr_lev[row][col]){
				switch (curr_lev[row][col]){
					//brick
					case 1:
						ctx.drawImage(image_brick, 40*col, 40*row);
						break;

					// player
					case 2:
						// context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
						var d = player.direction==1?0:2;
						var c = player.carrying==true?1:0;
						ctx.drawImage(image_player_sheet, 40*(d+c), 0, 40, 40, 40*col, 40*row, 40, 40);
						break;

					// block
					case 3:
						ctx.drawImage(image_block, 40*col, 40*row);
						break;

					// goal
					case 4:
						ctx.drawImage(image_goal, 40*col, 40*row);
						break;
				}

				if (curr_lev[row][col]==2){
					//ctx.strokeRect(40*col + 35*(player.direction==1), 40*row + 15, 5,5);
				}
			}
		}
	}

	// move canvas back
	ctx.restore();

}

// Key Binding Functions //
var binded_keys = {};
// bind( code, func, *args)
function bind(){
	code = arguments[0];
	func = arguments[1];
	args = [];
	for (var i = 2; i<arguments.length; i++){
		args.push(arguments[i]);
	}
	binded_keys[code] = [func,args];
}

document.onkeydown = check_bindings;
function check_bindings(e){
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	
	try {
		binded_keys[keycode][0].apply(this, binded_keys[keycode][1]);
	} catch (e){}
}

document.onkeyup = function(e){
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;

	if (keycode==16){
		exploring = false;
		exploreOffY=0;
		exploreOffX=0;
		draw_level();
	}
};

//**//

//left arrow
bind(37, player.lateral, -1);
//up arrow
bind(38, player.up);
//right arrow
bind(39, player.lateral, 1);
//down arrow
bind(40, player.down);
//shift
bind(16, function(){exploring=true;});

//reset a.k.a r
bind(82, function(){reset_level(); draw_level();});