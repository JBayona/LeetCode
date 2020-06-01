/*
An array is monotonic if it is either monotone increasing or monotone decreasing.

An array A is monotone increasing if for all i <= j, A[i] <= A[j].  An array A is
monotone decreasing if for all i <= j, A[i] >= A[j].

Return true if and only if the given array A is monotonic.

Example 1:

Input: [1,2,2,3]
Output: true
Example 2:

Input: [6,5,4,4]
Output: true
Example 3:

Input: [1,3,2]
Output: false
Example 4:

Input: [1,2,4,5]
Output: true
Example 5:

Input: [1,1,1]
Output: true

https://leetcode.com/problems/monotonic-array/
*/

// Option 1
/*var isMonotonic = function(A) {
  // Is increasing
  let isIncreasing = null;
  for(let i = 0; i < A.length - 1; i++) {
    // Set flag only for first time
    if(A[i] < A[i+1] && isIncreasing === null) {
        isIncreasing = false;
    }
    
    // Set flag only for first time
    if(A[i] > A[i+1] && isIncreasing === null) {
        isIncreasing = true;
    }
    
    if(A[i] < A[i+1] && isIncreasing) {
        return false;
    }
    
    if(A[i] > A[i+1] && !isIncreasing) {
        return false;
    }
  }
  return true;
};*/

// Option 2
var isMonotonic = function(A) {
  let increasing = 0;
  let decreasing = 0;
  for(let i = 0; i < A.length - 1; i++) {
    if(A[i] < A[i+1]) {
      increasing++
    }
    if(A[i] > A[i+1]) {
      decreasing++;
    }
    
    // If both variables are greater then zero it means
    // that the array has increasing and decreasing
    if(increasing > 0 && decreasing > 0) {
      return false;
    }
  }
  return true;
};