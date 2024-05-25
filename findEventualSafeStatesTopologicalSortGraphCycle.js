/*
There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented
by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i
meaning there is an edge from node i to each node in graph[i].

A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible
path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.
https://leetcode.com/problems/find-eventual-safe-states/description/?envType=study-plan-v2&envId=graph-theory
*/
// Time O(V+E) – where V is the number of vertices and E is the number of edges in the graph.
// Space O(V+E) – where V is the number of vertices and E is the number of edges in the graph.
// Directed Graph
var eventualSafeNodes = function(graph) {
  // States
  // 0 - No visited
  // 1 - Visited, not processed
  // 2 - Processed
  let states = new Array(graph.length).fill(0);
  let result = [];
  for (let i = 0; i < graph.length; i++) {
      // We should not have cycle in the graph
      if (!hasCycle(i, graph, states)) {
          result.push(i);
      }
  }
  return result;
};

function hasCycle(node, graph, states) {
  // 2 is our good state, so if the node has been processed
  // it should be greater than 0 if it has been visited already
  if (states[node] > 0) {
      // === 2 would be the safe state (no cycles)
      return states[node] !== 2;
  }
  // Mark node as processing for the first time
  states[node] = 1;
  for (let neighbor of graph[node]) {
      if (hasCycle(neighbor, graph, states)) {
          return true;
      }
  }
  // Mark node as processed
  states[node] = 2;
  return false;
}