/*************************************************\
 * EventFactory                                  *
 *                                               *
 * Produces, contains, maintains, handles events *
\*************************************************/
var EventFactory = {
    
    events: [],
    
    addEvent: function(hour, minute, name, pm){
        EventFactory.events.push(EventFactory.newEvent(hour, minute, name, pm));
        EventFactory.events.sort(EventFactory.compare);
    },
    
    newEvent: function(hour, minute, name, pm){
        hour = hour || 0;
        minute = minute || 0;
        name = name || "";
        pm = pm || false;
        hour += pm?12:0;
        
        return {'hour': hour, 'minute': minute, 'name': name};
    },
    
    find: function(hour, minute, name){
        var event = EventFactory.newEvent(hour, minute, name);
        var response = EventFactory.findHelp(0, EventFactory.events.length-1, event);
        if (response[0]==true  && EventFactory.events[response[1]].name != name){
            return [false, response[1]];
        }
        return response;
    },
    
    findHelp: function(start, end, event){
        if (start > end ) return [false,start];
        var mid = Math.floor((start + end) / 2);
        
        var comp = EventFactory.compare(event, EventFactory.events[mid]);
        
        // if it is the event
        if (comp == 0){
            return [true, mid];
        }
        if (comp > 0){
            return EventFactory.findHelp(mid + 1, end, event);
        }
        return EventFactory.findHelp(start, mid - 1, event);
    },
    
    removeEvent: function(hour, minute, name, pm){
        if (hour instanceof undefined) return;
        if (minute instanceof undefined) return;
        if (name instanceof undefined) return;
        
        pm = pm || false;
        hour += pm?12:0;
        
        if (!EventFactory.events[hour][minute]){
            EventFactory.events[hour][minute] = null;
            size--;
        }
    },
    
    next: null,
    
    getNextEvent: function(now){
        if (EventFactory.size <= 0) return [null, -1];
        
        var h = now.getHours();
        var m = now.getMinutes() + 1;
        
        var result = EventFactory.find(h, m);
        
        var i = result[1]%EventFactory.events.length;
        return [EventFactory.events[i], i];
        
    },
    
    timeTillNext: function(now){
        return EventFactory.timeTill(now, EventFactory.getNextEvent(now)[0]);
    },
    
    timeTill: function(now, event){
        if (now == null) return -1;
        
        var diff = EventFactory.compare(event, now);
        diff += diff < 0 ? 24*3600 : 0;
        return diff;
    },
    
    timeSinceLast: function(now){
        if (EventFactory.events.length <= 0) return -1;
        var i = (EventFactory.getNextEvent(now)[1] - 1 + EventFactory.events.length)%EventFactory.events.length;
        
        var diff = EventFactory.compare(now, EventFactory.events[i]);
        diff += diff < 0 ? 24*3600 : 0;
        return diff;
    },
    
    toSeconds: function(event){
        // passed an event
        if (typeof(event.hour) == "number")
            return event.hour*3600+event.minute*60;
        
        // passed a date
        if (typeof(event.hour) == "undefined")
            return event.getHours()*3600 + event.getMinutes()*60 + event.getSeconds();
        
        return -1;
        
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
    }
}