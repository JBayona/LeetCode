/*
Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.

A subarray is a contiguous part of the array.

Example 1:
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded and underlined below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]

Example 2:
Input: nums = [0,0,0,0,0], goal = 0
Output: 15

https://leetcode.com/problems/binary-subarrays-with-sum/description/?envType=daily-question&envId=2024-03-14
*/
// Prefix sum
// Time O(N)
// Space O(N)
var numSubarraysWithSum = function (nums, goal) {
  let res = 0;
  let map = {};
  // There's one subarray with sum 0, which is the empty subarray
  map[0] = 1;
  let prefix = 0;
  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    if (prefix - goal in map) {
      res += map[prefix - goal];
    }
    // Increment the frequency count of the current prefix
    map[prefix] = prefix in map ? map[prefix] + 1 : 1;
  }
  return res;
};

// Brute force
var numSubarraysWithSum = function (nums, goal) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === goal) {
        result++;
      }
      if (sum > goal) {
        break;
      }
    }
  }
  return result;
};
