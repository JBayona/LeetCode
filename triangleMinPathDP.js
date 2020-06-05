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
  // Process from bottom-up
  for(let i = row - 2; i>= 0; i--) {
    for(let j = 0; j <= i; j++) {
      if(triangle[i+1][j+1] < triangle[i+1][j]) {
        triangle[i][j] += triangle[i+1][j+1];
      } else {
        triangle[i][j] += triangle[i+1][j];
      }
    }
  }
  return triangle[0][0];
};