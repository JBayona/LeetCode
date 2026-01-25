/*
Given an array and a value, remove all instances of that value in place and return the new length.
Do not allocate extra space for another array, you must do this in place with constant memory.
The order of elements can be changed. It doesn't matter what you leave beyond the new length.

Example:
Given input array nums = [3,2,2,3], val = 3

Your function should return length = 2, with the first two elements of nums being 2.

https://leetcode.com/problems/remove-element/description/

*/
// Option 1
// Time O(N)
// Space O(1)
var removeElement = function (nums, val) {
  let index = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      let tmp = nums[index];
      nums[index] = nums[i];
      nums[i] = tmp;
      index++;
    }
  }
  return index;
};

// Not optimal.
const removeElements = function (nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i -= 1;
    }
  }
  return nums;
};

array = [3, 3];
val = 3;
console.log(removeElements(array, val));
