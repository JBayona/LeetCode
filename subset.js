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

// Option 1
// Backtrack
var subsets = function(nums) {
  if(nums.length === 0) return result;
  //In case is not sorted
  /*Asi no habra duplicados*/
  nums.sort((a,b) => a-b);
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

// Option 2
var subsets = function(nums) {
  var result = [];
  if(nums.length === 0) return result;
  //In case is not sorted
  /*Asi no habra duplicados*/
  nums.sort((a,b) => a-b);
  helper(result, [], 0, nums.length-1, nums);
  return result;
};

function helper(result, currArr, start, end, nums){
  result.push(currArr);
  for(let i = start; i <= end; i++){
    currArr.push(nums[i]);
    helper(result, currArr.concat(), i+1, end, nums);
    currArr.pop();
  }
}

nums = [1,2,3]
console.log(subsets(nums));
