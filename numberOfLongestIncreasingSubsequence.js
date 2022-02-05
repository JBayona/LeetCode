/*
Given an integer array nums, return the number of longest increasing subsequences.

Notice that the sequence has to be strictly increasing.

Example 1:
Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].

Example 2:
Input: nums = [2,2,2,2,2]
Output: 5
Explanation: The length of longest continuous increasing subsequence is 1
and there are 5 subsequences' length is 1, so output 5.

https://leetcode.com/problems/number-of-longest-increasing-subsequence/
*/

// Time O(N^2)
var findNumberOfLIS = function(nums) {
  let n = nums.length;
  // dp[i] will store the length of Longest Increasing Subsequence, ending at nums[i].
  let dp = new Array(n).fill(0);
  // count[i] will store the total number of Longest Increasing Subsequences, ending at nums[i]. 
  let count = new Array(n).fill(0);
  
  //lis : length of Longest Increasing Subsequence.
  let lis = 0;
  //res : total number of subsequences of length lis.
  let res = 0;
  for(let i = 0; i < n ; i++) {
      dp[i] = 1;
      count[i] = 1;
      // Check previous values
      for(let j = 0; j < i; j++) {
          if(nums[j] < nums[i]) {
              // If dp[i] is equal to dp[j] + 1, meaning a different sequence
              // has been found of same length, so increase count[i] by count[j].
              if (dp[i] == dp[j] + 1) {
                  count[i] += count[j];
              }
              // Else, if dp[i] is less than dp[j] + 1, meaning length will
              // increase as sequence will have a  new element, so store
              // dp[j] + 1 in dp[i] and count[j] in count[i].
              else if (dp[i] < dp[j] + 1) {
                  dp[i] = dp[j] + 1;
                  count[i] = count[j];
              }
          }
      }
      // If lis is equal to dp[i], meaning a new sequence is
      // found of same length, so add count[i] in res.
      if (lis == dp[i]) {
          res += count[i];
      }
      // Else if lis is less than dp[i], meaning a new sequence is
      // formed of greater length, so store the new increased length in lis and count[i] in res.
      else if (lis < dp[i]) {
          lis = dp[i];
          res = count[i];
      }
  }
  return res;
};
