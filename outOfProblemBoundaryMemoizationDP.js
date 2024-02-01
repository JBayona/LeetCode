/*
There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn]. You are allowed to
move the ball to one of the four adjacent cells
in the grid (possibly out of the grid crossing the grid boundary). You can apply at
most maxMove moves to the ball.

Given the five integers m, n, maxMove, startRow, startColumn, return the number of paths to move the
ball out of the grid boundary. Since the answer can be very large, return it modulo 109 + 7.

https://leetcode.com/problems/out-of-boundary-paths/description/
*/
// Memoization
var findPaths = function (m, n, maxMove, startRow, startColumn) {
  // Grid to track the possible gays to leave the grid
  // dp[x][y][moves]
  let dp = new Array(m);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(n)
      .fill(null)
      .map(() => new Array(maxMove + 1).fill(-Infinity));
  }

  return helper(m, n, dp, maxMove, startRow, startColumn);
};

function helper(m, n, dp, movesLeft, row, col) {
  const mod = 1e9 + 7;
  // Base case: if we reach out of bounds, return 1 path
  if (row < 0 || row >= m || col < 0 || col >= n) {
    return 1;
  }

  // If we exhaust the moves
  if (movesLeft <= 0) {
    return 0;
  }

  // Already computed, no need to compute again
  if (dp[row][col][movesLeft] !== -Infinity) {
    return dp[row][col][movesLeft];
  }

  let count = 0;
  // Iterate over all possibilities
  count = (count + helper(m, n, dp, movesLeft - 1, row + 1, col)) % mod;
  count = (count + helper(m, n, dp, movesLeft - 1, row, col - 1)) % mod;
  count = (count + helper(m, n, dp, movesLeft - 1, row - 1, col)) % mod;
  count = (count + helper(m, n, dp, movesLeft - 1, row, col + 1)) % mod;

  // Memoization: Save the value
  dp[row][col][movesLeft] = count;

  return count;
}
