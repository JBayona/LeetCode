/*
Given an integer array nums and an integer k, return true if it is possible to
divide this array into k non-empty subsets whose sums are all equal.

Example 1:
Input: nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: It is possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.

Example 2:
Input: nums = [1,2,3,4], k = 3
Output: false

https://leetcode.com/problems/partition-to-k-equal-sum-subsets/
*/

// Time O(N!)
var canPartitionKSubsets = function (nums, k) {
  // Get the total sum
  let sum = nums.reduce((current, prev) => (current += prev));

  // There should be an exact division in order to create subsets
  if (sum % k !== 0) {
    return false;
  }

  let targetSum = sum / k;
  let seen = new Set();
  return backtrack(nums, 0, 0, k, targetSum, seen);
};

function backtrack(nums, count, currentSum, k, targetSum, seen) {
  // We were able to create k-1 subsets then we know we
  // are good as the last one will be ok as well
  if (count == k - 1) {
    return true;
  }

  if (currentSum > targetSum) {
    return false;
  }

  // If current sum is ok, then increment subset and look for more
  if (currentSum === targetSum) {
    return backtrack(nums, count + 1, 0, k, targetSum, seen);
  }

  // Try not picked elements
  for (let i = 0; i < nums.length; i++) {
    if (!seen.has(i)) {
      // Mark as visited
      seen.add(i);
      // If using current ith element in this subset leads to make all valid subsets.
      if (backtrack(nums, count, currentSum + nums[i], k, targetSum, seen)) {
        return true;
      }

      // Backtrack as it was not possible
      seen.delete(i);
    }
  }
}
