/*
You are given an integer array nums and an integer x. In one operation, you can either remove the
leftmost or the rightmost element from the array nums and subtract its value from x. Note that
this modifies the array for future operations.

Return the minimum number of operations to reduce x to exactly 0 if it is possible, otherwise, return -1.

Example 1:
Input: nums = [1,1,4,2,3], x = 5
Output: 2
Explanation: The optimal solution is to remove the last two elements to reduce x to zero.

Example 2:
Input: nums = [5,6,7,8,9], x = 4
Output: -1

Example 3:
Input: nums = [3,2,20,1,1,3], x = 10
Output: 5
Explanation: The optimal solution is to remove the last three elements and the first two elements (5 operations in total) to reduce x to zero.

https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/description/?envType=daily-question&envId=2023-09-20
*/

/**
nums = [1,1,4,2,3], x = 5
 sum(2, 3)
 sum(1,1,4,2,3) = sum(1,1,4) + sum(2, 3)
 sum(1,1,4,2,3) = sum(1,1,4) + x
sum(1,1,4,2,3) - x = sum(1,1,4)
11 - x = sum(1,1,4)
6 = sum(1,1,4)


 [3,2,20,1,1,3], x = 10
 // Result is sum (3, 2, 1, 1, 3)
 sum(3,2,20,1,1,3) = sum(20) + sum(3, 2, 1, 2, 3)
 sum(3,2,20,1,1,3) = sum(20) + x
 sum(3,2,20,1,1,3) - x = sum(20)
 30 - 10 = sum(20)
 // We need to find the contiguos array that any other element in the array
 // is the amswer to our minimum operations
 */
// Time O(N)
// Space O(1)
var minOperations = function (nums, x) {
  let totalSum = nums.reduce((acc, currentVal) => acc + currentVal, 0);
  let target = totalSum - x;

  // Target sum is not possible
  if (target < 0) {
    return -1;
  }

  // We need all numbers in the array
  if (target === 0) {
    return nums.length;
  }

  let minOperations = Infinity;
  let currentSum = 0;
  let left = 0;
  let right = 0;
  while (right < nums.length) {
    currentSum += nums[right];
    right++;

    while (currentSum > target && left < nums.length) {
      currentSum -= nums[left++];
    }

    if (currentSum === target) {
      minOperations = Math.min(minOperations, nums.length - (right - left));
    }
  }
  return minOperations === Infinity ? -1 : minOperations;
};
