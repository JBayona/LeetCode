/*
There are n cities numbered from 0 to n-1. Given the array edges where
edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted edge between
cities fromi and toi, and given the integer distanceThreshold.

Return the city with the smallest number of cities that are reachable through some path and whose
distance is at most distanceThreshold, If there are multiple such cities, return the
city with the greatest number.

Notice that the distance of a path connecting cities i and j is equal to the sum of the
edges' weights along that path.

https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/
*/

var findTheCity = function (n, edges, distanceThreshold) {
  let graph = creategraph(edges);

  let city = 0;
  // Min can´t be greater than n+1
  let min = n + 1;
  for (let i = 0; i < n; i++) {
    let count = bfs(i, graph, distanceThreshold);
    if (count <= min) {
      result = i;
      min = count;
    }
  }
  return result;
};

function bfs(node, graph, distanceThreshold) {
  let queue = [[node, 0]];
  let count = 0;
  let visited = new Set();
  while (queue.length) {
    let [n, weight] = queue.shift();
    if (visited.has(n)) {
      continue;
    }
    if (!(n in graph)) {
      continue;
    }
    visited.add(n);
    count++;
    for (let neighbor of graph[n]) {
      let [neighborNode, weightNeighbor] = neighbor;
      if (weightNeighbor + weight <= distanceThreshold) {
        queue.push([neighborNode, weightNeighbor + weight]);
      }
    }
  }
  return count;
}

function creategraph(edges) {
  let graph = {};
  for (let i = 0; i < edges.length; i++) {
    let [from, to, weight] = edges[i];
    if (!(from in graph)) {
      graph[from] = [];
    }
    if (!(to in graph)) {
      graph[to] = [];
    }
    graph[from].push([to, weight]);
    graph[to].push([from, weight]);
  }
  return graph;
}
