/*
Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Example:
Input:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 6

https://leetcode.com/problems/maximal-rectangle/
*/
// Time: O(n^2*m^2)
// Space: O(1)
var maximalRectangle = function (matrix) {
  let maxArea = 0;

  if (!matrix || !matrix.length) {
    return 0;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let rowCount = 1;
      let colCount = 1;
      let rowIndex = i;
      if (matrix[i][j] === "1") {
        while (rowIndex < matrix.length) {
          // Extend columns
          let colCountTmp = 1;
          for (let k = j + 1; k < matrix[i].length; k++) {
            if (matrix[rowIndex][k] === "1") {
              colCountTmp++;
            } else {
              break;
            }
          }
          // We want a rectangle
          if (rowCount > 1) {
            colCount = Math.min(colCount, colCountTmp);
          } else {
            colCount = colCountTmp;
          }
          maxArea = Math.max(rowCount * colCount, maxArea);
          // Expand rows
          // Here is just to try to expand but the area work
          // is above
          if (rowIndex + 1 < matrix.length && matrix[rowIndex + 1][j] === "1") {
            rowIndex++;
            rowCount++;
          } else {
            break;
          }
        }
      }
    }
  }
  return maxArea;
};
