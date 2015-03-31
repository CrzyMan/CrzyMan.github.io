document.body.onload = initialize;
document.documentElement.style.overflowX = "hidden";

function timeTill(now, hour, minute){
    var curr = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
    var event = toSeconds([hour, minute, 0]);
    var diff = event - curr;
    var h = Math.floor(diff / 3600);
    diff -= h*3600;
    var m = Math.floor(diff/60);
    diff -= m*60;
    h += h < 0 ? 24 : 0;
    return [h, m, diff];
}

function toSeconds(stuff){
    return stuff[0]*3600+stuff[1]*60+stuff[2];
}

var timer;

var MainEvent;

function initialize(){
    if (isMobile)
        document.getElementsByTagName("a")[0].style.fontSize = "7pt";

    // make all of the class events, perhaps produce a data structure to load these from
    EventFactory.addEvent(8,5,"Start of First", false, document.getElementById("0s"));
    EventFactory.addEvent(8,55,"End of First", false, document.getElementById("0e"));
    EventFactory.addEvent(9,0,"Start of Second", false, document.getElementById("1s"));
    EventFactory.addEvent(9,50,"End of Second", false, document.getElementById("1e"));
    EventFactory.addEvent(9,55,"Start of Third", false, document.getElementById("2s"));
    EventFactory.addEvent(10,45,"End of Third", false, document.getElementById("2e"));
    EventFactory.addEvent(10,50,"Start of Fourth", false, document.getElementById("3s"));
    EventFactory.addEvent(11,40,"End of Fourth", false, document.getElementById("3e"));
    EventFactory.addEvent(11,45,"Start of Fifth", false, document.getElementById("4s"));
    EventFactory.addEvent(12,35,"End of Fifth", false, document.getElementById("4e"));
    EventFactory.addEvent(12,40,"Start of Sixth", false, document.getElementById("5s"));
    EventFactory.addEvent(1,30,"End of Sixth", true, document.getElementById("5e"));
    EventFactory.addEvent(1,35,"Start of Seventh", true, document.getElementById("6s"));
    EventFactory.addEvent(2,25,"End of Seventh", true, document.getElementById("6e"));
    EventFactory.addEvent(2,30,"Start of Eighth", true, document.getElementById("7s"));
    EventFactory.addEvent(3,20,"End of Eighth", true, document.getElementById("7e"));
    EventFactory.addEvent(3,25,"Start of Ninth", true, document.getElementById("8s"));
    EventFactory.addEvent(4,15,"End of Ninth", true, document.getElementById("8e"));
    EventFactory.addEvent(4,20,"Start of Tenth", true, document.getElementById("9s"));
    EventFactory.addEvent(5,10,"End of Tenth", true, document.getElementById("9e"));
    
    // make the main clock and size it
    MainEvent = EventFactory.newEvent(0,0,"Main",false,document.getElementById('Main'));
    
    // properly size all of the events
    updateClockSizes();
    
    // update the rest of the page and set the timer
    updatePage();
    timer = window.setInterval(updatePage, 1000);
}

function windowHW() {
    return window.innerHeight>window.innerWidth?window.innerWidth:window.innerHeight-20;
}

function updateClockSizes() {
    EventFactory.events.forEach(function(e){EventFactory.setSize(e, window.innerWidth/(isMobile?2.5:13))});
    
    EventFactory.setSize(MainEvent, (isMobile?0.95:.6)*windowHW());
}
window.onresize = updateClockSizes;

function appendOrder(num){
    var ones = num-(Math.round(num/10)*10);
    return num + (ones==1?"st":ones==2?"nd":ones==3?"rd":"th");
}

function updatePage(){
    var now = new Date();
    EventFactory.updateAllEvents(now);
    updateMainEvent(now);
}

function parseToString(time){
    return ""+addZero(time[0])+":"+addZero(time[1])+":"+addZero(time[2]);
}

function addZero(num){
    return num<10?"0"+num:num;
}

function updateMainEvent(now){
    var till = EventFactory.timeTillNext(now);
    var since = EventFactory.timeSincePrevious(now);
    var progress = since/(till+since);
    EventFactory.updateElement(MainEvent, progress);
    
    var next = EventFactory.getNextEvent(now);
    EventFactory.setElementText(MainEvent, EventFactory.toString(till), next.name);
}