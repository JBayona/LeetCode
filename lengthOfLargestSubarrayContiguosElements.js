/*
Given an array of distinct integers, find length of the longest subarray which contains
numbers that can be arranged in a continuous sequence.

https://www.geeksforgeeks.org/length-largest-subarray-contiguous-elements-set-1/
*/

// Time complexity O(N^2)
// Space complexity O(1)
var lengthOfLargestSubarrayContiguosElements = function(array) {
  let result = 1;
  let min = 0;
  let max = 0;

  for(let i = 0; i < array.length - 1; i++) {
    min = array[i];
    max = array[i];
    for(let j = i + 1; j < array.length; j++) {
      min = Math.min(min, array[j]);
      max = Math.max(max, array[j]);

      if(max - min === j - i) {
        result = Math.max(result, max - min + 1);
      }
    }
  }
  return result;
}*/

// array = [10, 12, 11]; // Result 3
// array = [14, 12, 11, 20]; // Result 2
// array = [1, 56, 58, 57, 90, 92, 94, 93, 91, 45]; // Result 5
// console.log(lengthOfLargestSubarrayContiguosElements(array));

// Repeated elements are allowed
// Time complexity O(N^2)
var lengthOfLargestSubarrayContiguosElements = function(array) {
  let result = 1;
  let min = 0;
  let max = 0;

  for(let i = 0; i < array.length - 1; i++) {
    let hash = {};
    hash[array[i]] = true;

    min = array[i];
    max = array[i];
    for(let j = i + 1; j < array.length; j++) {

      // If current element is already in hash set, then 
      // this subarray cannot contain contiguous elements
      if(array[j] in hash) {
        break;
      }

      // If we reach here it means that our subarray doest not
      // have duplicate elements
      hash[array[j]] = true;

      min = Math.min(min, array[j]);
      max = Math.max(max, array[j]);

      if(max - min === j - i) {
        result = Math.max(result, max - min + 1);
      }
    }
  }
  return result;
}

// array = [10, 12, 11]; // Result 3
array = [10, 12, 12, 10, 10, 11, 10]; // Result 2
console.log(lengthOfLargestSubarrayContiguosElements(array));