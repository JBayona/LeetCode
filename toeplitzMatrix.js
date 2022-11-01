/*
Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, return false.
A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.

https://leetcode.com/problems/toeplitz-matrix/description/
*/

// Option 1
var isToeplitzMatrix = function (matrix) {
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[i].length; j++) {
      if (matrix[i][j] !== matrix[i - 1][j - 1]) {
        return false;
      }
    }
  }
  return true;
};

// Option 2
var isToeplitzMatrix = function (matrix) {
  let ROW = matrix.length;
  let COL = matrix[0].length;
  let n = ROW + COL - 1;

  let initCol = 0;
  let initRow = ROW - 1;

  let row = ROW - 1;
  let col = 0;
  for (let i = 0; i < n; i++) {
    let number = matrix[row][col];
    while (row >= 0 && row < ROW && col >= 0 && col < COL) {
      if (matrix[row][col] === number) {
        row--;
        col--;
      } else {
        return false;
      }
    }
    // Control from where to start the diagonal
    if (initCol < COL - 1) {
      initCol++;
      row = ROW - 1;
      col = initCol;
    } else {
      initRow--;
      row = initRow;
      col = COL - 1;
    }
  }
  return true;
};
