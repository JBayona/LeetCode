/*
Given a collection of numbers, nums, that might contain duplicates, return all
possible unique permutations in any order.

Example 1:
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]

 Example 2:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

https://leetcode.com/problems/permutations-ii/
*/

var permuteUnique = function(nums) {
  let hash = {};
  let set = new Set();
  dfs(nums, hash, [], set);
  
  // Format result
  let result = [];
  for(let op in hash) {
      result.push(op.split(','));
  }
  return result;
};

function dfs(nums, hash, list, set) {
  if(list.length === nums.length){
      hash[list] = true;
  }
  for (let i = 0; i < nums.length; i++) {
      if (set.has(i)) {
          continue;
      }
      list.push(nums[i]);
      set.add(i);
      dfs(nums, hash, list, set);
      list.pop();
      set.delete(i);
  }
}