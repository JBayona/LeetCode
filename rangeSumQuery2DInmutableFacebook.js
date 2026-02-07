/*
Given a 2D matrix matrix, find the sum of the elements inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

Range Sum Query 2D
The above rectangle (with the red border) is defined by (row1, col1) = (2, 1) and (row2, col2) = (4, 3), which contains sum = 8.

Example:
Given matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]

sumRegion(2, 1, 4, 3) -> 8
sumRegion(1, 1, 2, 2) -> 11
sumRegion(1, 2, 2, 4) -> 12
Note:
You may assume that the matrix does not change.
There are many calls to sumRegion function.
You may assume that row1 ≤ row2 and col1 ≤ col2.

https://leetcode.com/problems/range-sum-query-2d-immutable/
*/

/*
// Range sum queries without updates
// arr = [1, 2, 3, 4, 5];
// i = 1, j = 3 => Result = 9 = sum arr[1] + arr[2] + arr[3]
// i = 2, j = 4 => Result = 12 = sum arr[2] + arr[3] + arr[4]

function findRangeSum(array, start, end) {
  // Start from index 1, this is a prefix sum
  for(let i = 1; i < array.length; i++) {
    array[i] = array[i] + array[i-1];
  }
  return array[end] - array[start-1];
}

console.log(findRangeSum([1, 2, 3, 4, 5], 1, 3)); // 9
console.log(findRangeSum([1, 2, 3, 4, 5], 2, 4)); // 12
*/

// This function will have the sum of all previous values
// in the position matrix[i][j] creating a square, we need to
// compute it before
/*
Original:

[
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5
]
Computed:
[3, 3, 4, 8, 10]
[8, 14, 18, 24, 27]
[9, 17, 21, 28, 36]
[13, 22, 26, 34, 49]
[14, 23, 30, 38, 58]
*/

var NumMatrix = function(matrix) {
    // Copy the matrix
    this.matrix = matrix;
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[0].length; j++) {
            let sum = 0;
            // Prefix sum by row (add previous element)
            if(j > 0) {
                sum += this.matrix[i][j-1];
            }
            // Prefix sum by col (add previous element)
            if(i > 0) {
                sum += this.matrix[i-1][j];
            }
            // Sum the actual element
            sum += this.matrix[i][j];
            // We already considered this element in prev sum, so let's decrease it
            // The previous sum adds all elements but fur boundaries we dont
            // hit this condition as there are no previous value to sum
            if(i > 0 && j > 0) {
                sum -= matrix[i-1][j-1];
            }
            // Set the value
            this.matrix[i][j] = sum;
        }
    }
    console.log(this.matrix);
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */

// This is a square, so we need to decrease the corners, bottom left
// diagonal and up
/*
x...x
.....
.....
x...T
*/
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    // We have the entire sum for all the values, these are
    // the sum of the block in the given position
    let sum = this.matrix[row2][col2];
    // We need to decrease the values
    if(col1 > 0) {
        sum -= this.matrix[row2][col1-1];
    }
    if(row1 > 0) {
        sum -= this.matrix[row1-1][col2];
    }
    if(row1 > 0 && col1 > 0) {
        sum += this.matrix[row1-1][col1-1];
    }
    return sum;
};

/*
matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
];
console.log(populateDataMatrix(matrix));
*/
