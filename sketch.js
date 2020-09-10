function makearray(x,y){
  let arr = new Array(x);
  for (let i = 0; i < arr.length; i++){
			 arr[i] = new Array(y);
     }
  return arr
}


function fill_2d_array(arr,xm){
	for (let i = 0; i < (grid.length); i++){
		for (let j = 0; j < grid[0].length; j++){
			arr[i][j] = new cell(i,j);
			if (xm == "fresh"){
				arr[i][j].alive = false;
			}
			else{
			arr[i][j].alive = Boolean(floor(random(2)));
			}
		}
	}
	return arr
}

function cell_block(i,j){
	return [[i-1,j-1],[i,j-1],[i+1,j-1],[i-1,j],[i+1,j],[i-1,j+1],[i,j+1],[i+1,j+1]]
}

// Births: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.
// Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.
// Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation.
// Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.

function conway(lst){
	newlst = makearray(lst.length,lst[0].length);
	for (let i = 0; i < (grid.length); i++){
		for (let j = 0; j < grid[0].length; j++){
			thecell = lst[i][j];
			blocks = cell_block(i,j);
			neigh = 0;
			newlst[i][j] = new cell(i,j);
			for (indices of blocks){
				neigh += lst[(indices[0]+xrows)%xrows][(indices[1]+yrows)%yrows].alive ? 1 : 0;
			}
			if (neigh == 3 && thecell.alive == false){
				newlst[i][j].alive = true;
			}
			else if(neigh <= 1 && thecell.alive == true){
				newlst[i][j].alive = false;
			}
			else if(neigh >= 4 && thecell.alive == true){
				newlst[i][j].alive = false;
			}
			else if((neigh == 2 || neigh == 3) && thecell.alive == true){
				newlst[i][j].alive = lst[i][j].alive;
			}
			else{
				newlst[i][j].alive = lst[i][j].alive;
			}
		}
	}
	return newlst;
}

function resetsketch(){
	modee = "sim";
	grid = makearray(xrows,yrows);
	grid = fill_2d_array(grid,"random");
	
	
	custom_grid = makearray(grid.length,grid[0].length);
	custom_grid = fill_2d_array(custom_grid,"fresh");
}

function updater(){
	custom_grid = conway(custom_grid);
	
	for (let i = 0; i < (grid.length); i++){
		for (let j = 0; j < grid[0].length; j++){
			custom_grid[i][j].show();
		}
	}
}


function displayer(lst){
	for (let i = 0; i < (lst.length); i++){
		for (let j = 0; j < lst[0].length; j++){
			lst[i][j].show();
		}
	}
}

function start_custom(){
	modee = "setup";
	displayer(custom_grid);
	
}

function play_custom(){
	if (modee == "setup"){
		modee = "sim";
		grid = custom_grid;
		draw();
	}
	else{
		resetsketch();
	}
}

function clear_custom(){
	custom_grid = makearray(grid.length,grid[0].length);
	custom_grid = fill_2d_array(custom_grid,"fresh");
	
}

function initial(ww,wh){
	screen_x = ww;
  screen_y = wh;
	x_dis = 20;
	y_dis = 20;
	xrows=Math.ceil(screen_x/x_dis);
	yrows=Math.ceil(screen_y/y_dis);
}

let grid;

let x_p,y_p;
let fr = 10;
let count = 0;
let modee = 'sim';
let canvas;

function mousePressed(){
	clear_custom();
}

function pressed(mx,my){
	stroke(lte);
	circle(mx,my,20);
	for (let i = 0; i < (grid.length); i++){
		for (let j = 0; j < grid[0].length; j++){
			custom_grid[i][j].clicked(mx,my);
			}
		}
	}

//function windowResized(){
//	resizeCanvas(windowWidth,windowHeight); 
//}

function setup() {
	lte = color(0,225,255);
	nte = color(148, 255, 239);
	te = color(79, 170, 170);
	orange = color(255,209,127);
	go = color(255,215,0);
	dr = color(255,50,40);
	pin = color(255,150,255);
	initial(windowWidth,windowHeight);
	
	console.log(x_dis,y_dis);
	
	canvas = createCanvas(screen_x,screen_y);
	canvas.position(0,0); 
	canvas.style('z-index','-1');
	
	background(lte);
	strokeWeight(5);
	stroke(lte);
	
	frameRate(fr);
	resetsketch();
}

function draw() {
	pressed(mouseX,mouseY);
	updater(custom_grid);
	
	stroke(lte);
	fill('black');
	circle(mouseX,mouseY,x_dis*2);
}