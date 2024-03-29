/*
Given numRows, generate the first numRows of Pascal's triangle.

For example, given numRows = 5,
Return

[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]

https://leetcode.com/problems/pascals-triangle/description/
*/

// DP
// Option 1
var generate = function (numRows) {
  let result = [];
  for (let i = 0; i < numRows; i++) {
    result[i] = [];
    // Left most 1
    result[i][0] = 1;
    for (let j = 1; j < i; j++) {
      result[i][j] = result[i - 1][j - 1] + result[i - 1][j];
    }
    result[i][i] = 1;
  }
  return result;
};

// Option 2
// O(n^2) time and O(1)
var pascalTriangle = function (n) {
  let result = [];
  let tmp = [];
  //Iterate through every line and add it into the array
  for (let line = 1; line <= n; line++) {
    /*Every line has number of integers equal to line number*/
    let c = 1;
    for (let j = 1; j <= line; j++) {
      tmp.push(c);
      c = (c * (line - j)) / j;
    }
    result.push(tmp);
    tmp = [];
  }
  return result;
};

n = 5;
console.log(pascalTriangle(n));
