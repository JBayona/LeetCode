/*
There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The
ministry of transport decided to orient the roads in one direction because they are too narrow.

Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.

This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.
It's guaranteed that each city can reach city 0 after reorder.

https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/?envType=study-plan-v2&envId=graph-theory
*/

// Approach, the key is to create an undirected graph and mark the nodes
// that are not originall so we can identify how to come back, if we are
// traversing from the original node, it means we are moving away, we need
// the opposite direction, that's why we need to come back
// We count for the routes that are moving away as we need to come back
// Time O(V + E)
var minReorder = function (n, connections) {
  let graph = {};
  for (let node of connections) {
    let [from, to] = node;
    if (!(from in graph)) {
      graph[from] = [];
    }
    if (!(to in graph)) {
      graph[to] = [];
    }
    graph[from].push(to);
    graph[to].push(-from);
  }

  let queue = [];
  let visited = new Set();
  let result = 0;
  // Initial node
  queue.push(0);
  visited.add(0);

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      for (let neighbor of graph[node]) {
        let src = Math.abs(neighbor);
        // If we already visited the node, we don't need to
        // visit the node again
        if (visited.has(src)) {
          continue;
        }
        visited.add(src);
        // We know it's coming from the original path if
        // the node is greater than zero as the others are
        // marked as negatives
        // Original path, we need to go to the
        // opposite direction
        if (neighbor > 0) {
          result++;
        }
        queue.push(src);
      }
    }
  }
  return result;
};
