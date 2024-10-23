/*
Given a m x n grid filled with non-negative numbers, find a path from top left to
bottom right which minimizes the sum of all numbers along its path.
Note: You can only move either down or right at any point in time.
Example:
Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7

Explanation: Because the path 1→3→1→1→1 minimizes the sum.

https://leetcode.com/problems/minimum-path-sum/
*/

// Time O(N)
// Space O(1)
var minPathSum = function (grid) {
  const ROW = grid.length;
  const COL = grid[0].length;

  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      // at start, do nothing
      if (i === 0 && j === 0) continue;

      if (i !== 0 && j !== 0) {
        // We are in the middle
        // We can only move from the bottom or right
        grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
      } else if (i === 0) {
        // Agains the ceiling
        // Moving only to the right
        grid[i][j] += grid[i][j - 1];
      } else if (j === 0) {
        // Agains the left wall
        // Moving only down
        grid[i][j] += grid[i - 1][j];
      }
    }
  }

  return grid[ROW - 1][COL - 1];
};
