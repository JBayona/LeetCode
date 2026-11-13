/*
Write an efficient algorithm that searches for a value in an m x n matrix.
This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
 
Example 1:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true

Example 2:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false

https://leetcode.com/problems/search-a-2d-matrix/
*/
// Time: O(NLog(M))
var searchMatrix = function(matrix, target) {
  let len = matrix.length;
  let index = 0;

  let left = 0;
  let right = matrix[0].length - 1;
  while (index < len) {
      let arr = matrix[index];
      // Check that elements are within the range
      if (target >= arr[0] && target <= arr[arr.length - 1]) {
          return binarySearch(arr, target);
      } else {
          // Move to the next element
          index++;
      }
  }
  return false;
};

var binarySearch = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
      let middle = Math.floor((left + right) / 2);
      if (nums[middle] === target) {
          return true;
      } else if (nums[middle] < target) { // Target in right side
          left = middle + 1;
      } else { // Target in the left side
          right = middle - 1;
      }
  }
  return false;
};


// Time O(M + N)
// We follow a stair-case approach where we can start from top right or bottom left
// the idea is to either remove an entire row or column until we find the element
// Time O(N + M)
// Time O(1)
var searchMatrix = function(matrix, target) {
    let row = 0;
    let col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] > target) {
            col--;
        } else {
            row++;
        }
    }
    return false;
};


// Time O(Log M * N)
// Space O(1)
// treats the 2D matrix as a single, flattened 1D sorted array of length M * M
// We can treat this as a long line, if we divide the elements by the columns
// we get how many rows we have, and if we use a module, we get the column where
// the element is.
var searchMatrix = function(matrix, target) {
    let start = 0;
    let end = (matrix.length * matrix[0].length) - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let n = matrix[Math.floor(mid / matrix[0].length)][Math.floor(mid % matrix[0].length)];

        if (n === target) {
            return true;
        }
        if (target < n) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return false;
};


/*
//First find which row should target be
  for(int i=0;i<row;i++)
  {

      if(target >= matrix[i][0])
      {
          which_row = i;
      }

  }

  for(int i =0;i<col;i++)
  {

      if(target == matrix[which_row][i])
          return true;
  }

  return false;
*/
