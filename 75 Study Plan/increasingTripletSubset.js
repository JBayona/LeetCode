/*
Given an integer array nums, return true if there exists a triple of indices (i, j, k)
such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.

Example 1:
Input: nums = [1,2,3,4,5]
Output: true
Explanation: Any triplet where i < j < k is valid.

Example 2:
Input: nums = [5,4,3,2,1]
Output: false
Explanation: No triplet exists.

Example 3:
Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.

https://leetcode.com/problems/increasing-triplet-subsequence/description/
*/
// Time O(N)
// Space O(1)
var increasingTriplet = function (nums) {
  let firstSmall = Number.MAX_SAFE_INTEGER;
  let secondSmall = Number.MAX_SAFE_INTEGER;
  // Iterate over the elements
  for (let n of nums) {
    // When we find first small value assign it
    if (n <= firstSmall) {
      firstSmall = n;
    } else if (n <= secondSmall) {
      // When we find second small value which is larger than 'first' but smaller than 'second'
      secondSmall = n;
    } else {
      return true; // Third value, which is larger than previous values
    }
  }
  return false;
};
