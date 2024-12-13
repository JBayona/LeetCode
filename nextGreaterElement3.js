/*
Given a positive integer n, find the smallest integer which has exactly the same digits
existing in the integer n and is greater in value than n. If no such positive integer exists, return -1.

Note that the returned integer should fit in 32-bit integer, if there is a valid answer but
it does not fit in 32-bit integer, return -1.

Example 1:
Input: n = 12
Output: 21

Example 2:
Input: n = 21
Output: -1

https://leetcode.com/problems/next-greater-element-iii/description
*/
// Time O(N LogN)
// Space O(1)
// Edge cases
// 1) If all digits are sorted in descending order, the result is not possible
// 2) If all digits are in ascending order, then we need to swap the las two
// digits for example 1234
// 3) For other cases, we need to process the number from the right most side because
// we need to find the smallest of all greater numbers.
var nextGreaterElement = function (number) {
  // Convert number to a string to safely handle large numbers
  const nums = String(number).split("").map(Number);
  const n = nums.length;
  if (n == 1) return -1;
  let i = n - 2;
  // Find the first decreasing element from the right
  while (i >= 0 && nums[i + 1] <= nums[i]) {
    i--;
  }

  // If there's a result
  if (i >= 0) {
    let j = n - 1;
    // Find the smallest element larger than nums[i] from the right
    while (nums[j] <= nums[i]) {
      j--;
    }
    swap(nums, i, j); // Swap elements to form the next permutation
  }

  reverse(nums, i + 1); // Reverse the remaining part to get the smallest permutation

  const nextPermutedNumber = Number(BigInt(nums.join("")));
  if (nextPermutedNumber < number || nextPermutedNumber == number) return -1;
  // Check if the result exceeds the 32-bit integer range or is less than the input
  return nextPermutedNumber > 2147483647n ? -1 : nextPermutedNumber;
};

function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}

function reverse(nums, start) {
  let end = nums.length - 1;
  while (start < end) {
    swap(nums, start++, end--);
  }
}
