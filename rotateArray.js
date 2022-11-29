/*
Given an array, rotate the array to the right by k steps, where k is non-negative.

Example 1:
Input: [1,2,3,4,5,6,7] and k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]

Example 2:
Input: [-1,-100,3,99] and k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]

Note:
Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
Could you do it in-place with O(1) extra space?

https://leetcode.com/explore/featured/card/top-interview-questions-easy/92/array/646/
https://www.youtube.com/watch?v=gmu0RA5_zxs

We’re given an array of integers, nums. Rotate the array by n elements, where n is an integer:

For positive values of n, perform a right rotation.
For negative values of n, perform a left rotation.
Make sure we make changes to the original array.
*/

// Supports left and right rotation
let rotateArray = function (nums, n) {
  let len = nums.length;

  // Normalizing the 'n' rotations
  n = n % len;
  if (n < 0) {
    // calculate the positive rotations needed.
    n = n + len;
  }
  // Let's partition the array based on rotations 'n'.
  reverseArray(nums, 0, len - 1);
  reverseArray(nums, 0, n - 1);
  reverseArray(nums, n, len - 1);
};

let reverseArray = function (nums, start, end) {
  while (start < end) {
    let temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
};

// Second option

var rotate = function (nums, k) {
  // Left = ((0 - k) + nums.length)%k
  k = k % nums.length;

  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
};

function reverse(nums, start, end) {
  while (start < end) {
    let tmp = nums[start];
    nums[start] = nums[end];
    nums[end] = tmp;
    start++;
    end--;
  }
}
