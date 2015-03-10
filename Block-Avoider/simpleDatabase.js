function SimpleDatabase(){
    
    this.db = [];
    
    this.add = function(element){
        this.db.push(element);
    }
    
    this.getElementByProperty = function(property, value){
        for (var i = 0; i < this.db.length; i++){
            if (this.db[i][property] == value){
                return this.db[i];
            }
        }
        return false;
    }
    
    this.orderBy = function(property, descending){
        this.db.sort(function(a,b){
            if (a[property] > b[property]) return 1;
            else if (a[property] == b[property]) return 0;
            return -1;
        });
        
        if (descending) this.db.reverse();
    }
}