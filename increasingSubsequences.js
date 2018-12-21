/*
Given an integer array, your task is to find all the different possible increasing subsequences of the given array, and the length of an increasing subsequence should be at least 2 .

Example:
Input: [4, 6, 7, 7]
Output: [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]
Note:
The length of the given array will not exceed 15.
The range of integer in the given array is [-100,100].
The given array may contain duplicates, and two equal integers should also be considered as a special case of increasing sequence.

https://leetcode.com/problems/increasing-subsequences/

*/

var findSubsequences = function(nums) {
  let result = [];
  let tmp = [];
  let hash = {};
  let start = 0;
  helper(result, tmp, start, nums, hash);
  return result;
};

function helper(result, tmp, start, nums, hash) {
  if(tmp.length >= 2) {
    // Verify there's no duplicates
    if(!(tmp.join('') in hash)) {
      hash[tmp.join('')] = true
      // concat() to lose reference
      result.push(tmp.concat());
   }
  }

  for(let i = start; i < nums.length; i++) {
    // This will allow us to have sequence, greater than the past element
    if(tmp.length !== 0 && tmp[tmp.length - 1] > nums[i]) continue;
    tmp.push(nums[i]);
    helper(result, tmp, i + 1, nums, hash);
    tmp.pop();
  }
}

array = [4, 6, 7, 7];
// array = [4,3,2,1];
console.log(findSubsequences(array));