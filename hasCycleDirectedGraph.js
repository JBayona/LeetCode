/*
Detect a cycle in directed graph
*/
// Time O(V + E)
// Space O(V + E)
function hasCycleDirectedGraph(n, edges) {
  let graph = [];
  // Create graph
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  // Fill directed graph
  for (let node of edges) {
    let [from, to] = node;
    graph[from].push(to);
  }
  // states:
  // 0 - no visited
  // 1 = visited but not processed
  // 2 = processed
  let states = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (states[i] === 0) {
      // Check that there is no cycle
      if (hasCycle(i, graph, states)) {
        return true;
      }
    }
  }
  return false;
}

function hasCycle(node, graph, states) {
  // This will give true if the node has a cycle
  if (states[node] > 0) {
      return states[node] !== 2;
  }
  // Mark as processing
  states[node] = 1;
  for (let neighbor of graph[node]) {
    if (hasCycle(neighbor, graph, states)) {
        return true;
    }
  }
  // Mark as processed
  states[node] = 2;
  return false;
}

/*
function hasCycle(node, graph, states) {
  // Processing
  states[node] = 1;
  for (let neighbor of graph[node]) {
    if (states[neighbor] === 0) {
      if (hasCycle(neighbor, graph, states)) {
        return true;
      }
    }
    if (states[neighbor] === 1) {
      return true;
    }
  }
  // Mark as processed
  states[node] = 2;
  return false;
}
*/

n = 2;
edges = [[1, 0]];
edges2 = [[1,0],[0,1]];
console.log(hasCycleDirectedGraph(n, edges));
console.log(hasCycleDirectedGraph(n, edges2));
