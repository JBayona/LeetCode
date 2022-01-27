/*
Given a set of distinct integers, nums, return all possible subsets.

Note: The solution set must not contain duplicate subsets.

For example,
If nums = [1,2,3], a solution is:

[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]

https://leetcode.com/problems/subsets/description/

*/

// Time O(N×2^N)
// Space O(N)
var subsets = function(nums) {
  let tmp = [];
  let result = [];
  let index = 0;
  helper(index, tmp, result, nums);
  return result;
};

function helper(index, tmp, result, nums) {
  // Add the element of the subset
  result.push(tmp);
  for(let i = index; i < nums.length; i++) {
      tmp.push(nums[i]);
      helper(i+1, tmp.concat(), result, nums);
      tmp.pop();
  }
}

nums = [1,2,3]
console.log(subsets(nums));
