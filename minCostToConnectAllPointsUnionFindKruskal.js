/*
You are given an array points representing integer coordinates of some
points on a 2D-plane, where points[i] = [xi, yi].

The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance
between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

Return the minimum cost to make all points connected. All points are connected if there
is exactly one simple path between any two points.

https://leetcode.com/problems/min-cost-to-connect-all-points/
*/

var minCostConnectPoints = function (points) {
  let computed = computeManhattanDistance(points);
  // Rank edges by weights
  computed.sort((a, b) => a[2] - b[2]);
  console.log(computed);
  //[from, to, weight (Manhattan distance)]
  /*
  [
  [ 1, 3, 3 ],  [ 0, 1, 4 ],
  [ 3, 4, 4 ],  [ 0, 3, 7 ],
  [ 0, 4, 7 ],  [ 1, 4, 7 ],
  [ 1, 2, 9 ],  [ 2, 3, 10 ],
  [ 0, 2, 13 ], [ 2, 4, 14 ]
]
  */
  // Union find
  let parent = {};
  for (let i = 0; i < points.length; i++) {
    parent[i] = i;
  }
  // {0:0, 1:1, 2:2, 3:3, 4:4}
  let cost = 0;
  for (let edge of computed) {
    let [x, y, val] = edge;
    // If they are not connected, we need to connect them
    // as it´s cheaper to connect these points due to
    // the sorting rank
    // We connect them  by doing union find
    if (!connected(x, y, parent)) {
      union(x, y, parent);
      cost += val;
    }
  }
  return cost;
};

function computeManhattanDistance(points) {
  // let computed = new Array(points.length);
  let computed = [];
  // Get Manhattan distance
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let [xi, yi] = points[i];
      let [xj, yj] = points[j];
      let val = Math.abs(xi - xj) + Math.abs(yi - yj);
      computed.push([i, j, val]);
    }
  }
  return computed;
}

// Use node A to set it as parent
function union(nodeA, nodeB, parent) {
  let parentA = findParent(nodeA, parent);
  let parentB = findParent(nodeB, parent);
  parent[parentB] = parentA;
}

function connected(x, y, parent) {
  return findParent(x, parent) === findParent(y, parent);
}

// Se va recursivamente a todos los niveles hasta encontrar al padre
function findParent(node, parent) {
  if (parent[node] === node) {
    return node;
  }
  return findParent(parent[node], parent);
}

points = [
  [0, 0],
  [2, 2],
  [3, 10],
  [5, 2],
  [7, 0],
];
console.log(minCostConnectPoints(points));
