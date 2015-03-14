/***************************************************\
 * ProgressCircle Class                            *
 *                                                 *
 * Shows progress by drawing a portion of a circle *
\***************************************************/

function ProgressCircle(){
    
    this.x = 0;
    this.y = 0;
    this.setPos = function(_x, _y){
        this.x = _x;
        this.y = _y;
    };
    
    var value = 0;
    this.setValue = function(v){
        value = v>=min?(v<=max?v:value):value;
    };
    this.getValue = function(){
        return value;
    };
    
    this.radius = 0;
    
    
    var max = 1;
    this.setMax = function(m){
        max = m>min?m:max;
    };
    this.getMax = function(){
        return max;
    };
    
    var min = 0;
    this.setMin = function(m){
        min = m<max?m:min;
    };
    this.getMin = function(){
        return min;
    };
    
    this.getProgress = function(){
        return (value - min) / (max - min);
    }
    
    this.upColor = "black";
    
    this.downColor = "red";
    
    this.lineJoin = "round";
    
    this.lineWidth = 1;
    
    this.draw = function(ctx){
        ctx.lineWidth = this.lineWidth;
        ctx.lineJoin = this.lineJoin;
        
        ctx.strokeStyle = this.downColor;
        
        ctx.beginPath();
        var a = 2*Math.PI*this.getProgress();
        ctx.arc(this.x, this.y,this.radius-0.2,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        
        ctx.strokeStyle = this.upColor;
        
        ctx.beginPath();
        var a = 2*Math.PI*this.getProgress();
        ctx.arc(this.x, this.y,this.radius,-Math.PI/2,a-Math.PI/2 + 0.01);
        ctx.stroke();
        ctx.closePath();
        
        
    };
}