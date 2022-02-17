/*
See if there´s a cycle in an undirected graph
*/

// Union find
function unionFindHasCycle(n, edges) {
  let parent = {};
  // Create skeleton
  for(let node of edges) {
    let [from, to] = node;
    if(!(from in parent)) {
      parent[from] = from;
    }
    if(!(to in parent)) {
      parent[to] = to;
    }
  }
  // {0:0, 1:1, 2:2, 3:3, 4:4}
  for(let node of edges) {
    let [from, to] = node;
    let parentA = findParent(from, parent);
    let parentB = findParent(to, parent);

    // If both parents are the same, that means that
    // we have a cycle
    if(parentA === parentB) {
      return true;
    }
    // Union
    union(from, to, parent);
  }
  // return edges.length == n - 1;
  return false;
}

function findParent(node, parent) {
  if(parent[node] === node) {
    return node;
  }
  return findParent(parent[node], parent);
}

function union(nodeA, nodeB, parent) {
  let parentA = findParent(nodeA, parent);
  let parentB = findParent(nodeB, parent);
  parent[parentB] = parentA;
}

// Given n = 5 and edges = [[0, 1], [0, 2], [0, 3], [1, 4]], return false - No cycle.
// Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]], return true - Has cycle.
n = 5;
edges = [[0, 1], [0, 2], [0, 3], [1, 4]];
console.log(unionFindHasCycle(n, edges));
