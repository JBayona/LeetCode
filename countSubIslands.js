/*
Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]]
grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
Output: 3
Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
The 1s colored red in grid2 are those considered to be part of a sub-island. There are three sub-islands.

https://leetcode.com/problems/count-sub-islands/description/
*/

// Time O(M * N)
// Space O(1)
var countSubIslands = function(grid1, grid2) {
  let ROW = grid1.length;
  let COL = grid1[0].length;

  let result = 0;
  for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
          // Both should start with 1 to be considered as sub-island
          if (grid1[i][j] === 1 && grid2[i][j] === 1 && dfs(grid1, grid2, i, j)) {
              result++;
          }
      }
  }
  return result;
};

function dfs(grid1, grid2, row, col) {
  // If out of bounds, we can consider sub-island
  if (!isSafe(grid1, row, col)) {
      return true;
  }

  // If there's no 1 in grid2, it can be a sub-island
  if (grid2[row][col] !== 1) {
      return true;
  }

  // If values are not the same, it cannot be a sub-island
  if (grid1[row][col] !== grid2[row][col]) {
      return false;
  }

  // Mark as visited to avoid loops
  grid2[row][col] = -1;
  let bottom = dfs(grid1, grid2, row - 1, col);
  let up = dfs(grid1, grid2, row + 1, col);
  let left = dfs(grid1, grid2, row, col - 1);
  let right = dfs(grid1, grid2, row, col + 1);

  return bottom && up && left && right;
}

function isSafe(grid, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
      row >= 0 && row < ROW &&
      col >= 0 && col < COL
  );
}