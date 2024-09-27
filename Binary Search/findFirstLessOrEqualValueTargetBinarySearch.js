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
  