/*
There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents
a connection between servers ai and bi. Any server can reach other servers directly or indirectly through the network.

A critical connection is a connection that, if removed, will make some servers unable to reach some other server.
Return all critical connections in the network in any order.

Example 1:
Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
Explanation: [[3,1]] is also accepted.

Example 2:
Input: n = 2, connections = [[0,1]]
Output: [[0,1]]

https://leetcode.com/problems/critical-connections-in-a-network/description/?envType=study-plan-v2&envId=graph-theory
*/

// Approach: an edge is critical if and only if it's not in a loop
// Assign an order to each visited node, if the current node can go to a node with smaller number, there's a cycle
// If a node can go to a branch that the minimum order of all nodes in that branch is exactly one more than the
// current branch, that's the critical edge
// Time O(V + E)
// Space O(V + E)
var criticalConnections = function (n, connections) {
  let graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  for (let connection of connections) {
    let [from, to] = connection;
    graph[from].push(to);
    graph[to].push(from);
  }

  let order = new Array(n).fill(0);
  let result = [];
  dfs(0, -1, 1, graph, order, result);
  return result;
};

function dfs(node, parent, rank, graph, order, result) {
  if (order[node] > 0) {
    return node;
  }
  // Set the rank
  order[node] = rank;
  let min = node;
  for (let neighbor of graph[node]) {
    // Prevent going back to the same node
    // as the graph is undirected
    if (neighbor === parent) {
      continue;
    }
    // Get the node with the smalles order on the branch. If there's a cycle, the
    // smallest is the same number, we cannot get less values and in a cycle we know
    // we can always find a smallest node.
    // But in the critical connection, the smallest value will always be the rank + 1
    // If the node does not have smallest rank, it will just return the same node, itself
    let smallest = dfs(neighbor, node, rank + 1, graph, order, result);
    // Current rank + 1
    if (order[smallest] === rank + 1) {
      result.push([neighbor, node]);
    } else {
      min = order[smallest] < order[min] ? smallest : min;
    }
  }
  return min;
}
