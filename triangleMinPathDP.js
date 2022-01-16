/*
Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.

For example, given the following triangle

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).

Note:

Bonus point if you are able to do this using only O(n) extra space, where n is the total number of rows in the triangle.

https://leetcode.com/problems/triangle/
*/

// Time O(N)
// Space O(1)
var minimumTotal = function(triangle) {
  let row = triangle.length;
  // Start looking from the last row - 1
  for(let i = row - 2; i>= 0; i--) {
      // We can only move to column j or j+1
      for(let j = 0; j <= i; j++) {
          if(triangle[i+1][j+1] < triangle[i+1][j]) {
              triangle[i][j] += triangle[i+1][j+1];
          } else {
              triangle[i][j] += triangle[i+1][j];
          }
      }
  }
  // Top will have the maximum value
  return triangle[0][0];
};

// DP
var minimumTotal = function(triangle) {
  // Copy from the array
  const arr = [...triangle];
  // DP Array with N columns filled with 0s
  const dp = Array.from(Array(triangle.length), () => Array(triangle.length).fill(0));
  dp[0][0] = arr[0][0];
  
  for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
          // We can´t move the i index as we are only allowed to
          // move i and i-1
          if (j === 0) {
              dp[i][j] = dp[i - 1][j] + arr[i][j];
              continue;
          }
          // Avoid out of index, we are in the last element
          if (j === arr[i].length - 1) {
              dp[i][j] = dp[i - 1][j - 1] + arr[i][j];
              continue;
          }
        
          dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + arr[i][j];
      }
  }   
  return Math.min(...dp[dp.length - 1]);    
};