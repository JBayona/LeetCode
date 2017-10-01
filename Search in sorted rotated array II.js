/*
Follow up for "Search in Rotated Sorted Array":
What if duplicates are allowed?

Would this affect the run-time complexity? How and why?
Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

Write a function to determine if a given target is in the array.

The array may contain duplicates.

https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/
*/

var search = function(nums, target) {
  let start = 0,
  let end = nums.length - 1,
  let mid;
        
  while (start <= end) {
      mid = parseInt((start + end) / 2);
      
      if (nums[mid] === target) {
          return true;
      }
      
      if (nums[mid] < nums[end]) { // right half sorted
          if (nums[mid] < target && nums[end] >= target) {
              start = mid + 1;
          } else {
              end = mid - 1;
          }
      } else if (nums[mid] > nums[end]) { // left half sorted
          if (nums[mid] > target && nums[start] <= target) {
              end = mid - 1;
          } else {
              start = mid + 1;
          }
      } else { // don't know which half is sorted
          end--;
      }
  }
  return false;
};

nums = [4, 5, 6, 7, 0, 1, 2];
console.log(removeDuplicates(search));