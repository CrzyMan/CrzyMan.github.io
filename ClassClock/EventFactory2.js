/*************************************************\
 * EventFactory                                  *
 *                                               *
 * Produces, contains, maintains, handles events *
\*************************************************/
var EventFactory = {
    
    events: [],
    
    addEvent: function(hour, minute, name, pm, element){
        EventFactory.events.push(EventFactory.newEvent(hour, minute, name, pm, element));
        EventFactory.events.sort(EventFactory.compare);
    },
    
    newEvent: function(hour, minute, name, pm, par){
        hour = hour || 0;
        minute = minute || 0;
        name = name || "";
        pm = pm || false;
        hour += pm?12:0;
        
        // make the element
        var el = createElementWithClass("div","radial-progress");
        el.id = "event_"+name;
        var c = createElementWithClass("div","circle");
        var mr = createElementWithClass("div","maskR");
        mr.appendChild(createElementWithClass("div","fill"));
        c.appendChild(mr);
        
        var ml = createElementWithClass("div","maskL");
        ml.appendChild(createElementWithClass("div","fill"));
        c.appendChild(ml);
        el.appendChild(c);
        
        var n = createElementWithClass('div','inset');
        var tc = createElementWithClass('div', 'timecentage');
        var s = document.createElement('span');
        s.innerText = "00:00:00";
        tc.appendChild(s);
        n.appendChild(tc);
        el.appendChild(n);
        
        var ev = {'hour': hour, 'minute': minute, 'name': name, startRef:EventFactory.toSeconds({'hour': hour, 'minute':minute}), element:el};
        EventFactory.setSize(ev, 100);
        if (typeof par != "undefined" && typeof par != "null"){
            EventFactory.addToDOM(ev, par);
        }
        EventFactory.updateEvent(ev, new Date());
        
        return ev;
    },
    
    find: function(hour, minute, name){
        var ev = EventFactory.newEvent(hour, minute, name);
        var response = EventFactory.findHelp(0, EventFactory.events.length-1, ev);
        if (response[0]==true  && EventFactory.events[response[1]].name != name){
            return [false, response[1]];
        }
        return response;
    },
    
    findHelp: function(start, end, ev){
        if (start > end ) return [false,start];
        var mid = Math.floor((start + end) / 2);
        
        var comp = EventFactory.compare(ev, EventFactory.events[mid]);
        
        // if it is the event
        if (comp == 0){
            return [true, mid];
        }
        if (comp > 0){
            return EventFactory.findHelp(mid + 1, end, ev);
        }
        return EventFactory.findHelp(start, mid - 1, ev);
    },
    
    removeEvent: function(hour, minute, name, pm){
        if (typeof(hour) == 'undefined') return;
        if (typeof(minute) == 'undefined') return;
        if (typeof(name) == 'undefined') return;
        
        pm = pm || false;
        hour += pm?12:0;
        
        // TODO: implement remove
    },
    
    getNextEvent: function(now){
        var i = EventFactory.indexOfNext(now);
        
        // wrap around to the beginning
        i = (i==-1)?1:i;
        
        return EventFactory.events[i];
    },
    
    getPreviousEvent: function(now){
        var i = EventFactory.indexOfPrevious(now);
        
        i = (i==-1)?EventFactory.events.length-1:i;
        
        return EventFactory.events[i];
    },
    
    timeTillNext: function(now){
        return EventFactory.timeTill(now, EventFactory.getNextEvent(now));
    },
    
    timeTill: function(now, ev){
        if (now == null || ev == null || EventFactory.events.length <= 0) return -1;
        
        var diff = EventFactory.compare(ev, now);
        diff += diff < 0 ? 24*3600 : 0;
        return diff;
    },
    
    timeSinceLast: function(now){
        
        return EventFactory.compare(now, EventFactory.getPreviousEvent(now));
    },
    
    timeTillPrevious: function(now){
        return EventFactory.timeTill(now, EventFactory.getPreviousEvent(now));
    },
    
    toSeconds: function(ev){
        // passed an event
        if (typeof(ev.hour) == "number")
            return ev.hour*3600+ev.minute*60;
        
        // passed a date
        if (typeof(ev.hour) == "undefined")
            return ev.getHours()*3600 + ev.getMinutes()*60 + ev.getSeconds();
        
        return -1;
        
    },
    
    toString: function(time){
        return ""+EventFactory.addZero(time[0])+":"+EventFactory.addZero(time[1])+":"+EventFactory.addZero(time[2]);
    },
    
    addZero: function (num){
        return num<10?"0"+num:num;
    },
    
    toParts: function(seconds){
        var h = Math.floor(seconds / 3600);
        seconds -= h*3600;
        var m = Math.floor(seconds/60);
        seconds -= m*60;
        h += h < 0 ? 24 : 0;
        return [h, m, seconds];
    },
    
    compare: function(e1, e2){
        return EventFactory.toSeconds(e1) - EventFactory.toSeconds(e2);
    },
    
    equals: function(e1, e2){
        return (e1.name==e2.name && e1.minute==e2.minute && e1.hour==e2.hour)
    },
    
    indexOf: function(e){
        return EventFactory._indexOf(0, EventFactory.events.length-1, e)[0]
    },
    
    indexOfPrevious: function(e){
        var a = EventFactory._indexOf(0, EventFactory.events.length-1, e);
        if (a[0]==-1){
            return a[1];
        }
        return a[0]-1;
    },
    
    indexOfNext: function(e){
        var a = EventFactory._indexOf(0, EventFactory.events.length-1, e);
        if (a[0]==-1){
            var aa = a[1]+1;
            if (aa < EventFactory.events.length)
                return aa
            return -1;
        }
        return a[0]+1;
    },
    
    _indexOf: function(l, r, e){
        // returns the index, or -1, and the index beneath
        if (l > r) return [-1, r];
        
        var m = ~~((r+l)/2);
        
        var ref = EventFactory.events[m];
        
        if (EventFactory.equals(e, ref))
            return [m];
        
        var comp = EventFactory.compare(ref, e);
        
        if (comp < 0)
            return EventFactory._indexOf(m+1, r, e);
        //if (comp > 0)
            return EventFactory._indexOf(l, m-1, e);
    },
    
    updateElement: function(ev, progress){
        var e = ev.element;
        var angle = progress*360;
        
        var d1 = e.children[0].children[0].children[0];
        var d2 = e.children[0].children[1].children[0];
        
        var deg1 = angle>180?180:angle;
        var deg2 = angle>180?angle:180;
        
        d1.style.webkitTransform = 'rotate('+deg1+'deg)'; 
        d1.style.mozTransform    = 'rotate('+deg1+'deg)'; 
        d1.style.msTransform     = 'rotate('+deg1+'deg)'; 
        d1.style.oTransform      = 'rotate('+deg1+'deg)'; 
        d1.style.transform       = 'rotate('+deg1+'deg)';
        
        d2.style.webkitTransform = 'rotate('+deg2+'deg)'; 
        d2.style.mozTransform    = 'rotate('+deg2+'deg)'; 
        d2.style.msTransform     = 'rotate('+deg2+'deg)'; 
        d2.style.oTransform      = 'rotate('+deg2+'deg)'; 
        d2.style.transform       = 'rotate('+deg2+'deg)';
    },
    
    setSize: function(ev, dim){
        var e = ev.element;
        // round to an even size
        dim = 2*~~(dim/2);
        
        // radial-progress size
        e.style.height = dim+"px";
        e.style.width = dim+"px";
        
        
        
        // masks r size
        e.children[0].children[0].style.height = dim+"px";
        e.children[0].children[0].style.width = dim+"px";
        
        
        
        // masks l size
        e.children[0].children[1].style.height = dim+"px";
        e.children[0].children[1].style.width = dim+"px";
        
        
        
        // masks r fill size
        e.children[0].children[0].children[0].style.height = dim+"px";
        e.children[0].children[0].children[0].style.width = dim+"px";
        
        
        // masks l fill size
        e.children[0].children[1].children[0].style.height = dim+"px";
        e.children[0].children[1].children[0].style.width = dim+"px";
        
        
        
        // inset size
        e.children[1].style.height = (120/150)*dim+"px";
        e.children[1].style.width = (120/150)*dim+"px";
        
        // inset position
        e.children[1].style.marginTop = ((30/150)*dim*0.5)+"px";
        e.children[1].style.marginLeft= ((30/150)*dim*0.5)+"px";
        
        
        
        // inset timecentage font size
        e.children[1].children[0].style.fontSize = ((20/150)*dim)+"pt";
        
        //inset timecentage size
        e.children[1].children[0].style.width = ((120/150)*dim)+"px";
        e.children[1].children[0].style.height = ((120/150)*dim)+"px";
        
        // inset timecentage span middling
        e.children[1].children[0].children[0].style.lineHeight = ((120/150)*dim)+"px";
        
        //updateProgress(e,0);
        
        // set clips
        e.children[0].children[1].style.clip = "rect(0px, "+~~(dim/2)+"px, "+dim+"px, 0px)";
        e.children[0].children[0].style.clip = "rect(0px, "+dim+"px, "+dim+"px, "+~~(dim/2)+"px)";
        e.children[0].children[1].children[0].style.clip = "rect(0px, "+~~(dim/2)+"px, "+dim+"px, 0px)";
        e.children[0].children[0].children[0].style.clip = "rect(0px, "+~~(dim/2)+"px, "+dim+"px, 0px)";
    },
    
    addToDOM: function(ev, element){
        element.appendChild(ev.element);
    },
    
    updateEvent: function(ev, now){
        var till = EventFactory.timeTill(now, ev);
        var progress = 1-((till)/(60*60*24));
        EventFactory.updateElement(ev, progress);
        var t = EventFactory.toParts(till)
        EventFactory.setElementText(ev, EventFactory.addZero(t[0]) + ":" + EventFactory.addZero(t[1]) + ":" + EventFactory.addZero(t[2]));
    },
    
    setElementText: function(ev, text){
        ev.element.children[1].children[0].children[0].innerText = text;
    },
    
    updateAllEvents: function(now){
        var i = EventFactory.events.length;
        while (--i >= 0){
            EventFactory.updateEvent(EventFactory.events[i], now)
        }
    }
}

function createElementWithClass(elementType, className){
    var e = document.createElement(elementType);
    e.classList.add(className);
    return e;
}