/*
There is a bi-directional graph with n vertices, where each vertex is labeled
from 0 to n - 1 (inclusive).
The edges in the graph are represented as a 2D integer array edges, where each
edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi.
Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex
source to vertex destination.Given edges and the integers n, source, and destination
return true if there is a valid path from source to destination, or false otherwise.

https://leetcode.com/problems/find-if-path-exists-in-graph/description/
*/

// Option 1
var validPath = function (n, edges, source, destination) {
  // Create graoh
  let graph = {};
  for (let node of edges) {
    let [from, to] = node;
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
  // return hasValidPathDFS(graph, source, destination, visited);
  return hasValidPathBFS(graph, source, destination, visited);
};

function hasValidPathBFS(graph, source, destination, visited) {
  let queue = [source];
  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      // Found the destination node
      if (node === destination) {
        return true;
      }
      // If the node has been visited before
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
}

function hasValidPathDFS(graph, source, destination, visited) {
  // If the node is found
  if (source === destination) {
    return true;
  }
  // If the node has been visited before
  if (visited.has(source)) {
    return false;
  }
  // Mark node as visited
  visited.add(source);
  for (let neighbor of graph[source]) {
    if (hasValidPathDFS(graph, neighbor, destination, visited)) {
      return true;
    }
  }
  return false;
}

// Option 2
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
