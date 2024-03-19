/*
Given a binary array nums, return the maximum length of a contiguous
subarray with an equal number of 0 and 1.

Example 1:
Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.

Example 2:
Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.

https://leetcode.com/problems/contiguous-array/description/?envType=daily-question&envId=2024-03-16
*/
// Time O(N)
// Space O(1)
var findMaxLength = function (nums) {
  let hash = {};
  let sum = 0;
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] === 0 ? -1 : 1;
    // If not seen before, add the sum and the index
    if (!(sum in hash)) {
      // Add the sum with the index
      hash[sum] = i;
    } else {
      // If seen before this is a candidate and we will use the index we
      // saw as it could be a result
      // This is a possible candidate
      result = Math.max(result, i - hash[sum]);
    }
    // Result for equal nnuumber of 0s and 1s
    if (sum === 0) {
      result = Math.max(result, i + 1);
    }
  }
  return result;
};
