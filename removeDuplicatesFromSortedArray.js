/*
Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this in place with constant memory.

For example,
Given input array nums = [1,1,2],

Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. 
It doesn't matter what you leave beyond the new length.

https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
*/


var removeDuplicates = function(nums){
  if(nums.length === 0) {
      return 0;
  }
  let index = 1;
  // First one is always unique
  for(let i = 1; i < nums.length; i++) {
      if(nums[index - 1] !== nums[i]) {
          nums[index++] = nums[i];
      }
  }
  return index;
};

var removeDuplicates = function(array){
  for(var i = 1; i < array.length; i++){
    if(array[i-1] === array[i]){
      array.splice(i,1)
      i= i-1;
    }
  }
  return array.length;
};

nums = [1,2];
console.log(removeDuplicates(nums));