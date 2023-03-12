import{S as T,i as A,s as x,k as g,q as k,a as $,l as v,m as M,r as b,h as u,c as P,n as _,b as y,G as w,u as C,H as z,g as f,v as O,f as R,d as D,J as B,y as E,z as V,A as I,B as W}from"./index.d7db5ae4.js";function G(l){let o,a=l[0].name+"",n,i,c,m=l[0].description+"",d;return{c(){o=g("div"),n=k(a),i=$(),c=g("div"),d=k(m),this.h()},l(e){o=v(e,"DIV",{class:!0});var h=M(o);n=b(h,a),h.forEach(u),i=P(e),c=v(e,"DIV",{class:!0});var t=M(c);d=b(t,m),t.forEach(u),this.h()},h(){_(o,"class","name svelte-1eknrgs"),_(c,"class","description svelte-1eknrgs")},m(e,h){y(e,o,h),w(o,n),y(e,i,h),y(e,c,h),w(c,d)},p(e,[h]){h&1&&a!==(a=e[0].name+"")&&C(n,a),h&1&&m!==(m=e[0].description+"")&&C(d,m)},i:z,o:z,d(e){e&&u(o),e&&u(i),e&&u(c)}}}function L(l,o,a){let{command:n}=o;return l.$$set=i=>{"command"in i&&a(0,n=i.command)},[n]}class H extends T{constructor(o){super(),A(this,o,L,G,x,{command:0})}}function S(l,o,a){const n=l.slice();return n[1]=o[a],n}function q(l){let o,a;return o=new H({props:{command:l[1]}}),{c(){E(o.$$.fragment)},l(n){V(o.$$.fragment,n)},m(n,i){I(o,n,i),a=!0},p(n,i){const c={};i&1&&(c.command=n[1]),o.$set(c)},i(n){a||(f(o.$$.fragment,n),a=!0)},o(n){D(o.$$.fragment,n),a=!1},d(n){W(o,n)}}}function j(l){let o,a,n=l[0].name+"",i,c,m,d=l[0].commands,e=[];for(let t=0;t<d.length;t+=1)e[t]=q(S(l,d,t));const h=t=>D(e[t],1,1,()=>{e[t]=null});return{c(){o=g("div"),a=g("div"),i=k(n),c=$();for(let t=0;t<e.length;t+=1)e[t].c();this.h()},l(t){o=v(t,"DIV",{class:!0});var r=M(o);a=v(r,"DIV",{class:!0});var s=M(a);i=b(s,n),s.forEach(u),c=P(r);for(let p=0;p<e.length;p+=1)e[p].l(r);r.forEach(u),this.h()},h(){_(a,"class","header svelte-1avavwt"),_(o,"class","category svelte-1avavwt")},m(t,r){y(t,o,r),w(o,a),w(a,i),w(o,c);for(let s=0;s<e.length;s+=1)e[s]&&e[s].m(o,null);m=!0},p(t,[r]){if((!m||r&1)&&n!==(n=t[0].name+"")&&C(i,n),r&1){d=t[0].commands;let s;for(s=0;s<d.length;s+=1){const p=S(t,d,s);e[s]?(e[s].p(p,r),f(e[s],1)):(e[s]=q(p),e[s].c(),f(e[s],1),e[s].m(o,null))}for(O(),s=d.length;s<e.length;s+=1)h(s);R()}},i(t){if(!m){for(let r=0;r<d.length;r+=1)f(e[r]);m=!0}},o(t){e=e.filter(Boolean);for(let r=0;r<e.length;r+=1)D(e[r]);m=!1},d(t){t&&u(o),B(e,t)}}}function K(l,o,a){let{category:n}=o;return l.$$set=i=>{"category"in i&&a(0,n=i.category)},[n]}class J extends T{constructor(o){super(),A(this,o,K,j,x,{category:0})}}const N=[{name:"Everyone",commands:[{name:"!d{size}",description:"Roll a die of a particular size. e.g. !D20 rolls a twenty sided die, and !D1000 rolls a 1,000 sided die."},{name:"!commands",description:"Shows a link to this page."},{name:"!followage",description:"Shows how long you've been following DaCrzyMan."},{name:"!watchtime",description:"Shows how many total hours you've watched DaCrzyMan."},{name:"!followers",description:"Shows how many people follow DaCrzyMan."},{name:"!subs",description:"Shows how many people are subscribed to DaCrzyMan."},{name:"!lurk",description:"Tells everyone that you'll be lurking."},{name:"!hi",description:"Bot will say hello and tell you that you are loved, that you matter, and that you are wanted here."},{name:"!discord",description:"Shows a link to discord."},{name:"!club",description:"Shows DaCrzyMan's TM Club name."},{name:"!paypal",description:"Shows how much DaCrzyMan paypals people so he can win."},{name:"!suggestionBox",description:"Shows a link to the suggestion form."},{name:"!bonk",description:"Plays a bonk noise and adds one (1) to the bonk count."},{name:"!bonks",description:"Shows how many bonks have been counted."},{name:"!hug {username}",description:"Hugs whoever you want it to, and it will tell you how many hugs have been given."},{name:"!hugs",description:"Shows how many hugs have been counted."},{name:"!hugme",description:"Gets you a hug directly from DaCrzyMan."},{name:"!hi5 {username}",description:"High 5's whoever you want it to, and it will tell you how many high 5's have been happened."},{name:"!join",description:"Put's you in the waitlist to queue up with DaCrzyMan."},{name:"!leave",description:"Takes you out of the waitlist to queue up with DaCrzyMan."},{name:"!waitlist",description:"Shows you how is currently in the waitlist."},{name:"!whoisplaying",description:"Shows who is currently in queue with DaCrzyMan."},{name:"!whoisnext",description:"Shows who is next in the waitlist to queue with DaCrzyMan."},{name:"!position",description:"Tells you where you are in the queue, or if you aren't."},{name:"!whoisnext",description:"Shows who is next in the waitlist to queue with DaCrzyMan."},{name:"!yeet",description:'Plays the "yeet" audio file.'},{name:"!honk",description:"Turns DaCrzyMan's horn on. 30s cooldown. 0s cooldown in Chaos Mode."},{name:"!quack",description:"An alias for !honk that only @7BearsBeyond can use. 30s cooldown. 0s cooldown in Chaos Mode."},{name:"!cooldown {command}, !cd {command}",description:"Returns the cooldown for the command."},{name:"!rngcooldown",description:"Resets its own cooldown to a random duration between 0s and 180s."},{name:"!remindme {minutes} {reminder}",description:"Posts the reminder in however many minutes you tell it to."},{name:"!tutel",description:"Pops in the tutel video. 30s cooldown."},{name:"!wato",description:`"What-Are-The-Odds". Checks each opportunity at the same time to see which ones you've beaten. 120s cooldown.`},{name:"!wato list",description:'Lists all of the opportunities in "What-Are-The-Odds".'},{name:"!wom",description:'"Wheel-Of-Misfortune". Shows the wheel animation, tells you where it lands from 1-1,000,000, and if you won something. and 120s cooldown. 0s cooldown in Chaos Mode.'},{name:"!wom list",description:'Lists all of the punishments in "Wheel-Of-Misfortune" you can inflict on DaCrzyMan.'},{name:"!cotd",description:"Explains what Cup-of-the-day is, whether one is currently going, and how long until the next one."},{name:"!wotd",description:"Displays today's word-of-the-day from Wordnik.com."},{name:"!pool%",description:'Explains what in the world "POOL%" is.'}]},{name:"Only Subs",commands:[{name:"!left",description:"Makes DaCrzyMan's car turn left a few times. 60s cooldown. 0s cooldown in Chaos Mode."},{name:"!right",description:"Makes DaCrzyMan's car turn right a few times. 60s cooldown. 0s cooldown in Chaos Mode."},{name:"!brake",description:"Makes DaCrzyMan's car brake a few times. 60s cooldown. 0s cooldown in Chaos Mode."},{name:"!acc",description:"Makes DaCrzyMan's car accelerate a few times. 60s cooldown. 0s cooldown in Chaos Mode."},{name:"!cam{1, 2, or 3}",description:"Set's DaCrzyMan's TM cam to 1, 2, or 3. 30s cooldown. 0s cooldown in Chaos Mode."},{name:"!cam",description:"Toggles DaCrzyMan's TM cam. 60s cooldown. 30s cooldown in Chaos Mode."},{name:"!behind",description:"Make's DaCrzyMan's TM cam look backwards. 120s cooldown. 0s cooldown in Chaos Mode."}]},{name:"Mod/VIP specials",commands:[{name:"!vk",description:"Available to only VanilleKoekje"},{name:"!semi",description:"Available to only SemiTM"},{name:"!meow",description:"Available to only OneNiceKitty"},{name:"!quack",description:"Available to only 7BearsBeyond"},{name:"!fillings",description:"Available to all Mods and VIPs"}]},{name:"Only Mods",commands:[{name:"!commercial {30|60|120}",description:"Runs commercials for however long you tell it to"},{name:"!bonk-",description:"Removes a bonk, and plays a backwards bonk sound."},{name:"!wl_add @{username}",description:"Add a username to the waitlist to queue with DaCrzyMan."},{name:"!wl_rm @{username}",description:"Remove a username from the waitlist to queue with DaCzyMan."},{name:"!pushback @{username}",description:"Pushes a user from currently playing to the front of the waitlist."},{name:"!pushbackAll",description:"Pushes all users from currently playing to the front of the waitlist."},{name:"!cp_setLimit",description:"Sets the limit on how many players can be currently playing."},{name:"!nextMatch",description:"Grabs users from the waitlist to try and fully fill the currently playing queue."},{name:"!nextMatch {X}",description:"Grabs X number of users from the waitlist and pushes them into the currently playing queue."},{name:"!cp_add @{username}",description:"Adds a user to the end of the currently playing queue."},{name:"!cp_rm @{username}",description:"Removes a user from the currently playing queue."},{name:"!cp_clear",description:"Removes everyone from the currently playing queue."},{name:"!chaosmode",description:"Toggles Chaos Mode on or off."},{name:"!chaosmode {on, off}",description:"Turns Chaose Mode on or off."},{name:"!wato boost",description:"Toggles whether wato odds are twice as easy (boosted)."},{name:"!wato boost {on, off}",description:"Turns wato boost on or off."},{name:"!rickroll",description:"Rick rolls stream."},{name:"!think",description:'Shows the "thinking" overlay.'},{name:"!sudoku",description:"Adds one to how many times DaCrzyMan's computer has committed sudoku."}]}];export{J as S,N as c};
