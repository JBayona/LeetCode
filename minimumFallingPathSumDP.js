/*
Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

A falling path starts at any element in the first row and chooses the element in the
next row that is either directly below or diagonally left/right. Specifically, the next
element from position (row, col) will be (row + 1, col - 1), (row + 1, col)
or (row + 1, col + 1).

https://leetcode.com/problems/minimum-falling-path-sum/description/
*/

var minFallingPathSum = function (matrix) {
  let dp = new Array(matrix.length);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(matrix[0].length).fill(Infinity);
  }

  // Fill the first row
  for (let i = 0; i < dp[0].length; i++) {
    dp[0][i] = matrix[0][i];
  }

  for (let i = 1; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      // If we are in the left corner, we can only check the cell down and right
      if (j === 0) {
        dp[i][j] = Math.min(
          dp[i][j],
          matrix[i][j] + dp[i - 1][j],
          matrix[i][j] + dp[i - 1][j + 1]
        );
      } else if (j === matrix[0].length - 1) {
        // Right
        dp[i][j] = Math.min(
          dp[i][j],
          matrix[i][j] + dp[i - 1][j - 1],
          matrix[i][j] + dp[i - 1][j]
        );
      } else {
        dp[i][j] = Math.min(
          dp[i][j],
          matrix[i][j] + dp[i - 1][j - 1],
          matrix[i][j] + dp[i - 1][j],
          matrix[i][j] + dp[i - 1][j + 1]
        );
      }
    }
  }

  // Get the result
  let result = Infinity;
  for (let i = 0; i < dp[0].length; i++) {
    result = Math.min(result, dp[dp.length - 1][i]);
  }
  return result;
};
