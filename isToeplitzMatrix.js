/*
A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same element.

Now given an M x N matrix, return True if and only if the matrix is Toeplitz.
 

Example 1:

Input:
matrix = [
  [1,2,3,4],
  [5,1,2,3],
  [9,5,1,2]
]
Output: True
Explanation:
In the above grid, the diagonals are:
"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
In each diagonal all elements are the same, so the answer is True.
Example 2:

Input:
matrix = [
  [1,2],
  [2,2]
]
Output: False
Explanation:
The diagonal "[1, 2]" has different elements.

https://leetcode.com/problems/toeplitz-matrix/

*/

var isToeplitzMatrix = function(matrix) {
  for(let i = 0; i < matrix.length - 1; i++) {
    for(let j = 0; j < matrix[i].length - 1; j++) {
      if(matrix[i][j] !== matrix[i+1][j+1]) {
        return false;
      }
    }
  }
  return true;
};