/*
Follow up for "Remove Duplicates":
What if duplicates are allowed at most twice?

For example,
Given sorted array nums = [1,1,1,2,2,3],

Your function should return length = 5, with the first five elements of nums being 1, 1, 2, 2 and 3. 
It doesn't matter what you leave beyond the new length.

https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/
*/

var removeDuplicates = function(nums) {
  let index = 1;
  let duplicate = false;

  for(let i = 1; i < nums.length; i++){
    if(duplicate && nums[i] === nums[i-1]){
      continue;
    }

    if(nums[i] === nums[i-1]){
      duplicate = true;
    }else{
      duplicate = false;
    }

    nums[index] = nums[i];
    index++;
  }
  return nums;
};

nums = [1,1,1,2,2,3];
console.log(removeDuplicates(nums));