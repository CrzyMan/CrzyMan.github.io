/**
 * Takes images or urls to be converted into images
 */

function ImageStack(){
    
    this.images = [];
    this.numberToLoad = 0;
    this.totalLoaded = 0;
    
    
    /*
     * Erases previous data, and starts working on a new image stack
     *
     * String[] srcs , array of image srcs
     *
     * function onload(img) , function to be called when each image is loaded, will be passed the image as a parameter
     *
     * function oncomplete(img) , function to be called once all images have been loaded, will be passed an image as a parameter
     */
    this.loadNewStack = function (srcs, onload, oncomplete){
        this.numberToLoad = 0;
        this.totalLoaded = 0;
        this.images = [];
        
        this.onload = onload || function(){};
        this.oncomplete = oncomplete || function(){};
        
        for (var i = 0;  i < srcs.length; i++){
            this.numberToLoad++;
            var temp = new Image();
            temp.parent = this;
            temp.onload = this.rollCall;
            temp.onerror = this.onerror;
            temp.i = i;
            this.images.push(temp);
            temp.src = srcs[i];
        }
    };
    
    
    /*
     * Called in the scope of the image once it has been loaded, then calls the onload of the ImageStack
     */
    this.rollCall = function(){
        this.parent.totalLoaded++;
        
        this.parent.onload(this);
        
        if (this.parent.totalLoaded == this.parent.numberToLoad){
            this.parent.oncomplete(this);
        }
    };
    
    
    /*
     * Called whenever an image cannot load
     */
    this.onerror = function(e){
        console.log(e);
    };
    
    this.onload = function(){
        
    };
    
    this.oncomplete = function(){
        
    };
    
}