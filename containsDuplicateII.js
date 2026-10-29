/*
Given an integer array nums and an integer k, return true if there are two distinct indices
i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

Example 1:
Input: nums = [1,2,3,1], k = 3
Output: true

Example 2:
Input: nums = [1,0,1,1], k = 1
Output: true

Example 3:
Input: nums = [1,2,3,1,2,3], k = 2
Output: false

https://leetcode.com/problems/contains-duplicate-ii/description/
*/

// Time O(N)
// Space O(N)
var containsNearbyDuplicate = function (nums, k) {
  let hash = {};
  let prevIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    let n = nums[i];
    if (n in hash) {
      prevIndex = hash[n];
      if (i - prevIndex <= k) {
        return true;
      }
    }
    hash[n] = i;
  }
  return false;
};