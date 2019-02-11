/*
Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

Example 1:

Input: [3,0,1]
Output: 2
Example 2:

Input: [9,6,4,2,3,5,7,0,1]
Output: 8
Note:
Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?


https://leetcode.com/problems/missing-number/
*/

var missingNumber = function(nums) {
  let max = Math.max(...nums);
  let sum = 0
  
  // Sum from 1 to n
  /* for(let i = 1; i <= nums.length; i++) {
   sum += 1;
  } */
  
  // sum = n( n + 1 )/ 2
  sum = nums.length * (nums.length + 1) / 2;
 
 for(let i = 0; i < nums.length; i++) {
  sum -= nums[i];
 }
 
 return sum;
};

nums = [1] // 0
console.log(missingNumber(nums));
