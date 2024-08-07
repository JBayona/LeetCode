/*
You are given an array nums that consists of non-negative integers. Let us define rev(x)
as the reverse of the non-negative integer x. For example, rev(123) = 321, and rev(120) = 21. A pair of indices (i, j) is nice if it satisfies all of the following conditions:

0 <= i < j < nums.length
nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])
Return the number of nice pairs of indices. Since that number can be too large, return it modulo 109 + 7.

Example 1:
Input: nums = [42,11,1,97]
Output: 2
Explanation: The two pairs are:
 - (0,3) : 42 + rev(97) = 42 + 79 = 121, 97 + rev(42) = 97 + 24 = 121.
 - (1,2) : 11 + rev(1) = 11 + 1 = 12, 1 + rev(11) = 1 + 11 = 12.

 Example 2:
Input: nums = [13,10,35,24,76]
Output: 4

https://leetcode.com/problems/count-nice-pairs-in-an-array/description/
*/

/*
 The condition can be arranged to be
 nums[i] - rev(nums[i]) = nums[j] - rev(nums[j])
 */
var countNicePairs = function (nums) {
  let mod = 10 ** 9 + 7;
  let map = {};
  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    let n = nums[i] - reverse(nums[i]);
    // If we have a number before it means we have
    // started to get pairs so we increment them before increasing
    if (n in map) {
      result += map[n];
      map[n]++;
    } else {
      map[n] = 1;
    }
  }
  return result % mod;
};

function reverse(n) {
  let result = 0;
  while (n) {
    result = result * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  return result;
}
