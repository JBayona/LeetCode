/*
Given an array of integers sorted in ascending order, find the starting and ending position of a given target value.

Your algorithm's runtime complexity must be in the order of O(log n).

If the target is not found in the array, return [-1, -1].

For example,
Given [5, 7, 7, 8, 8, 10] and target value 8,
return [3, 4].

https://leetcode.com/problems/search-for-a-range/description/
*/

// Option 1
function searchRange(nums, target) {
  return [findElement(nums, target, true), findElement(nums, target, false)];
}

function findElement(nums, target, isFirst) {
  let len = nums.length;
  let start = 0;
  let end = len - 1;
  let mid = 0;
  let bound = -1;
  /*Una vez que encontramos el numero deseado solo
  decrementamos el end hasta que sea mayor que start
  para romper el ciclo y verificar el resultado*/
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (nums[mid] === target) {
      bound = mid;
      if (isFirst) {
        end = mid - 1; // Search on the left
      } else {
        start = mid + 1; // Search on the right
      }
    } else if (nums[mid] > target) {
      end = mid - 1;
    } else if (nums[mid] < target) {
      start = mid + 1;
    }
  }
  return bound;
}

// Option 2
function searchRange(nums, target) {
  return [findLeftMost(nums, target), findRightMost(nums, target)];
}

function findLeftMost(nums, target) {
  let len = nums.length;
  let start = 0;
  let end = len - 1;
  /*Una vez que encontramos el numero deseado solo
    decrementamos el end hasta que sea mayor que start
    para romper el ciclo y verificar el resultado*/
  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (nums[mid] > target) {
      end = mid - 1;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      /*Aqui se decrementa hasta romper el ciclo*/
      end = mid - 1;
    }
  }
  if (start >= 0 && start < len && nums[start] === target) {
    return start;
  }
  return -1;
}

function findRightMost(nums, target) {
  let len = nums.length;
  let start = 0;
  let end = len - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (nums[mid] > target) {
      end = mid - 1;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      start = mid + 1;
    }
  }
  if (end >= 0 && end < len && nums[end] === target) {
    return end;
  }
  return -1;
}

nums = [5, 7, 7, 8, 8, 10];
target = 8;
console.log(searchRange(nums, target));
