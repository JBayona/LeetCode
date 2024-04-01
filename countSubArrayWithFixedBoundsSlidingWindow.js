/*
You are given an integer array nums and two integers minK and maxK.
A fixed-bound subarray of nums is a subarray that satisfies the following conditions:

The minimum value in the subarray is equal to minK.
The maximum value in the subarray is equal to maxK.
Return the number of fixed-bound subarrays.

A subarray is a contiguous part of an array.
Example 1:
Input: nums = [1,3,5,2,7,5], minK = 1, maxK = 5
Output: 2
Explanation: The fixed-bound subarrays are [1,3,5] and [1,3,5,2].

Example 2:
Input: nums = [1,1,1,1], minK = 1, maxK = 1
Output: 10
Explanation: Every subarray of nums is a fixed-bound subarray. There are 10 possible subarrays.

https://leetcode.com/problems/count-subarrays-with-fixed-bounds/description/?envType=daily-question&envId=2024-03-31
*/

// Time O(N)
// Space O(1)
var countSubarrays = function (nums, minK, maxK) {
  let result = 0;
  let index = -1;
  let minIndex = -1;
  let maxIndex = -1;
  for (let i = 0; i < nums.length; i++) {
    let c = nums[i];
    // The current number is not valid
    if (c < minK || c > maxK) {
      index = i;
    }
    if (c === maxK) {
      maxIndex = i;
    }
    if (c === minK) {
      minIndex = i;
    }
    let tmp = Math.min(maxIndex, minIndex) - index;
    result += Math.max(0, tmp);
  }
  return result;
};
