/*
You are given a 0-indexed 2D integer matrix grid of size n * n with values in the range [1, n2]. Each integer
appears exactly once except a which appears twice and b which is missing. The task is to find the repeating and missing numbers a and b.

Return a 0-indexed integer array ans of size 2 where ans[0] equals to a and ans[1] equals to b.

Example 1:
Input: grid = [[1,3],[2,2]]
Output: [2,4]
Explanation: Number 2 is repeated and number 4 is missing so the answer is [2,4].

Example 2:
Input: grid = [[9,1,7],[8,9,2],[3,4,6]]
Output: [9,5]
Explanation: Number 9 is repeated and number 5 is missing so the answer is [9,5].

https://leetcode.com/problems/find-missing-and-repeated-values
*/

var findMissingAndRepeatedValues = function (grid) {
  let n = grid.length;
  let nums = new Array(n * n).fill(0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let num = grid[i][j];
      // -1 as 0 index
      nums[num - 1]++;
    }
  }

  let a = 0;
  let b = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      b = i + 1;
    } else if (nums[i] === 2) {
      a = i + 1;
    }
  }
  return [a, b];
};
