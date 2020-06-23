/*
Given a non-empty array of integers, every element appears three times except for one
which appears exactly once. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement
it without using extra memory?

Example 1:

Input: [2,2,3,2]
Output: 3
Example 2:

Input: [0,1,0,1,0,1,99]
Output: 99

https://leetcode.com/problems/single-number-ii/
*/

var singleNumber = function(nums) {
  let ones = 0;
  let twos = 0;
  let threes = 0;
  for (let i = 0; i < nums.length; i++) {
    twos |= ones & nums[i];
    ones ^= nums[i];
    threes = ones & twos;
    ones &= ~threes;
    twos &= ~threes;
  }
  return ones;
};