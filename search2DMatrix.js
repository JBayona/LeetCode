/*
Write an efficient algorithm that searches for a value in an m x n matrix.
This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.

Example:
Consider the following matrix:
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]

Given target = 5, return true.
Given target = 20, return false

https://leetcode.com/problems/search-a-2d-matrix-ii/
*/

// Time O(M Log N)
var searchMatrix = function(matrix, target) {
    let i = matrix.length - 1;
    let j = 0;
    
    while(i >= 0 && j < matrix[0].length) {
        let current = matrix[i][j];
        if(current === target) {
            return true;
        }
        if(current > target) {
            i--;
        } else {
            j++;
        }
    }
    return false;
};


// Time O(M Log N)
var searchMatrix = function(matrix, target) {
  for(let i = 0; i < matrix.length; i++) {
    let result = binarySearch(matrix[i], target);
    if(result) {
        return true;
    }
  }
  return false;
};

function binarySearch(array, target) {
  let start = 0;
  let end = array.length - 1;
  
  while(start <= end) {
    let middle = Math.floor((start + end)/2);
    if(array[middle] === target) {
        return true;
    }
    if(array[middle] < target) {
        start = middle + 1;
    } else {
        end = middle - 1;
    }
  }
  return false;
}
