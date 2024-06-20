/*
Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.
Example 1:

Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
Explanation: 
Islands in gray are closed because they are completely surrounded by water (group of 1s).

Example 2:
Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
Output: 1
Example 3:

Input: grid = [[1,1,1,1,1,1,1],
               [1,0,0,0,0,0,1],
               [1,0,1,1,1,0,1],
               [1,0,1,0,1,0,1],
               [1,0,1,1,1,0,1],
               [1,0,0,0,0,0,1],
               [1,1,1,1,1,1,1]]
Output: 2

https://leetcode.com/problems/number-of-closed-islands/
*/

var closedIsland = function(grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let result = 0;
  for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
          // Start to verify only if there's a land "zero"
          if (grid[i][j] === 0) {
              if (dfs(grid, i, j)) {
                  result++;
              }
          }
      }
  }
  return result;
};

function dfs(grid, row, col) {
  // If water is found, it means that it might be
  // enclosing the island
  if (grid[row][col] === 1) {
      return true;
  }

  // Check limits
  if (!isSafe(row, col, grid)) {
      return false;
  }

  // In order to be a closed island, the island should be surrounded by water
  // so we can ignore the edges of the grid
  if (row === 0 || row === grid.length - 1 || col === 0 || col === grid[0].length - 1) {
      return false;
  }

  // Mark as water to avoid cycles
  grid[row][col] = 1;

  let left = dfs(grid, row, col - 1);
  let right = dfs(grid, row, col + 1);
  let top = dfs(grid, row - 1, col);
  let down = dfs(grid, row + 1, col);
  
  return left && right && top && down;
}

function isSafe(row, col, grid) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
      (row >= 0 && row < ROW) &&
      (col >= 0 && col < COL)
  );
}