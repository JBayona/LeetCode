/*
There are n cities. Some of them are connected, while some are not. If city a is connected
directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.
You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are
directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

https://leetcode.com/problems/number-of-provinces/
*/

// DFS
// Time (M * N)
var findCircleNum = function(grid) {
  let visited = new Array(grid.length).fill(0);
  let count = 0;
  for(let i = 0; i < grid.length; i++) {
      if(!visited[i]) {
          dfs(i, grid, visited);
          count++;
      }
  }
  return count;
};

function dfs(node, grid, visited) {
  for(let i = 0; i < grid[node].length; i++) {
      if(!visited[i] && grid[node][i]) {
          visited[i] = true;
          dfs(i, grid, visited);
      }
  }
}

// Union Find
var findCircleNum = function(grid) {
  let parent = {};
  for(let i = 0; i < grid[0].length; i++) {
      parent[i] = i;
  }
  
  for(let i = 0; i < grid.length; i++) {
      for(let j = i + 1; j < grid[i].length; j++) {
          if(grid[i][j]) {
              let parentA = findParent(i, parent);
              let parentB = findParent(j, parent);
              if(parentA !== parentB) {
                  union(parentA, parentB, parent);
              }
          }
      }
  }
  
  let result = 0;
  for(let i = 0; i < grid.length; i++) {
      if(parent[i] === i) {
          result++;
      }
  }
  return result;
};

// El valor del map es el padre
// En este caso usamos el node A como el padre
function union(nodeA, nodeB, parent) {
  let parentA = findParent(nodeA, parent);
  let parentB = findParent(nodeB, parent);
  parent[parentB] = parentA;
}

function findParent(node, parent) {
  if(node === parent[node]) {
      return node;
  }
  return findParent(parent[node], parent);
}
