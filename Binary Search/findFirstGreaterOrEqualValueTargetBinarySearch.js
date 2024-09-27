function findFirstGreaterOrEqual(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;  // Default if no valid element is found

  while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (arr[mid] >= target) {
          result = arr[mid];  // Update result as it's >= target
          right = mid - 1;  // Search in the left half for the first occurrence
      } else {
          left = mid + 1;  // Search in the right half
      }
  }

  return result;
}


const arr = [1, 3, 5, 7, 9];
console.log(findFirstGreaterOrEqual(arr, 5));  // Output: 5
console.log(findFirstGreaterOrEqual(arr, 6));  // Output: 7
console.log(findFirstGreaterOrEqual(arr, 2));  // Output: 3
console.log(findFirstGreaterOrEqual(arr, 1));  // Output: 1
console.log(findFirstGreaterOrEqual(arr, 10));  // Output: -1
console.log(findFirstGreaterOrEqual(arr, 8));  // Output: 9
console.log(findFirstGreaterOrEqual(arr, 9));  // Output: 9
