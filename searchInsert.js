/*
Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You may assume no duplicates in the array.

Here are few examples.
[1,3,5,6], 5 → 2
[1,3,5,6], 2 → 1
[1,3,5,6], 7 → 4
[1,3,5,6], 0 → 0


https://leetcode.com/problems/search-insert-position/description/
*/

var searchInsert = function(nums, target){
  for(let i = 0; i < nums.length; i++){
    if(target <= nums[i]){
      return i;
    }
  }
  return nums.length;
}

nums = [1,3,5,6];
target = 5;
console.log(searchInsert(nums, target));