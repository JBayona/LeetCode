/*
There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive).
The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes
a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex source to vertex destination.

Given edges and the integers n, source, and destination, return true if there is a valid path from source
to destination, or false otherwise.

https://leetcode.com/problems/find-if-path-exists-in-graph/description/
*/

var validPath = function (n, edges, source, destination) {
  let graph = {};
  // Construct graph
  for (let edge of edges) {
    let [from, to] = edge;
    if (!(from in graph)) {
      graph[from] = [];
    }
    if (!(to in graph)) {
      graph[to] = [];
    }
    graph[from].push(to);
    graph[to].push(from);
  }
  let visited = new Set();
  return hasPathBFS(graph, visited, source, destination);
};

const hasPathBFS = (graph, visited, src, dst) => {
  let queue = [src];
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      // We found the node
      if (dst === node) {
        return true;
      }
      // If the node has been visited, we
      // just need to skip it and look for others
      if (visited.has(node)) {
        continue;
      }
      visited.add(node);
      for (let neighbor of graph[node]) {
        queue.push(neighbor);
      }
    }
  }
  return false;
};

/* const hasPathDFS = (graph, visited, src, dst) => {
  // Base cases
  if(src === dst) {
      return true;
  }
  if(visited.has(src)) {
      return false;
  }
  visited.add(src);
  for(let neighbor of graph[src]) {
      if (hasPathDFS(graph, visited, neighbor, dst)) {
          return true;
      }
  }
  return false;
}
*/
