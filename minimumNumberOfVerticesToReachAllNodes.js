/*
Given a directed acyclic graph, with n vertices numbered from 0 to n-1, and an array edges where edges[i] = [fromi, toi] represents a directed edge from node fromi to node toi.

Find the smallest set of vertices from which all nodes in the graph are reachable. It's guaranteed that a unique solution exists.

Notice that you can return the vertices in any order.

https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/description/?envType=study-plan-v2&envId=graph-theory
*/

// Option 1
var findSmallestSetOfVertices = function(n, edges) {
  // Nodes with zero degree
  let degree = new Array(n).fill(0);
  for(let edge of edges) {
      let [from, to] = edge;
      degree[to]++;
  }

  let minNodes = [];
  for (let i = 0; i < n; i++) {
      // Add in the result those values that either are parents or
      // does not have any connection
      if(degree[i] === 0) {
          minNodes.push(i);
      }
  }
  return minNodes;
};