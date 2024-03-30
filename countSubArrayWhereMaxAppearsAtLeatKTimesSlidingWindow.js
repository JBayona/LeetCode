/*
You are given an integer array nums and a positive integer k.
Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.
A subarray is a contiguous sequence of elements within an array.

Example 1:
Input: nums = [1,3,2,3,3], k = 2
Output: 6
Explanation: The subarrays that contain the element 3 at least 2 times are: [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].

Example 2:
Input: nums = [1,4,2,1], k = 3
Output: 0
Explanation: No subarray contains the element 4 at least 3 times.

https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/description/?envType=daily-question&envId=2024-03-29
*/
// Time O(N)
// Space O(1)
var countSubarrays = function (nums, k) {
  // Find the maximum element in nums
  let maxNum = Math.max(...nums);

  // Sliding Window
  let start = 0;
  let end = 0;
  let countMax = 0;
  let result = 0;
  while (end < nums.length) {
    let c = nums[end];
    if (c === maxNum) {
      countMax++;
    }
    // The window is not available anymore as
    // the frequency is greather or equal than k
    while (start < nums.length && countMax >= k) {
      let left = nums[start];
      if (left === maxNum) {
        countMax--;
      }
      start++;
    }
    // Left brings all different options of frequencies less
    // than k, that's why we use left to add up.
    result += start;
    end++;
  }
  return result;
};
