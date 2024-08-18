/*
Given n non-negative integers representing an elevation map where the width of each
bar is 1, compute how much water it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9

https://leetcode.com/problems/trapping-rain-water/description/
*/
var trap = function (array) {
  let left = [];   
  let right = [];
  let max = 0;
  let result = 0;

  // Check left
  for (let i = 0; i < array.length; i++) {
    max = Math.max(max, array[i]);
    left[i] = max;
  }

  max = 0;
  //Check right
  for (let i = array.length - 1; i >= 0; i--) {
    max = Math.max(max, array[i]);
    right[i] = max;
  }
  // console.log(left);
  // console.log(right);

  //Get result
  for (let i = 0; i < array.length; i++) {
    result += Math.min(left[i], right[i]) - array[i];
  }

  return result;
};

/*
var trap = function(height) {
  let i = 0;
  let left_max = height[0];
  let sum = 0;
  let j = height.length - 1;
  let right_max = height[j];
  while (i < j) {
      if (left_max <= right_max) {
          sum += left_max - height[i];
          i++;
          left_max = Math.max(left_max, height[i]);
      } else {
          sum += right_max - height[j];
          j--;
          right_max = Math.max(right_max, height[j]);
      }
  }
  return sum;
}
*/
