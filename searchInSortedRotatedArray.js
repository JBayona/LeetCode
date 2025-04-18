/*
Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
(i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
You are given a target value to search. If found in the array return its index, otherwise return -1.
You may assume no duplicate exists in the array.

https://leetcode.com/problems/search-in-rotated-sorted-array/description/
*/
// Option 1
var search = function (nums, target) {
  // Find the pivot where the rotation ends
  let pivot = find(nums, 0, nums.length - 1);

  // We are looking for the pivot
  if (nums[pivot] === target) {
    return pivot;
  }

  // The array is already sorted so we just need to run a normal Binary Search
  // in the entire array
  if (pivot === -1) {
    return binarySearch(nums, target, 0, nums.length - 1);
  }

  // if our first element is less than target just apply binary
  // search in first part of array with respect to pivot
  if (nums[0] <= target) {
    return binarySearch(nums, target, 0, pivot - 1);
  }

  // run the binary search in the right side starting from the pivot
  return binarySearch(nums, target, pivot + 1, nums.length - 1);
};

function find(nums, start, end) {
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
    if (nums[mid] <= nums[start]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}

function binarySearch(nums, target, start, end) {
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  // Target not found
  return -1;
}

// Option 2
var search = function (nums, target) {
  //we have to search for the element where the rotation end
  let pivot = find(nums, target, 0, nums.length - 1);

  //if the element we find is -1 so, we know that array is already sorted order
  //so just apply binary search for the whole array
  if (pivot == -1) {
    return binarySearch(nums, target, 0, nums.length - 1);
  }
  //if the pivot element itself the target element just return it
  if (nums[pivot] == target) {
    return pivot;
  }
  //if our first element is less than target just apply binary
  //search in first part of array with respect to pivot
  if (nums[0] <= target) {
    return binarySearch(nums, target, 0, pivot - 1);
  }
  //apply binary search in second part of the array
  return binarySearch(nums, target, pivot + 1, nums.length - 1);
};

const find = function (a, k, start, end) {
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    //if our mid go to the element where the element itself greater
    //than its next element than it will be our pivot
    //in second case if the element pre element is greater than mid
    //than our mid-1 element is pivot
    if (mid < end && a[mid] > a[mid + 1]) {
      return mid;
    }
    if (mid > start && a[mid - 1] > a[mid]) {
      return mid - 1;
    }
    //if our mid element is smaller than start then the case happen
    //where element of left hand side have one element that is pivot
    //if it is bigger than the pivot element lies in right hand side
    //of the array
    if (a[mid] <= a[start]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
};

const binarySearch = function (a, k, start, end) {
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (a[mid] > k) {
      end = mid - 1;
    } else if (a[mid] < k) {
      start = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
};

// Option 2
var search = function (nums, target) {
  var start = 0;
  var end = nums.length - 1;
  var mid = 0;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[start] <= nums[mid]) {
      // left side sorted
      if (nums[mid] > target && nums[start] <= target) {
        /*Si el subarray izquierdo esta ordenado, es facil saber
        si el elemento se encuentra en esa mitad*/
        // nums[mid] !== target, can safely do end = mid - 1
        end = mid - 1;
      } else {
        //Recorta la seccion a analizar
        start = mid + 1;
      }
    } else {
      // right side sorted
      /*Si no esta ordenado la parte izquierda, la derecha
      debe de estar ordenada*/
      if (nums[mid] < target && nums[end] >= target) {
        // nums[mid] !== target, can safely do start = mid + 1
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
};

array = [4, 5, 6, 7, 0, 1, 2];
target = 3;
console.log(search(array, target));

//Opcion 3
var search = function (nums, target) {
  let map = {};
  if (nums.length === 0) return -1;
  nums.forEach((item, index) => (map[item] = index));
  console.log(map);
  //Return result;
  if (target in map) {
    return map[target];
  } else {
    return -1;
  }
};
