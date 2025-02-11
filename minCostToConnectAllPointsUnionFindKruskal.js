/*
You are given an array points representing integer coordinates of some
points on a 2D-plane, where points[i] = [xi, yi].

The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance
between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

Return the minimum cost to make all points connected. All points are connected if there
is exactly one simple path between any two points.

https://leetcode.com/problems/min-cost-to-connect-all-points/
*/
// Option 1
// Approach - Start from the zero index and use a minHeap to get the minimum costs
// calculate the distance across all nodes across all points and get the minimum distance
// for each calculation record the node analyze to avoid cycles
// Time O(V^2 LogV)
// Space O(N)
var minCostConnectPoints = function (points) {
  let minHeap = new PriorityQueue({
    compare: (a, b) => a.weight - b.weight,
  });
  let visited = new Set();
  // Start with index zerp and no weight
  minHeap.enqueue({ index: 0, weight: 0 });

  let cost = 0;
  while (minHeap.size()) {
    let { index, weight } = minHeap.dequeue();
    // Get from the points the first two points
    let x = points[index][0];
    let y = points[index][1];
    if (visited.has(index)) {
      continue;
    }
    // Mark as visited
    visited.add(index);
    // Increment the count
    cost += weight;
    // Here we will compute the distance across all nodes as long as
    // we haven´t compute that before
    for (let i = 0; i < points.length; i++) {
      if (index === i) {
        continue;
      }
      // The queue will help us to always get the min distance between the points
      // and the indexes will help us to get all nodes
      if (!visited.has(i)) {
        let distance = computeDistance(points[i][0], points[i][1], x, y);
        minHeap.enqueue({ index: i, weight: distance });
      }
    }
  }
  return cost;
};

function computeDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// Option 2
// Time O(M * N)
// Space O(M * N)
var minCostConnectPoints = function (points) {
  // Compute the Manhattan distance from all points
  // to all points
  /*
[
 [ 0, 1, 4 ],  [ 0, 2, 13 ],
 [ 0, 3, 7 ],  [ 0, 4, 7 ],
 [ 1, 2, 9 ],  [ 1, 3, 3 ],
 [ 1, 4, 7 ],  [ 2, 3, 10 ],
 [ 2, 4, 14 ], [ 3, 4, 4 ]
]
*/
  let computed = computeManhattanDistance(points);
  // Rank edges by weights, that will minimize
  // the cost
  computed.sort((a, b) => a[2] - b[2]);
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
  // Look for all points
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
} // Option 1
// Approach - Start from the zero index and use a minHeap to get the minimum costs
// calculate the distance across all nodes across all points and get the minimum distance
// for each calculation record the node analyze to avoid cycles
// Time O(V^2 LogV)
// Space O(N)
var minCostConnectPoints = function (points) {
  let minHeap = new PriorityQueue({
    compare: (a, b) => a.weight - b.weight,
  });
  let visited = new Set();
  // Start with index zerp and no weight
  minHeap.enqueue({ index: 0, weight: 0 });

  let cost = 0;
  while (minHeap.size()) {
    let { index, weight } = minHeap.dequeue();
    // Get from the points the first two points
    let x = points[index][0];
    let y = points[index][1];
    if (visited.has(index)) {
      continue;
    }
    // Mark as visited
    visited.add(index);
    // Increment the count
    cost += weight;
    // Here we will compute the distance across all nodes as long as
    // we haven´t compute that before
    for (let i = 0; i < points.length; i++) {
      if (index === i) {
        continue;
      }
      // The queue will help us to always get the min distance between the points
      // and the indexes will help us to get all nodes
      if (!visited.has(i)) {
        let distance = computeDistance(points[i][0], points[i][1], x, y);
        minHeap.enqueue({ index: i, weight: distance });
      }
    }
  }
  return cost;
};

function computeDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// Option 2
// Time O(M * N)
// Space O(M * N)
var minCostConnectPoints = function (points) {
  // Compute the Manhattan distance from all points
  // to all points
  /*
  [
   [ 0, 1, 4 ],  [ 0, 2, 13 ],
   [ 0, 3, 7 ],  [ 0, 4, 7 ],
   [ 1, 2, 9 ],  [ 1, 3, 3 ],
   [ 1, 4, 7 ],  [ 2, 3, 10 ],
   [ 2, 4, 14 ], [ 3, 4, 4 ]
  ]
  */
  let computed = computeManhattanDistance(points);
  // Rank edges by weights, that will minimize
  // the cost
  computed.sort((a, b) => a[2] - b[2]);
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
  // Look for all points
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

// Test.
points = [
  [0, 0],
  [2, 2],
  [3, 10],
  [5, 2],
  [7, 0],
];
console.log(minCostConnectPoints(points));
