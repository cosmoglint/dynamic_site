function cell(x,y){
	this.x = x;
	this.y = y;
	this.xloc = this.x * y_dis;
	this.yloc = this.y * x_dis;
	this.xcen = this.xloc + x_dis/2;
	this.ycen = this.yloc + y_dis/2;
	this.alive = false;
	this.col = 'black';
	this.out = lte;
	
	this.show = function(){
		if (this.alive){
			stroke(this.out);
			fill(this.col);
			rect(this.xloc,this.yloc,x_dis,y_dis);
		}
		else {
			stroke(this.out);
			fill('white');
			rect(this.xloc,this.yloc,x_dis,y_dis);
			
		}
	}
	
	this.clicked = function(mx,my){
		var d = dist(mx,my,this.xcen,this.ycen);
		if (d <= x_dis*2){
			this.alive = true;
			this.show();
		}
	}
	
	this.flip = function(){
		if (this.alive){
			this.alive = false;
		}
		else{
			this.alive = true;
		}
	}
}
