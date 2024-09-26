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

// Option 1
// Pivot: https://leetcode.com/problems/search-in-rotated-sorted-array-ii/solutions/5298223/pivot-find-minimum-rotated-sorted-1/
// Time O(LogN)
var search = function(nums, target) {
    // Find the pivot where the rotation ends
    let pivot = findPivotWithDuplicates(nums, 0, nums.length - 1);

    // We are looking for the pivot
    if(nums[pivot] === target) {
        return true;
    }

    // The array is already sorted so we just need to run a normal Binary Search
    // in the entire array
    if (pivot === -1) {
        return binarySearch(nums, target, 0, nums.length - 1);
    }

    return binarySearch(nums, target, 0, pivot) || binarySearch(nums, target, pivot + 1, nums.length - 1);
};

// Pivot the one before flips
function findPivotWithDuplicates(nums, start, end) {
    let n = nums.length;
    // Skip all duplicates
    while (start < n - 1 && nums[start] == nums[start + 1]) {
        start++;
    }
    while (end > 0 && nums[end] == nums[end - 1]) {
        end--;
    }
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        // If any of the next two conditions is met, then that's 
        // the pivot
        if (mid < end && nums[mid] > nums[mid + 1]) {
            return mid;
        }
        if (mid > start && nums[mid - 1] > nums[mid]) {
            return mid - 1;
        }
        // If nums[mid] <= nums[start] it means that the left side is the
        // rotated part and the mid might also be the pivot, example
        // [4 5 6 0 1 2 3] -> 0 is the mid
        // If this condition is not met, then, the right side is the one
        // where the target is
        if(nums[mid] <= nums[start]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return -1;
}

function binarySearch(nums, target, start, end) {
    while(start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] === target) {
            return true;
        }
        if (nums[mid] < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    // Target not found
    return false;
}


// Option 2
// Time O(LogN)
var search = function(nums, target) {
    let start = 0;
    let end = nums.length - 1;
        
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] === target || nums[start] === target || nums[end] === target) {
            return true;
        }
        // Target on right
        if (target > nums[mid] && target < nums[end]) {
            start = mid + 1;
        } else if (target < nums[mid] && target > nums[start]) {
            // Target on lleft
            end = mid - 1;
        } else {
            start++;
            end--;
        }
    }
    return false;
};

// Option 1
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