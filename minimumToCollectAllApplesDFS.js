/*
Given an undirected tree consisting of n vertices numbered from 0 to n-1, which has some apples in their vertices.
You spend 1 second to walk over one edge of the tree. Return the minimum time in seconds you have to spend to collect
all apples in the tree, starting at vertex 0 and coming back to this vertex.

The edges of the undirected tree are given in the array edges, where edges[i] = [ai, bi] means that exists an edge connecting
the vertices ai and bi. Additionally, there is a boolean array hasApple, where hasApple[i] = true means that vertex i has an apple
otherwise, it does not have any apple.

Example 1:
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,true,true,false]
Output: 8 
Explanation: The figure above represents the given tree where red vertices have an apple. One optimal path to collect all apples is shown by the green arrows.  

Example 2:
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,false,true,false]
Output: 6
Explanation: The figure above represents the given tree where red vertices have an apple. One optimal path to collect all apples is shown by the green arrows.  

Example 3:
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,false,false,false,false,false]
Output: 0

https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/description/
*/
/*
 You need to consume 2 seconds to simply collect an apple node (come and go)
Consider a node:
1. If none of descendant (including itself) has an apple
we don't need to waste time on this node.
2. If any of descendant has an apple (no matter if it-self has an apple or not)
we need to consume 2 seconds on this node anyway
3. Collect node 0 does not need to consume any time
 */

var minTime = function (n, edges, hasApple) {
  let visited = new Set();
  let graph = buildGraph(edges);
  return dfs(0, graph, visited, hasApple);
};

function dfs(node, graph, visited, hasApple) {
  visited.add(node);
  let result = 0;
  for (let neighbor of graph[node]) {
    if (visited.has(neighbor)) {
      continue;
    }
    result += dfs(neighbor, graph, visited, hasApple);
  }
  if ((result > 0 || hasApple[node] === true) && node !== 0) {
    result += 2;
  }
  return result;
}

function buildGraph(edges) {
  let graph = {};
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
  return graph;
}
