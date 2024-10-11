/*
A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width
of such a ramp is j - i.

Given an integer array nums, return the maximum width of a ramp in nums. If there is
no ramp in nums, return 0.
Example 1:
Input: nums = [6,0,8,2,1,5]
Output: 4
Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.

Example 2:
Input: nums = [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.

https://leetcode.com/problems/maximum-width-ramp/description
*/

// Option 1
// Monotonic stack
// Approach:
// Build a monotonic stack with decreasing element indexes
// Traverse from nums right to left, this will already guarantee that i < j and
// if the number of right is greater than the top of the stack, we try to maximize results
// Time O(N)
var maxWidthRamp = function (nums) {
  let stack = [];
  // Push a monotonic stack, whenever the stack is empty or we have smaller
  // values that the top of the stack
  for (let i = 0; i < nums.length; i++) {
    if (stack.length === 0 || nums[i] < nums[stack[stack.length - 1]]) {
      stack.push(i);
    }
  }

  // Get the maximum element traversing from right to left making sure that j > i and
  // whenever we find a max, we try to update the result
  let result = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length && nums[i] >= nums[stack[stack.length - 1]]) {
      let pop = stack.pop();
      result = Math.max(result, i - pop);
    }
  }
  return result;
};

// Option 2
// Sorting
var maxWidthRamp = function (nums) {
  let index = [];
  for (let i = 0; i < nums.length; i++) {
    index[i] = i;
  }

  // Custom sort based on values
  // index is sorted by the indexes of the elements with lower value
  // if the values are the same, it's honored
  index.sort((a, b) => (nums[a] !== nums[b] ? nums[a] - nums[b] : a - b));

  // Minimum index encountered so far, a big index to start the base case
  let minIndex = Infinity;
  let result = 0;
  // Calculate maximum width ramp
  for (let i = 0; i < index.length; i++) {
    result = Math.max(result, index[i] - minIndex);
    minIndex = Math.min(minIndex, index[i]);
  }

  return result;
};

// Brute Force
var maxWidthRamp = function (nums) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] <= nums[j]) {
        result = Math.max(result, j - i);
      }
    }
  }
  return result;
};

// Recursion
var maxWidthRamp = function (nums) {
  let start = 0;
  let end = nums.length - 1;
  let result = { n: 0 };
  helper(start, end, nums, result);
  return result.n;
};

function helper(start, end, nums, result) {
  // Base case
  if (start >= end) {
    return;
  }
  let num1 = nums[start];
  let num2 = nums[end];
  if (num2 >= num1) {
    result.n = Math.max(result.n, end - start);
  }
  // Try all scenarios to see which option can get the latest result
  helper(start + 1, end, nums, result);
  helper(start, end - 1, nums, result);
  helper(start + 1, end - 1, nums, result);
}
