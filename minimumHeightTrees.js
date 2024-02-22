/*
For an undirected graph with tree characteristics, we can choose any node as the root.
The result graph is then a rooted tree. Among all possible rooted trees, those with
minimum height are called minimum height trees (MHTs). Given such a graph, write a function
to find all the MHTs and return a list of their root labels.

Format:
The graph contains n nodes which are labeled from 0 to n - 1. You will be given the number
n and a list of undirected edges (each edge is a pair of labels).

You can assume that no duplicate edges will appear in edges. Since all edges are undirected
[0, 1] is the same as [1, 0] and thus will not appear together in edges.

Example 1 :
Input: n = 4, edges = [[1, 0], [1, 2], [1, 3]]

        0
        |
        1
       / \
      2   3 
Output: [1]

https://leetcode.com/problems/minimum-height-trees/
*/

// Reference: https://www.youtube.com/watch?v=ivl6BHJVcB0
var findMinHeightTrees = function (n, edges) {
  if (edges.length === 0) {
    return [0];
  }

  const graph = makeAdjacencyList(n, edges);
  /*
    Map(4) {
        0 => Set(1) { 1 },
        1 => Set(3) { 0, 2, 3 },
        2 => Set(1) { 1 },
        3 => Set(1) { 1 }
    }

    */
  let nodes = n;
  let leaves = [];

  // Add leaves into array
  for (let [node, adj] of graph) {
    // If the node has only 1 neighbor, it means
    // its leaf node
    if (adj.size === 1) {
      leaves.push(node);
    }
  }
  console.log(leaves);

  // If the number of nodes is odd, we only have 1 minimum height tree
  // if the number of nodes is even, we can only have 2 minimum height tree
  // the answer would be the nodes that try to make it balance, the leaf nodes
  // will never be an answer as the height is max with leafes as root
  // Iterate until we have 2 max 2 minimum height trees
  while (nodes > 2) {
    nodes -= leaves.length;
    // The goal is to remove leaves from graph and find new leaves
    const newLeaves = [];
    for (const leaf of leaves) {
      let adjList = graph.get(leaf);
      adjList.forEach((neighbor) => {
        // Delete from the graph the leaf node within its neighbors
        graph.get(neighbor).delete(leaf);
        // If after removing a leaf node we have created a new leaf node
        // we need to track it as we will need to remove it later as well
        if (graph.get(neighbor).size === 1) {
          newLeaves.push(neighbor);
        }
      });
      // Delete the node itself from the graph
      graph.delete(leaf);
    }
    // Updat the new leaves
    leaves = newLeaves;
  }
  return leaves;
};

function makeAdjacencyList(n, edges) {
  const adjacencyList = new Map();

  for (let i = 0; i < n; i++) {
    adjacencyList.set(i, new Set());
  }
  for (const [v1, v2] of edges) {
    adjacencyList.get(v1).add(v2);
    adjacencyList.get(v2).add(v1);
  }
  return adjacencyList;
}
