/*
Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least 
one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

Note:
You must not modify the array (assume the array is read only).
You must use only constant, O(1) extra space.
Your runtime complexity should be less than O(n2).
There is only one duplicate number in the array, but it could be repeated more than once.

https://leetcode.com/problems/find-the-duplicate-number/description/
*/

/**
 * @param {number[]} nums
 * @return {number}
 */

// Time O(N)
// Space O(1)
var findDuplicate = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    // Como los elementos son positivos no debemos hacer ningún shift
    if (nums[Math.abs(num)] >= 0) {
      nums[Math.abs(num)] = -nums[Math.abs(num)];
    } else {
      // This is the repeated number
      return Math.abs(nums[i]);
    }
  }
  return -1;
};

// Time O(N)
// Space O(N)
var findDuplicate = function (nums) {
  var map = {};
  let item;
  for (let i = 0; i < nums.length; i++) {
    item = nums[i];
    if (item in map) {
      return item;
    } else {
      map[item] = true;
    }
  }
  return false;
};

array = [1, 2, 5, 6, 2];
console.log(findDuplicate(array));
