/*
Given an integer array nums, return the number of triplets chosen from the
array that can make triangles if we take them as side lengths of a triangle.

Example 1:
Input: nums = [2,2,3,4]
Output: 3
Explanation: Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3

Example 2:
Input: nums = [4,2,3,4]
Output: 4

https://leetcode.com/problems/valid-triangle-number/
*/

var triangleNumber = function (nums) {
  let result = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let k = i + 2;
    for (let j = i + 1; j < nums.length - 1 && nums[i] !== 0; j++) {
      while (nums[i] + nums[j] > nums[k] && k < nums.length) {
        k++;
        result += k - j - 1;
      }
    }
  }
  return result;
};

/*
var triangleNumber = function(nums) {
  let result = 0;
  for(let i = 0; i < nums.length - 2; i++) {
     for(let j = i + 1; j < nums.length - 1; j++) {
         for(let k = j + 1; k < nums.length; k++) {
             if(nums[i] + nums[j] > nums[k] && 
               nums[i] + nums[k] > nums[j] &&
               nums[j] + nums[k] > nums[i]) {
                 result++;
             }
         }
     } 
  }
  return result;
};
*/

/*
var triangleNumber = function(nums) {
  let result = 0;
  nums.sort((a, b) => a - b);
  for(let i = 0; i < nums.length - 2; i++) {
      for(let j = i + 1; j < nums.length - 1; j++) {
          let k = j + 1;
          while(nums[i] + nums[j] > nums[k] && k < nums.length) {
              k++;
              result++;
          }
      }
  }
  return result;
};
*/
