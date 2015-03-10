function AnimatedSprite(config){
    
    // set Defaults
    this.fps = 1;
    
    this.frameCount = 1;
    
    this.currentFrame = 0;
    
    this.image;
    
    this.sourceX = 0;
    this.sourceY = 0;
    
    // if configuration properties are supplied
    if (config!=null){
        for (var i in config){
            this[i] = config[i];
        }
    }
    
    if (this.frameWidth==null) this.frameWidth = this.image.width / this.frameCount;
    if (this.frameHeight==null) this.frameHeight = this.image.height;
    
    this.stepSprite = function(sender){
        sender.sourceX = sender.frameWidth * sender.currentFrame;
        sender.currentFrame++;
        sender.currentFrame = sender.currentFrame % sender.frameCount;
    }
    
    this.stepSprite(this);
    this.t = setInterval(this.stepSprite, 1000/this.fps, this);
    
    this.stopAnimation = function(){
        clearInterval(this.t);
        this.t = null;
    }
    
    this.restartAnimation = function(){
        this.stopAnimation();
        this.t = setInterval(this.stepSprite, 1000/this.fps, this);
    }
    
    this.resetFPS = function(newFPS){
        this.fps = newFPS;
        this.restartAnimation();
    }
    
    this.drawMe = function(x,y,width,height){
        ctx.drawImage(this.image, this.sourceX, this.sourceY, this.frameWidth, this.frameHeight, x, y, width, height);
    }
    
}