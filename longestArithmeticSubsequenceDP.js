/*
Given an array nums of integers, return the length of the longest arithmetic subsequence in nums.

Note that:
A subsequence is an array that can be derived from another array by deleting some or no
elements without changing the order of the remaining elements.
A sequence seq is arithmetic if seq[i + 1] - seq[i] are all the same value (for 0 <= i < seq.length - 1).
 
Example 1:
Input: nums = [3,6,9,12]
Output: 4
Explanation:  The whole array is an arithmetic sequence with steps of length = 3.

Example 2:
Input: nums = [9,4,7,2,10]
Output: 3
Explanation:  The longest arithmetic subsequence is [4,7,10].

Example 3:
Input: nums = [20,1,15,3,10,5,8]
Output: 4
Explanation:  The longest arithmetic subsequence is [20,15,10,5].

https://leetcode.com/problems/longest-arithmetic-subsequence/description/
*/

// Time O(N^2)
// Space O(N^2)
var longestArithSeqLength = function (nums) {
  // Per requirements, minimum we have two elements in the array
  let result = 2;
  let dp = new Array(nums.length);
  // Each position in the array represents the hash of each difference
  for (let i = 0; i < nums.length; i++) {
    dp[i] = {};
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      let diff = nums[j] - nums[i];
      if (!(diff in dp[i])) {
        dp[i][diff] = 0;
      }
      // 2 because it´s the default number of the elment itself + 1
      // we take each two elements
      dp[i][diff] = diff in dp[j] ? dp[j][diff] + 1 : 2;
      result = Math.max(result, dp[i][diff]);
    }
  }
  return result;
};
