/*
Given an integer array nums of length n, you want to create an array ans of length 2n where
ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed).

Specifically, ans is the concatenation of two nums arrays.

Return the array ans.
Example 1:
Input: nums = [1,2,1]
Output: [1,2,1,1,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
- ans = [1,2,1,1,2,1]

Example 2:
Input: nums = [1,3,2,1]
Output: [1,3,2,1,1,3,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
- ans = [1,3,2,1,1,3,2,1]

https://leetcode.com/problems/concatenation-of-array/description/
*/

// Option 1
// Time O(N)
// Space O(1)
// Optimization, we need to create an array with twice of
// of the size and we need to add the element on the position
// on i + n
var getConcatenation = function (nums) {
  let arr = new Array(nums.length * 2).fill(0);
  let len = nums.length;
  for (let i = 0; i < nums.length; i++) {
    arr[i] = nums[i]; // First Element
    arr[i + len] = nums[i]; // Second Element
  }
  return arr;
};

//Get the index with the floor and retrieve the element from the array
function getElement(arr, index) {
  let len = arr.length;
  return arr[index % len];
}

// Option 2
// Time O(N)
// Space O(1)
var getConcatenation = function (nums) {
  let arr = new Array(nums.length * 2).fill(0);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = getElement(nums, i);
  }
  return arr;
};

//Get the index with the floor and retrieve the element from the array
function getElement(arr, index) {
  let len = arr.length;
  return arr[index % len];
}
