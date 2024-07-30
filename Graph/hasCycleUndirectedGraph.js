/*
See if there´s a cycle in an undirected graph
*/

// Option 1 - Union find
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

// Option 2 - DFS
function dfsHasCycle(n, edges) {
  let graph = [];
  for(let i = 0; i < n; i++) {
    graph[i] = [];
  }

  for(let node of edges) {
    let [from, to] = node;
    graph[from].push(to);
    graph[to].push(from);
  }
  
  // Check if we have a cycle
  let visited = new Set();
  visited.add(0);
  if(dfs(graph, visited, 0, -1)) {
    return true;
  }
  return false;
}

function dfs(graph, visited, node, parent) {
  for(let neighbor of graph[node]) {
    if(neighbor === parent) {
      continue;
    }
    // We have a cycle already
    if(visited.has(neighbor)) {
      return true
    } else {
      visited.add(neighbor);
      return dfs(graph, visited, neighbor, node);
    }
  }
  // The node has not been visited
  return false;
}

// Given n = 5 and edges = [[0, 1], [0, 2], [0, 3], [1, 4]], return false - No cycle.
// Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]], return true - Has cycle.
n = 5;
edges = [[0, 1], [0, 2], [0, 3], [1, 4]];
edges2 = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
console.log(unionFindHasCycle(n, edges));
console.log(dfsHasCycle(n, edges));
console.log(unionFindHasCycle(n, edges2));
console.log(dfsHasCycle(n, edges2));
