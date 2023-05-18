/*
Given a directed acyclic graph, with n vertices numbered from 0 to n-1, and an array
edges where edges[i] = [fromi, toi] represents a directed edge from node fromi to node toi.

Find the smallest set of vertices from which all nodes in the graph are reachable. It's guaranteed
that a unique solution exists.

Notice that you can return the vertices in any order.

https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/description/
*/

var findSmallestSetOfVertices = function (n, edges) {
  let isThereAnyEdge = new Array(n).fill(false);
  for (let edge of edges) {
    let [from, to] = edge;
    isThereAnyEdge[to] = true;
  }

  let minNodes = [];
  for (let i = 0; i < n; i++) {
    // Add in the result those values that either are parents or
    // does not have any connection
    if (!isThereAnyEdge[i]) {
      minNodes.push(i);
    }
  }
  return minNodes;
};
