/*
Given an array of integers nums and an integer k, return the number of contiguous
subarrays where the product of all the elements in the subarray is strictly less than k.

Example 1:
Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.

Example 2:
Input: nums = [1,2,3], k = 0
Output: 0

https://leetcode.com/problems/subarray-product-less-than-k/
*/

// Calculate the product each cycle.
// Increment end of sliding window on each cycle once.
// Increment the start of the sliding window such that the product < k.
// If product < k then the number of subarrays you can add is equal to the
// length of the current sliding window between e and s for that
// cycle (because we are only incrementing the end of the sliding window once per cycle).
var numSubarrayProductLessThanK = function (nums, k) {
  let start = 0;
  let end = 0;
  let result = 0;
  let prod = 1;
  while (end < nums.length) {
    prod *= nums[end++];
    while (start < end && prod >= k) {
      prod /= nums[start];
      start++;
    }
    result += end - start;
  }
  return result;
};

// Option 2
var numSubarrayProductLessThanK = function (nums, k) {
  let start = 0;
  let end = 0;
  let result = 0;
  let product = 1;

  while (end < nums.length) {
    let current = nums[end];
    // If product > k we need to
    if (current * product < k) {
      product *= current;
      result++;
      end++;
    } else {
      product = 1;
      start++;
      end = start;
    }

    // Reset
    if (end === nums.length) {
      product = 1;
      start++;
      end = start;
    }
  }
  return result;
};
