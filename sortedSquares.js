/*
Given an array of integers A sorted in non-decreasing order, return an array of the squares of each number, also in sorted non-decreasing order.

Example 1:

Input: [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Example 2:

Input: [-7,-3,2,3,11]
Output: [4,9,9,49,121]

https://leetcode.com/problems/squares-of-a-sorted-array/

*/

// Option 1

var sortedSquares = function(A) {
    let result = new Array(A.length).fill(0);
    let left = 0;
    let right = A.length - 1;
    let index = A.length - 1;
    
    while(left <= right) {
        let leftSqr = A[left] * A[left];
        let rightSqr = A[right] * A[right];
        if(leftSqr < rightSqr) {
            result[index] = rightSqr;
            right--;
        } else {
            result[index] = leftSqr;
            left++;
        }
        index--;
    }
    return result;
};

// Option 2
var sortedSquares = function(A) {
    let result = [];
    let j = 0;
    
    while(j < A.length && A[j] < 0) {
          j++;
    }
    
    let i = j - 1;
    let index = 0;
    
    // Two pointers
    while(i >= 0 && j < A.length) {
        if(A[i] * A[i] < A[j] * A[j]) {
            result[index++] = A[i] * A[i];
            i--;
        } else {
            result[index++] = A[j] * A[j];
            j++;
        }
    }
    
    // If we have missing values
    while (i >= 0) {
        result[index++] = A[i] * A[i];
        i--;
    }

    while (j < A.length) {
        result[index++] = A[j] * A[j];
        j++;
    }

    return result;
    
};