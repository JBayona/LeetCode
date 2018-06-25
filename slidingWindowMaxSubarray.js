/*
Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right.
You can only see the k numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.
https://leetcode.com/problems/sliding-window-maximum/description/
*/

//Opcion 1
// O(n*k)
function slidingWindowMax(array, k) {
  let result = [];
  let max = 0;
  for(let i = 0; i <= array.length - k; i++) {
    for(let j = 0; j < k; j++) {
      max = Math.max(max, array[i+j]);
    }
    result.push(max);
  }
  return result;
}

array = [1, 2, 3, 1, 4, 5, 2, 3, 6];
k = 3;
console.log(slidingWindowMax(array,k));
