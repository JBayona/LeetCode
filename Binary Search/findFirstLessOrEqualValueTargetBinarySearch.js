// Option 1
function findFirstLessOrEqual(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1; // Default if no valid element is found

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] <= target) {
      result = arr[mid]; // Update result as it's <= target
      left = mid + 1; // Search in the right half to find the largest <= target
    } else {
      right = mid - 1; // Search in the left half
    }
  }
  return result;
}

const arr = [1, 3, 5, 7, 9];
console.log(findFirstLessOrEqual(arr, 2)); // Output: 1
console.log(findFirstLessOrEqual(arr, 3)); // Output: 3
console.log(findFirstLessOrEqual(arr, 4)); // Output: 3
console.log(findFirstLessOrEqual(arr, 6)); // Output: 5
console.log(findFirstLessOrEqual(arr, 9)); // Output: 9
console.log(findFirstLessOrEqual(arr, 10)); // Output: 9



//  Option 2
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return arr[mid];
    }
    if (arr[mid] < target) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }

  return arr[left];
}

arr = [1, 2, 4, 5, 7];
console.log(binarySearch(arr, 2)); // 2
console.log(binarySearch(arr, 4)); // 4
console.log(binarySearch(arr, 6)); // 5
