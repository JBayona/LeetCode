/*
Given a list and a target, return true if we can use either + or * to meet the
target, for example [3, 2, 5] and 25, it should be true as 3 + 2 * 5 = 5 * 5 = 25
Rules:
1. We could either skip or use the current number.
2. Operator of precedence does not matter

https://leetcode.com/problems/expression-add-operators/description/
*/

function canTarget(nums, target) {
  let current = 0;
  let index = 0;
  return dfs(nums, index, target, current);
}

function dfs(nums, index, target, current) {
  // Base case, we have considered all numbers
  if (index === nums.length) {
    return current === target;
  }

  // Recursive case: Explore all possibilities
  const num = nums[index];
  // Skip the current number
  if (dfs(nums, index + 1, target, current)) {
    return true;
  }
  // Add the current number
  if (dfs(nums, index + 1, target, current + num)) {
    return true;
  }
  // Multiply with the currenr number
  if (dfs(nums, index + 1, target, current * num)) {
    return true;
  }
  // None of these worked
  return false;
}

console.log(canTarget([3, 2, 5], 25)); // true
console.log(canTarget([3, 2, 5], 10)); // true
