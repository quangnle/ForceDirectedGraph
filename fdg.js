var _nodeSet = [];
var _lSpringRest = 50;
var _maxSqDisplacement = 100;
var _Kr = 6250; // repulsive force constant 
var _Ks = 1; // spring constant

function Node(x, y){
	this.x = x;
	this.y = y;
	this.fx = 0;
	this.fy = 0;
	this.siblings = [];
}

function initGraph(mat, w, h){
	for ( var i = 0; i < mat.length; i++){
		var rx = Math.random() * w;
		var ry = Math.random() * h;
		
		var node = new Node(rx, ry);
		for ( var j = 0; j < mat[i].length; j++){
			if (mat[i][j] > 0)
				node.siblings.push(j);
		}
		
		_nodeSet.push(node);
	}
}

function updatePos(nodeSet){
	for (var i = 0; i < nodeSet.length - 1; i++){
		nodeSet[i].fx =0;
		nodeSet[i].fy =0;
	}
	
	// update repulsive force
	for (var i = 0; i < nodeSet.length - 1; i++){
		for (var j = 0; j  < nodeSet[i].siblings.length; j++){
			if (i < nodeSet[i].siblings[j]) {
				var dx = nodeSet[nodeSet[i].siblings[j]].x - nodeSet[i].x;
				var dy = nodeSet[nodeSet[i].siblings[j]].y - nodeSet[i].y;
				
				if (dx != 0 || dy != 0){
					var sqDist = dx * dx + dy * dy;
					var dist = Math.sqrt(sqDist);
					var f = _Kr / sqDist;
					var fx = f * dx / dist;
					var fy = f * dy / dist;
					
					nodeSet[i].fx = nodeSet[i].fx - fx;
					nodeSet[i].fy = nodeSet[i].fy - fy;
					
					nodeSet[nodeSet[i].siblings[j]].fx = nodeSet[nodeSet[i].siblings[j]].fx + fx;
					nodeSet[nodeSet[i].siblings[j]].fy = nodeSet[nodeSet[i].siblings[j]].fy + fy;
				}
			}
		}
	}		
	
	// // update spring force
	for (var i = 0; i < nodeSet.length - 1; i++){
		for (var j = 0; j  < nodeSet[i].siblings.length; j++){
			if (i < nodeSet[i].siblings[j]) {
				var dx = nodeSet[nodeSet[i].siblings[j]].x - nodeSet[i].x;
				var dy = nodeSet[nodeSet[i].siblings[j]].y - nodeSet[i].y;
				
				if (dx != 0 || dy != 0) {
					var dist = Math.sqrt(dx * dx + dy * dy);
					var f = _Ks * (dist - _lSpringRest);
					var fx = f * dx / dist;
					var fy = f * dy / dist;
					
					nodeSet[i].fx = nodeSet[i].fx + fx;
					nodeSet[i].fy = nodeSet[i].fy + fy;
					
					nodeSet[nodeSet[i].siblings[j]].fx = nodeSet[nodeSet[i].siblings[j]].fx - fx;
					nodeSet[nodeSet[i].siblings[j]].fy = nodeSet[nodeSet[i].siblings[j]].fy - fy;
				}
			}
		}
	}
	
	// update position 
	for (var i = 0; i < nodeSet.length; i++){
		var dx = 0.01 * nodeSet[i].fx;
		var dy = 0.01 * nodeSet[i].fy;
		var sqDist = dx * dx + dy * dy;
		if (sqDist > _maxSqDisplacement){
			var s = Math.sqrt(_maxSqDisplacement / sqDist);
			dx = s * dx;
			dy = s * dy;
		}		
		
		nodeSet[i].x = nodeSet[i].x + dx;
		nodeSet[i].y = nodeSet[i].y + dy;	
	}
}