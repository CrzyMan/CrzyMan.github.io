Object.prototype.intersectsWith = function(other){
	
	// catch if not all necesarry proerties were supplied
	if ((this.x==null && this.pos.x==null) || (this.y==null && this.pos.y==null) || this.width==null ||
		(other.x==null && other.pos.x==null) ||	(other.y==null && other.pos.y==null) ||	other.width==null){
		
		console.log("Error: Object.prototype.intersectsWith; Not all necesarry properties were supplied;")
		return "";
	}
	
	var x1 = this.x != null ? this.x : this.pos.x;
	var y1 = this.y != null ? this.y : this.pos.y;
	var w1 = this.width;
	var h1 = this.height || w1;
	
	var x2 = other.x != null ? other.x : other.pos.x;
	var y2 = other.y != null ? other.y : other.pos.y;
	var w2 = other.width;
	var h2 = other.height || w2;
	
	// collision logic
	
	if (x1 + w1 >= x2 && x1 <= x2 + w2 &&
		y1 + h1 >= y2 && y1 <= y2 + h2){
		return true;
	}
	return false;
	
}