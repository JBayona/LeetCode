/*
Given a set of distinct positive integers, find the largest subset such that every pair (Si, Sj) of
elements in this subset satisfies:

Si % Sj = 0 or Sj % Si = 0.

If there are multiple solutions, return any subset is fine.

Example 1:

Input: [1,2,3]
Output: [1,2] (of course, [1,3] will also be ok)
Example 2:

Input: [1,2,4,8]
Output: [1,2,4,8]

https://leetcode.com/problems/largest-divisible-subset/
*/

// Time O(N^2)
var largestDivisibleSubset = function(nums) {
  if(!nums) {
      return [];
  }
  let n = nums.length;
  nums.sort((a,b) => a - b);
  let dp = new Array(n);
  dp[0] = 1;
  for(let i = 1; i < n; i ++) {
      dp[i] = 1;
      for(let j = 0; j < i; j ++) {
          let res = dp[j] + 1;
          if(nums[i]%nums[j]==0 && res > dp[i]) {
              dp[i] = res;
          }
      }
  }
  console.log(dp);
  let prevMax = 0;
  let result = [];
  for(let i = 0; i < n; i ++) {
      if(prevMax < dp[i]) {
          prevMax = dp[i];
          result.push(nums[i]);
      }
  }
  return result;
};