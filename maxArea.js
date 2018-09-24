/*
Container With Most Water
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.

https://leetcode.com/problems/container-with-most-water/description/
*/

//O(N^2)
var maxArea = function(height) {
  let max;

  for(let i = 0; i < height.length; i++) {
    for(let j = i+1 j < height.length; j++) {
      let width = j - i;
      let min = Math.min(height[i], height[j])
      max = Math.max(max, width * min);
    }
  }

  return max;
}