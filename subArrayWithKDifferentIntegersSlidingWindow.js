/*
Given an integer array nums and an integer k, return the number of good subarrays of nums.
A good array is an array where the number of different integers in that array is exactly k.
For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
A subarray is a contiguous part of an array.

Example 1:
Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]

Example 2:
Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].

https://leetcode.com/problems/subarrays-with-k-different-integers/description/?envType=daily-question&envId=2024-03-30
*/
// Time O(N)
// Space O(N)
var subarraysWithKDistinct = function (nums, k) {
  let start = 0;
  let end = 0;
  let result = 0;
  let currentCount = 0;
  let hash = {};
  // Set initial elements to zero
  for (let num of nums) {
    hash[num] = 0;
  }

  while (end < nums.length) {
    let c = nums[end];
    // Check if we have seen the number before
    // it need to be different less than or equal to k
    if (hash[c] === 0) {
      // Different element found
      k--;
    }
    hash[c]++;

    // More elements different than required, adjust the window
    // Window not elegible
    if (k < 0) {
      let left = nums[start];
      hash[left]--;
      k++;
      start++;
      currentCount = 0;
    }
    // Window eligible, k elements different
    if (k === 0) {
      // While the count of left is > 0, keep shrinking the window
      // from left to right to count the elements
      while (hash[nums[start]] > 1) {
        hash[nums[start]]--;
        start++;
        currentCount++;
      }
      // Add all subarrays to the result
      // If the ocurrence of each element is 1
      // it will cover in here, if it has > 1 it
      // will be covered with the currentCount
      result += currentCount + 1;
    }
    // Increment right window
    end++;
  }
  return result;
};
v;
