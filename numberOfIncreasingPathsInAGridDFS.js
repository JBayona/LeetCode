/*
You are given an m x n integer matrix grid, where you can move from a cell to
any adjacent cell in all 4 directions.

Return the number of strictly increasing paths in the grid such that you can
start from any cell and end at any cell. Since the answer may be very large, return
it modulo 109 + 7.

Two paths are considered different if they do not have exactly the same sequence of visited cells.
Example 1:
Input: grid = [[1,1],[3,4]]
Output: 8
Explanation: The strictly increasing paths are:
- Paths with length 1: [1], [1], [3], [4].
- Paths with length 2: [1 -> 3], [1 -> 4], [3 -> 4].
- Paths with length 3: [1 -> 3 -> 4].
The total number of paths is 4 + 3 + 1 = 8.

Example 2:
Input: grid = [[1],[2]]
Output: 3
Explanation: The strictly increasing paths are:
- Paths with length 1: [1], [2].
- Paths with length 2: [1 -> 2].
The total number of paths is 2 + 1 = 3.

https://leetcode.com/problems/number-of-increasing-paths-in-a-grid/description/
*/

// Time O(N * M )
// Space O(N * M )
var countPaths = function (grid) {
  let result = 0;
  let mod = 1000000007;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // Get the total answer in all the grid
      result += dfs(grid, i, j, -1) % mod;
    }
  }
  return result;
};

function dfs(grid, row, col, prev) {
  let dp = new Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
    dp[i] = new Array(grid[0].length).fill(0);
  }

  let ROW = [0, 0, -1, 1];
  let COL = [-1, 1, 0, 0];
  let mod = 1000000007;
  // Base case
  if (
    row < 0 ||
    col < 0 ||
    row >= grid.length ||
    col >= grid[0].length ||
    grid[row][col] <= prev
  ) {
    return 0;
  }
  // Base case
  // Already seen it before
  if (dp[row][col] !== 0) {
    return dp[row][col];
  }
  // At least it has its own
  dp[row][col] = 1;
  for (let i = 0; i < 4; i++) {
    let nextRow = row + ROW[i];
    let nextCol = col + COL[i];
    dp[row][col] += dfs(grid, nextRow, nextCol, grid[row][col]);
    dp[row][col] %= mod;
  }

  console.log(dp);
  return dp[row][col] % mod;
}
