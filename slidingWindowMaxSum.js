/*
Given an array of integers of size ‘n’.
Our aim is to calculate the maximum sum possible for ‘k’ consecutive elements in the array.

Input  : arr[] = {100, 200, 300, 400}
         k = 2
Output : 700
*/

function slidingWindowBruteForce(array, k) {
  // Brute force
  let result = 0;
  for(let i = 0; i < array.length - k + 1; i++) {
    let currentSum = 0;
    for(let j = 0; j < k; j++) {
      currentSum += array[i+j];
    }
    result = Math.max(result, currentSum);
  }
  return result;
}

function slidingWindow(array, k) {
  let result = 0;
  let windowSum = 0;

  // Get the first k elements
  for(let i = 0; i < k; i++) {
    windowSum += array[i]
  }

  for(let i = k; i < array.length; i++) {
    windowSum = windowSum - array[i-k] + array[i];
    result = Math.max(windowSum, result);
  }
  return result;
}


array = [100, 200, 300, 400];
k = 2;
console.log(slidingWindowBruteForce(array, k));
console.log(slidingWindow(array, k));