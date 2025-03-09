/*
This problem was asked by Stripe.

Given an array of integers, find the first missing positive integer in linear time and constant space.
In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

You can modify the input array in-place.

Given an unsorted integer array, find the smallest missing positive integer.

Example 1:

Input: [1,2,0]
Output: 3
Example 2:

Input: [3,4,-1,1]
Output: 2
Example 3:

Input: [7,8,9,11,12]
Output: 1
Note:

Your algorithm should run in O(n) time and uses constant extra space.
https://leetcode.com/problems/first-missing-positive/description/
*/
// Time O(N)
// Space O(1)
var firstMissingPositive = function (nums) {
  let tam = 0;
  // First step is to place positive numbers to the left
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      // Swap
      let tmp = nums[i];
      nums[i] = nums[tam];
      nums[tam++] = tmp;
    }
  }

  // Let's mark nums[i] as visited by making nums[nums[i - 1]]
  // We substract 1 because we are under a 0-index array and we
  // are only interested in positive numbers, note thar we are
  // focusing on index, so we are going to mark as negative the numbers
  // regardless the value, as we are using index values
  // If the number in the array is still positive, it means we have not
  // found that value in the array as an index, for instance [3, 4, -1, 1]
  // will be [3, 4, 1, -1] ather the swap, then by marking as visited
  // [3, 4, -1, -1] i = 0
  // [3, 4, -1, -1] i = 1
  // [-3, 4, -1, -1] i = 2
  let size = nums.length;
  for (let i = 0; i < tam; i++) {
    if (Math.abs(nums[i]) - 1 < size && nums[Math.abs(nums[i]) - 1] > 0) {
      nums[Math.abs(nums[i]) - 1] = -nums[Math.abs(nums[i]) - 1];
    }
  }

  // Get the index of the first value which is positive
  // The indexes are used because we are using those to find the numbers
  for (let i = 0; i < tam; i++) {
    if (nums[i] > 0) {
      // 1 is added because we started from 0-index
      // and we are just looking for positive numbers
      return i + 1;
    }
  }

  return tam + 1;
};
