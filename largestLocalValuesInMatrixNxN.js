/*
You are given an n x n integer matrix grid.

Generate an integer matrix maxLocal of size (n - 2) x (n - 2) such that:

maxLocal[i][j] is equal to the largest value of the 3 x 3 matrix in grid centered around row i + 1 and column j + 1.
In other words, we want to find the largest value in every contiguous 3 x 3 matrix in grid.

Return the generated matrix.

https://leetcode.com/problems/largest-local-values-in-a-matrix/description/?envType=daily-question&envId=2024-05-12
*/
// Option 1
// Time O(N)
// Space O(1)
var largestLocal = function (grid) {
  let result = new Array(grid.length - 2);
  let max = -Infinity;
  for (let i = 0; i <= grid.length - 3; i++) {
    let max = getMax(i, grid[0].length - 3, grid);
  }
};

function traverseMatrix(row, col, grid) {
  let max = -Infinity;
  for (let i = 0; i <= row; i++) {
    for (let j = 0; j <= col; j++) {
      max = Math.max(max, grid[i][j]);
    }
  }
  return max;
}

// Option 2
// Time O(N)
// Space O(N)
var largestLocal = function (grid) {
  let result = [];
  let n = grid.length;
  let max = -Infinity;
  let tmp = [];
  for (let i = 0; i < n - 2; i++) {
    for (let j = 0; j < n - 2; j++) {
      for (let x = i; x < i + 3; x++) {
        for (let y = j; y < j + 3; y++) {
          max = Math.max(max, grid[x][y]);
        }
      }
      tmp.push(max);
      max = -Infinity;
    }
    result.push(tmp);
    tmp = [];
  }
  return result;
};
