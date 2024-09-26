/*
Follow up for "Remove Duplicates":
What if duplicates are allowed at most twice?

For example,
Given sorted array nums = [1,1,1,2,2,3],

Your function should return length = 5, with the first five elements of nums being 1, 1, 2, 2 and 3. 
It doesn't matter what you leave beyond the new length.

https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/
*/
// Time O(N)
var removeDuplicates = function(nums) {
  if (nums.length <= 2) {
      return nums.length;
  }
  // We don't care about the first two elements
  // as they might be or might not be duplicated
  let index = 2;
  for (let i = 2; i < nums.length; i++) {
      if (nums[index - 2] !== nums[i]) {
          nums[index] = nums[i];
          index++;
      }
  }
  return index;
};

nums = [1,1,1,2,2,3];
console.log(removeDuplicates(nums));