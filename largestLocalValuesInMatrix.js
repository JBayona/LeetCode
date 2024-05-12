/*
You are given an n x n integer matrix grid.

Generate an integer matrix maxLocal of size (n - 2) x (n - 2) such that:

maxLocal[i][j] is equal to the largest value of the 3 x 3 matrix in grid centered around row i + 1 and column j + 1.
In other words, we want to find the largest value in every contiguous 3 x 3 matrix in grid.

Return the generated matrix.

https://leetcode.com/problems/largest-local-values-in-a-matrix/description/?envType=daily-question&envId=2024-05-12
*/

// Time O(N)
// Space O(1)
var largestLocal = function (grid) {
  let n = grid.length;
  let result = new Array(n - 2);
  for (let i = 0; i < result.length; i++) {
    result[i] = new Array(n - 2).fill(0);
  }

  // Iterate through the matrix excluding borders
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      // Calculate the max in the 3x3 matrix window
      let max = getMaxValue(grid, i, j);
      // Save the result
      result[i - 1][j - 1] = max;
    }
  }
  return result;
};

function getMaxValue(grid, row, col) {
  let max = -Infinity;
  // Iterate over the 3x3 matrix
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      // Update the mmax result
      max = Math.max(max, grid[i][j]);
    }
  }
  return max;
}
