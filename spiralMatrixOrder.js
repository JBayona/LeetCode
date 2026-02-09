/*
Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.
For example,
Given the following matrix:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
You should return [1,2,3,6,9,8,7,4,5].

https://leetcode.com/problems/spiral-matrix/description/
*/

var spiralOrder = function (matrix) {
  let rowStart = 0;
  let rowEnd = matrix.length;
  let columnStart = 0;
  let columnEnd = matrix[0].length;

  let result = [];
  while (rowStart < rowEnd && columnStart < columnEnd) {
    // Horizontal
    for (let i = columnStart; i < columnEnd; i++) {
      result.push(matrix[rowStart][i]);
    }
    rowStart++;

    // Vertical
    for (let i = rowStart; i < rowEnd; i++) {
      result.push(matrix[i][columnEnd - 1]);
    }
    columnEnd--;

    // Decrement
    if (rowStart < rowEnd) {
      for (let i = columnEnd - 1; i >= columnStart; i--) {
        result.push(matrix[rowEnd - 1][i]);
      }
      rowEnd--;
    }

    // From bottom to up
    if (columnStart < columnEnd) {
      for (let i = rowEnd - 1; i >= rowStart; i--) {
        result.push(matrix[i][columnStart]);
      }
      columnStart++;
    }
  }
  return result;
};

var spiralOrder = function (matrix) {
  if (matrix.length === 0) return [];
  let result = [];
  let rowStart = 0;
  let rowEnd = matrix.length;
  let columnStart = 0;
  let columnEnd = matrix[0].length;
  //console.log(rowEnd, columnEnd);
  while (rowStart < rowEnd && columnStart < columnEnd) {
    //Print Horizontal left-right
    for (let i = columnStart; i < columnEnd; i++) {
      //console.log(matrix[rowStart][i]);
      result.push(matrix[rowStart][i]);
    }
    //Increment start
    rowStart++;

    //Print vertical right
    for (let i = rowStart; i < rowEnd; i++) {
      //console.log(matrix[i][columnEnd-1]);
      result.push(matrix[i][columnEnd - 1]);
    }
    //Decrement vertical
    columnEnd--;

    if (rowStart < rowEnd) {
      for (let i = columnEnd - 1; i >= columnStart; i--) {
        //console.log(matrix[columnEnd][i]);
        result.push(matrix[rowEnd - 1][i]);
      }
      rowEnd--;
    }

    if (columnStart < columnEnd) {
      for (let i = rowEnd - 1; i >= rowStart; i--) {
        //console.log(matrix[i][columnStart]);
        result.push(matrix[i][columnStart]);
      }
      columnStart++;
    }
  }
  return result;
};

/*var matrix = [
   [ 1, 2, 3 ],
   [ 4, 5, 6 ],
   [ 7, 8, 9 ]
  ];*/
var matrix = [[2], [3]];
console.log(spiralOrder(matrix));
