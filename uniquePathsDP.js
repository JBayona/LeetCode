/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. 
The robot is trying to reach the bottom-right corner
of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?
https://leetcode.com/problems/unique-paths/description/
*/

// DP
// O(N)
var uniquePaths = function (m, n) {
  if (m === 0 || n === 0) return 0;
  if (m === 1 || n === 1) return 1;

  // Create initial aray
  let dp = new Array(m);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(n).fill(0);
  }

  // Left column
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  // Top column
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1;
  }

  // Fill the table
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // It can either go from the left and from top
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};

m = 3;
n = 7;
console.log(uniquePaths(m, n));
