/*
You are given a 0-indexed integer array nums. You have to partition the array
into one or more contiguous subarrays.

We call a partition of the array valid if each of the obtained subarrays
satisfies one of the following conditions:

The subarray consists of exactly 2 equal elements. For example, the subarray [2,2] is good.
The subarray consists of exactly 3 equal elements. For example, the subarray [4,4,4] is good.
The subarray consists of exactly 3 consecutive increasing elements, that is, the difference between
adjacent elements is 1. For example, the subarray [3,4,5] is good, but the subarray [1,3,5] is not.
Return true if the array has at least one valid partition. Otherwise, return false.

Example 1:
Input: nums = [4,4,4,5,6]
Output: true
Explanation: The array can be partitioned into the subarrays [4,4] and [4,5,6].
This partition is valid, so we return true.

Example 2:
Input: nums = [1,1,1,2]
Output: false
Explanation: There is no valid partition for this array.

https://leetcode.com/problems/check-if-there-is-a-valid-partition-for-the-array/description/
*/

// Time O(N)
// Space O(1)
var validPartition = function (nums) {
  let n = nums.length;
  dp = [false, false, false];
  // An empty partition is always valid
  dp[0] = true;
  for (let i = 2; i <= n; i++) {
    let answer = false;
    // First case, 2 equals
    if (nums[i - 1] === nums[i - 2]) {
      answer = answer || dp[(i - 2) % 3];
    }
    // Second case, 3 equals
    if (i >= 3 && nums[i - 1] === nums[i - 2] && nums[i - 1] === nums[i - 3]) {
      answer = answer || dp[(i - 3) % 3];
    }
    // Third case, 3 consecutive
    if (
      i >= 3 &&
      nums[i - 1] === nums[i - 2] + 1 &&
      nums[i - 1] === nums[i - 3] + 2
    ) {
      answer = answer || dp[(i - 3) % 3];
    }
    // Each answer we override results, we just need to update the result
    // each of the times we get a new result from previous conditions.
    dp[i % 3] = answer;
  }
  return dp[n % 3];
};

nums = [4, 4, 4, 5, 6];
console.log(validPartition(nums));
