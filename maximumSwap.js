/*
Given a non-negative integer, you could swap two digits at most once to get the maximum
valued number. Return the maximum valued number you could get.

Example 1:
Input: 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.

Example 2:
Input: 9973
Output: 9973
Explanation: No swap.

https://leetcode.com/problems/maximum-swap/
*/

// Time O(N)
// Space O(1)
// 1. Find the increasing pivot point
// 2. Find the largest element after the pivot point
// 3. Swap the first occurrance of the smallest element from left to maxIndex
var maximumSwap = function(num) {
  let nums = num.toString().split('');
  let isIncreasing = false;
  let maxIndex = 0;
  
  for(let i = 1; i < nums.length; i++) {
    if(nums[i] > nums[i-1] && ! isIncreasing) {
      isIncreasing = true;
      maxIndex = i;
    }
    
    if(isIncreasing && nums[i] >= nums[maxIndex]) {
      maxIndex = i;
    }
  }
  
  // If there´s no increase, return the number as we can
  // no swap it
  if(!isIncreasing) {
    return num;
  }
  
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] < nums[maxIndex]) {
      // Swap
      let tmp = nums[i];
      nums[i] = nums[maxIndex];
      nums[maxIndex] = tmp;
      break;
    }
  }
  
  return Number(nums.join(''));
};