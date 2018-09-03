/*
Given an array, rotate the array to the right by k steps, where k is non-negative.

Example 1:

Input: [1,2,3,4,5,6,7] and k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
Example 2:

Input: [-1,-100,3,99] and k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]

https://leetcode.com/problems/rotate-array/description/
*/

/*
Complexity O(n)
Space complexity O(n)
*/
function rotateRight(array, k) {
  let result = [];
  let index = 0;
  for(let i = 0; i < array.length; i++) {
    index = (k + i)%array.length;
    result[index] = array[i];
  }
  return result;
}

/*
Complexity O(n)
Space O(1)
Original List                   : 1 2 3 4 5 6 7
After reversing all numbers     : 7 6 5 4 3 2 1
After reversing first k numbers : 5 6 7 4 3 2 1
After revering last n-k numbers : 5 6 7 1 2 3 4 --> Result
*/
var rotateRightInPlace = function(nums, k) {
    // This may be greater
    k = k%nums.length;
    // Reverse all
    reverseArray(nums, 0, nums.length - 1);
    // Reverse first k elements
    reverseArray(nums, 0, k - 1);
    // Reverse last k elements
    reverseArray(nums, k, nums.length - 1);
    console.log(nums);
};

function reverseArray(array, start, end) {
    while(start < end) {
        let tmp = array[start];
        array[start] = array[end];
        array[end] = tmp;
        start++;
        end--;
    }
}