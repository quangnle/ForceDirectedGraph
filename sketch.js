// var _mat = [[0,1,1,0,0,0,0],
			// [1,0,1,1,0,0,0],
			// [1,1,0,0,1,0,0],
			// [0,1,0,0,1,1,0],
			// [0,0,1,1,0,1,0],
			// [0,0,0,1,1,0,1],
			// [0,0,0,0,0,1,0]];
			
var _mat = [
[0,0,0,0,0,0,0,1,0,0,0,0],
[0,0,0,0,0,0,1,1,0,0,0,0],
[0,0,0,0,0,0,0,1,0,0,0,0],
[0,0,0,0,0,0,0,1,0,0,1,1],
[0,0,0,0,0,1,0,1,1,0,0,0],
[0,0,0,0,1,0,1,0,0,1,0,0],
[0,1,0,0,0,1,0,0,0,0,0,0],
[1,1,1,1,1,0,0,0,0,0,0,0],
[0,0,0,0,0,1,0,0,0,0,0,0],
[0,0,0,0,0,0,1,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,0,1],
[0,0,0,1,0,0,0,0,0,0,1,0]
];

const maxIterations = 10;

function setup(){
	createCanvas(640, 480);
	initGraph(_mat, 640, 480);
}

function draw(){	
	background(255, 255, 255);
	stroke(0, 0, 0);
	for (var i = 0; i < _nodeSet.length; i++){
		var node = _nodeSet[i];
		for (var j = 0; j < node.siblings.length; j++){
			line(node.x, node.y, _nodeSet[node.siblings[j]].x, _nodeSet[node.siblings[j]].y);
		}
	}

	fill(0, 100, 200);
	for (var i = 0; i < _nodeSet.length; i++){
		ellipse(_nodeSet[i].x, _nodeSet[i].y, 10, 10);
	}
	
	for (let i = 0; i < maxIterations; i++){
		updatePos(_nodeSet);
	}
}