/*
You are given an m x n binary matrix grid.

A move consists of choosing any row or column and toggling each value
in that row or column (i.e., changing all 0's to 1's, and all 1's to 0's).

Every row of the matrix is interpreted as a binary number, and the score of the
matrix is the sum of these numbers.

Return the highest possible score after making any number of moves (including zero moves).

https://leetcode.com/problems/score-after-flipping-matrix/description/
*/
// Step 1 - In order to maximixe the result, we need to try to change the most significant bit
// Step 2 - In the columns (from second column onwards) count the number of 1s
// if they are less than number of 0s, flip them
// Step 3 - Calculate the score
// Time O(M * N)
// Space O(1)
var matrixScore = function (grid) {
  let m = grid.length;
  let n = grid[0].length;
  // Step 1: Toggle left most significant bit
  // This will increase our chances to maximize the result
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 0) {
      toggleRow(grid, i);
    }
  }

  // Step 2: Toggle columns to maximize when 0s are more than 1s
  // Starting with second column as first has been maximized
  for (let i = 1; i < n; i++) {
    let countOnes = 0;
    for (let row = 0; row < m; row++) {
      countOnes += grid[row][i];
    }
    if (countOnes < m - countOnes) {
      toggleColumn(grid, i);
    }
  }

  // Step 3: Calculate the score on every row
  let result = 0;
  for (let i = 0; i < m; i++) {
    result += binaryToDecimal(grid[i]);
  }
  return result;
};

function toggleRow(grid, row) {
  for (let i = 0; i < grid[0].length; i++) {
    grid[row][i] = grid[row][i] === 0 ? 1 : 0;
  }
}

function toggleColumn(grid, col) {
  for (let i = 0; i < grid.length; i++) {
    grid[i][col] = grid[i][col] === 0 ? 1 : 0;
  }
}

function binaryToDecimal(row) {
  let number = 0;
  let index = 0;
  for (let i = row.length - 1; i >= 0; i--) {
    number += row[i] * Math.pow(2, index++);
  }
  return number;
}
