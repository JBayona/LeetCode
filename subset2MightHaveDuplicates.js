/*
Given a collection of integers that might contain duplicates, nums, return all possible subsets.

Note: The solution set must not contain duplicate subsets.

For example,
If nums = [1,2,2], a solution is:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]

https://leetcode.com/problems/subsets-ii/description/
*/
// Time O(2^N)
// Space O(N)
var subsetsWithDup = function (nums) {
  if (nums.length === 0) {
    return [];
  }
  // Sort the array, that way we won't
  // get duplicate elements
  nums.sort((a, b) => a - b);
  let result = [];
  let tmp = [];
  let start = 0;
  helper(nums, tmp, result, start);
  return result;
};

function helper(nums, tmp, result, start) {
  result.push(tmp);
  for (let i = start; i < nums.length; i++) {
    // Skip duplicates
    if (i > start && nums[i] === nums[i - 1]) {
      continue;
    }
    tmp.push(nums[i]);
    helper(nums, tmp.concat(), result, i + 1);
    // Backtrack
    tmp.pop();
  }
}

nums = [1, 2, 2];
console.log(subsetsWithDup(nums));
