/*
Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.

Example 1:
Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
Output: 3
Explanation: The repeated subarray with maximum length is [3,2,1].

Example 2:
Input: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
Output: 5

https://leetcode.com/problems/maximum-length-of-repeated-subarray/
*/

// DP
var findLength = function (nums1, nums2) {
  let dp = new Array(nums1.length + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(nums2.length + 1).fill(0);
  }

  // Iterate in reverse
  let result = 0;
  for (let i = nums1.length - 1; i >= 0; i--) {
    for (let j = nums2.length - 1; j >= 0; j--) {
      if (nums1[i] === nums2[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
        if (result < dp[i][j]) {
          result = dp[i][j];
        }
      }
    }
  }
  return result;
};
