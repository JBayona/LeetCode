/*
In a gold mine grid of size m * n, each cell in this mine has an integer representing the
amount of gold in that cell, 0 if it is empty.

Return the maximum amount of gold you can collect under the conditions:

Every time you are located in a cell you will collect all the gold in that cell.
From your position you can walk one step to the left, right, up or down.
You can't visit the same cell more than once.
Never visit a cell with 0 gold.
You can start and stop collecting gold from any position in the grid that has some gold.
 
Example 1:
Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
Output: 24
Explanation:
[[0,6,0],
 [5,8,7],
 [0,9,0]]
Path to get the maximum gold, 9 -> 8 -> 7.

Example 2:
Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
Output: 28
Explanation:
[[1,0,7],
 [2,0,6],
 [3,4,5],
 [0,3,0],
 [9,0,20]]
Path to get the maximum gold, 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.

https://leetcode.com/problems/path-with-maximum-gold/
*/
// Complexity: O (V + E)
var getMaximumGold = function (grid) {
  let m = grid.length;
  let n = grid[0].length;
  let max = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // We are only interested in those blocks with gold
      // Look for all options we have gold
      if (grid[i][j] !== 0) {
        let count = dfs(grid, i, j, m, n);
        max = Math.max(count, max);
      }
    }
  }
  return max;
};

function dfs(grid, row, col, m, n) {
  // Check if we can do a valid move, either there are no
  // blockers to move and thee move is safee
  if (!isSafe(grid, row, col, m, n) || grid[row][col] === 0) {
    return 0;
  }

  // Retrieve the variable to avoid loops and mark it as visited
  let sum = grid[row][col];
  grid[row][col] = 0;

  let top = dfs(grid, row - 1, col, m, n);
  let right = dfs(grid, row, col + 1, m, n);
  let bottom = dfs(grid, row + 1, col, m, n);
  let left = dfs(grid, row, col - 1, m, n);

  let best = Math.max(top, right, bottom, left);

  // Set back the value to avoid modifications
  // backtrack the original form
  grid[row][col] = sum;
  return sum + best;
}

function isSafe(grid, row, col, m, n) {
  return row >= 0 && row < m && col >= 0 && col < n;
}
