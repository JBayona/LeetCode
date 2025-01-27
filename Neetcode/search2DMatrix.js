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
