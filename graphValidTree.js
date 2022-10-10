/*
Given n nodes labeled from 0 to n-1 and a list of undirected
edges (each edge is a pair of nodes), write
a function to check whether these edges make up a valid tree.

For example:
Given n = 5 and edges = [[0, 1], [0, 2], [0, 3], [1, 4]], return true.
Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]], return false.

You can assume that no duplicates edges will appear in edges. Since all edges are undirected [0, 1] is the same as [1, 0] and thus will not appear together in edges.

https://leetcode.com/problems/graph-valid-tree/

https://www.youtube.com/watch?v=n_t0a_8H8VY
https://www.youtube.com/watch?v=rFf4mXWbb9U
https://www.youtube.com/watch?v=ojge0iS19qQ
https://www.programcreek.com/2014/05/graph-valid-tree-java/
https://www.youtube.com/watch?v=vsIb9B84Rt8

Multiple approaches:
https://zhuhan0.blogspot.com/2017/07/leetcode-261-graph-valid-tree.html
Para ser un árbol válido debe cumplir con las siguientes características:
1. Estar conectado.
2. No debe haber ciclos.
*/

// DFS
// Time: O(V + E) - V number of vertices
// Space: O(V)
var validTree = function(n, edges) {
  // Corner case
  // In order to be a connected tree, it should have the number of nodes - 1
  if(edges.length !== n-1) return false;

  let graph = [];

  // Create the graph
  for(let i = 0; i < n; i++) {
    graph[i] = [];
  }

  // Fill the undirected graph
  for(let i = 0; i < edges.length; i++) {
    // Destructuring
    // Insert both sides as the graph is undirected
    let [from, to] = edges[i];
    graph[from].push(to);
    graph[to].push(from);
  }

  console.log('Graph');
  console.log(graph);

  // Visited edges
  let visited = new Array(n).fill(0);

  // Visit the first node
  visited[0] = true;
  // Check that there is no cycle
  if(dfs(graph, visited, 0, -1)) {
    return false;
  }

  // Check if all the graph is connected
  // If any node has not been visited, then
  // the tree is not valid
  for(let i = 0; i < visited.length; i++) {
    if(!visited[i]) {
      return false;
    }
  }

  // All the graph is connected and there is no cycle at this point
  return true;
}

// Has cycle
function dfs(graph, visited, node, parent) {
  let children = graph[node];
  for(let i = 0; i < children.length; i++) {
    let v = children[i];
    // Ignore if the node is coming from the father i.e [1,0], [0, 1]
    if(v === parent) continue;
    if(!visited[v]) {
      visited[v] = true;
      return dfs(graph, visited, v, node);
    } else {
      // The node has been visited so there´s a cycle
      return true;
    }
  }
  // The node has not been visited
  return false;
}

function hasCycleDFS(graph, visited, node, parent) {
  visited[node] = true;
  for(let neighbor of graph[node]) {
    if(parent !== neighbor && visited[neighbor]) {
      return true;
    }
    if(!visited[neighbor] && hasCycleDFS(graph, visited, neighbor, node)) {
      return true
    }
  }
  return false;
}

// BFS
// Time: O(V) - V number of vertices
// Space: O(V)
var validTree = function(n, edges) {
  // Corner case
  if(edges.length !== n-1) return false;

  let graph = [];
  // Create the graph
  for(let i = 0; i < n; i++) {
    graph[i] = [];
  }

  // Fill the undirected the graph
  for(let i = 0; i < edges.length; i++) {
    // Destructuring
    // Insert both sides as the graph is undirected
    let [from, to] = edges[i];
    graph[from].push(to);
    graph[to].push(from);
  }

  // Print the graph
  console.log(graph);

  let queue = [];
  let visited = new Set();

  queue.push(edges[0][0]);
  visited.add(edges[0][0]);
  let nodes = 0;
  while(queue.length){
    let node = queue.shift();
    nodes++;
    let children = graph[node];
    for(child of children) {
      // If the queue has already the node
      // it means we have a cycle
      if(queue.includes(child)) {
        return false;
      }
      if(!visited.has(child)) {
        queue.push(child);
        visited.add(child);
      }
    }
  }
  // Check whether all nodes are connected wit this
  return nodes === n;
}

n = 5;
edges = [[0, 1], [0, 2], [0, 3], [1, 4]]; // true
// edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]; // false
console.log(validTree(n, edges));
