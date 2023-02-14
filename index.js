
class Node {
  constructor(angle, length) {
	this.angle = this.gangle = angle;
	this.length = this.glength = length;
    
	this.children = this.length*lengthDecayFactor > 10 ? [new Node(this.angle, this.length*lengthDecayFactor), new Node(-this.angle, this.length*lengthDecayFactor)] : []
	this.anim = 0;
  }
 
  updateStats(angle, length) {
	this.gangle = (this.angle<0?-1:1)*angle;
    this.glength=length;
    this.children.forEach(c=>c.updateStats(angle, length))
  }
 
  draw([x, y], angle) {
	this.anim+=0.0001;
	let aprog = easeInOutSine(this.anim);
	this.angle += (this.gangle-this.angle)*aprog;
    this.length += (this.glength-this.length)*aprog;
    if (aprog >= 1) this.anim = 0;
	let x1 = x+Math.cos(angle+this.angle)*this.length
	let y1 = y+Math.sin(angle+this.angle)*this.length
	strokeWeight(this.length/10)
	line(x, y, x1, y1);
	this.children.forEach(c=>c.draw([x1, y1], angle+this.angle))
  }
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

const lengthDecayFactor = 0.75;
let nodes;
function setup() {
  createCanvas(600, 600);
  stroke(0xff00bb00)
  nodes = [new Node(PI/4, 100), new Node(-PI/4, 100)];
}

function draw() {
  background(0)
  nodes.forEach(c=>c.updateStats((mouseX/600 * PI/4)+PI/12, mouseY/6 + 20))
  nodes.forEach(c=>c.draw([width/2, 120], PI/2))
}


