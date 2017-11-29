/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it is able to trap after raining.

For example, 
Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.


The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. 
In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

https://leetcode.com/problems/trapping-rain-water/description/
*/

var trap = function(height){
  let left = [];
  let right = [];
  let count = 0;
  let max = 0;
  let result = 0;

  //Left max
  for(let i = 0; i < height.length; i++){
    max = Math.max(max, height[i]);
    left[i] = max;
  }
  //Reset max
  max = 0;
  for(let i = height.length-1; i >= 0; i--){
    max = Math.max(max, height[i]);
    right[i] = max;
  }
  //Get result
  for(let i = 0; i < height.length; i++){
    result += Math.min(left[i], right[i]) - height[i];
  }
  return result;
}

height = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log(trap(height));