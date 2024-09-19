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
// DFS
// Time: O(V) - V number of vertices
// Space: O(V)
var validTree = function(n, edges) {
  // Corner case
  // Valid grapg only has edges.length-1
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
      let node = edges[i];
      let [from, to] = node;
      graph[from].push(to);
      graph[to].push(from);
  }
  
  // Visited edges
  let visited = new Array(n).fill(0);

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
  visited[node] = true;
  for (let neighbor of graph[node]) {
      // As this is unidirected graph, we need
      // to make sure it's not the same node
      if (neighbor === parent) {
          continue;
      }
      if (visited[neighbor]) {
          return true;
      }
      if (dfs(graph, visited, neighbor, node)) {
          return true;
      }
  }
  return false;
}

/*
function dfs(graph, visited, node, parent) {
    for(let neighbor of graph[node]) {
        if(neighbor === parent) {
            continue;
        }
        // We have a cycle already
        if(visited[neighbor]) {
            return true;
        } else {
            visited[neighbor] = true;
            if(dfs(graph, visited, neighbor, node)) {
                return true;
            }
        }
    }
    // The node has not been visited
    return false;
}
*/


// Union Find
// Time complexity: O(E).
var validTree = function(n, edges) {
  let parent = {};
  let size = [];

  // Set parent nodes to itself first
  for(let c of edges) {
    let [from, to] = c;

    // Set root to all nodes
    if(!(from in parent)) {
      parent[from] = from;
    }
    // Set root to all nodes
    if(!(to in parent)) {
      parent[to] = to;
    }
  }

  //{0:0, 1:1, 2:2, 3:3, 4:4}
  console.log(parent);

  for(let c of edges) {
    let [from, to] = c;
    let parent1 = findParent(from, parent);
    let parent2 = findParent(to, parent);

    // Si ambos padres son el mismo, significa que hay
    // un ciclo, la conexión es redundante.
    if(parent1 === parent2) {
      return false;
    }
    // Union - Set ambos nodos son un padre común ya que
    // ambos están conectados
    // Une cada conexión
    union(from, to, parent);
  }

  console.log('Union Find:');
  console.log(parent);
  return edges.length == n - 1;

}

// El valor del map es el padre
// En este caso usamos el node A como el padre
function union(nodeA, nodeB, parent) {
  let parentA = findParent(nodeA, parent);
  let parentB = findParent(nodeB, parent);
  parent[parentB] = parentA;
}

// Correr recursivamente todos los niveles hasta encontrar
// el padre, el padre es aquel que key y value es el mismo
function findParent(node, parent) {
  if(parent[node] === node) {
    return node;
  }
  return findParent(parent[node], parent);
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
