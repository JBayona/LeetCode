/*
Given an integer array nums of length n where all the integers of nums are
in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]

Example 2:
Input: nums = [1,1,2]
Output: [1]

Example 3:
Input: nums = [1]
Output: []

https://leetcode.com/problems/find-all-duplicates-in-an-array/description/?envType=daily-question&envId=2024-03-25
*/

// Time O(N)
var findDuplicates = function (nums) {
  // Mark the number to be negative when it's seen
  let duplicates = [];
  for (let num of nums) {
    let index = Math.abs(num) - 1;
    if (nums[index] < 0) {
      duplicates.push(Math.abs(num));
    } else {
      // Set the value to negative to mark seen
      nums[index] = -nums[index];
    }
  }
  return duplicates;
};
