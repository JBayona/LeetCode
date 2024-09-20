/*
Given a list and a target, return true if we can use either + or * to meet the
target, for example [3, 2, 5] and 25, it should be true as 3 + 2 * 5 = 5 * 5 = 25
Rules:
1. We need to use all elements.
2. Operator of precedence does not matter

https://leetcode.com/problems/expression-add-operators/description/
*/


function canTarget(nums, target) {
  let current = 0;
  let index = 0;
  return dfs(nums, index, target, current);
}

function dfs(nums, index, target, current) {
  if (index === nums.length) {
    if (current === target) {
      return true;
    }
    return false;
  }
  for (let i = index; i < nums.length; i++) {
    if (index === 0) {
      return dfs(nums, i + 1, target, nums[index]);
    } else {
      return dfs(nums, i + 1, target, current + nums[index]) || dfs(nums, i + 1, target, current * nums[index]);
    }
  }
}

console.log(canTarget([3, 2, 5], 25));