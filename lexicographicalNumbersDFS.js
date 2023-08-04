/*
Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.
You must write an algorithm that runs in O(n) time and uses O(1) extra space. 

Example 1:
Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]

Example 2:
Input: n = 2
Output: [1,2]

https://leetcode.com/problems/lexicographical-numbers/description/
*/

// Go deep for each level and try to get all numbers without breaking the limit
// For example for 1390, desired output is 1, 10, 100, 1000, 1001, 1002
// ..., 1009, 101, 1010, 1011, 1012,..., 1019, 102, 1020, 1021, 1022...,1029,
// 103, 1030, 1031, ... 1039, 104, 1040, ...
// Start from 1
// Go deep to 10
// Go deep to 100
// Go deep to 1000
// Go deep to 10000 (It´s greater than n, discard)
// Add 1001 to 1009 (Can´t go deeper than 1009)
// Go up 101
// Go deep 1010
// Go deep 10100 (It's greater than n, discard)
// Add 1011 to 1019
// Go up 102
// Go deep 1020
// ...
// Time O(N)
// Time O(1)
var lexicalOrder = function (n) {
  let arr = [];
  // Only from 1 to 9
  for (let i = 1; i <= 9 && i <= n; i++) {
    arr.push(i);
    dfs(i, arr, n);
  }
  return arr;
};

function dfs(baseIndex, arr, n) {
  // Base Case
  if (baseIndex * 10 > n) {
    return;
  }
  // Generate all numbers on the next level
  for (let i = baseIndex * 10; i < baseIndex * 10 + 10 && i <= n; i++) {
    arr.push(i);
    dfs(i, arr, n);
  }
}
