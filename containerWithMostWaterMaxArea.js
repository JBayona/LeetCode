/*
Container With Most Water
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.

https://leetcode.com/problems/container-with-most-water/description/
*/

// Time O(N)
// Space O(1)
/*
Para maximixar el area debemos conservar ya sea el mayor x axis o mayor y
axis
*/
// Two pointers
// Time O(N)
// Space O(1)
var maxArea = function(height) {
  let i = 0;
  let j = height.length - 1;
  let max = 0;
  let h = 0;
  let width;
  
  while(i < j) {
      width = j - i;
      h = Math.min(height[i], height[j]);
      max = Math.max(max, h * width);
      // Move the pointer which is smaller because we want to
      // increase the area
      if(height[i] > height[j]) {
          j--;
      } else {
          i++;
      }
  }
  return max;
};

//Two pointers
var maxArea = function(height) {
    let max = 0;
    let i = 0;
    let j = height.length - 1;
    let width;
    
    while(i < j) {
        width = j - i;
        // El menor denota el height que podemos tomar
        let h = Math.min(height[i], height[j]);
        max = Math.max(max, width * h);
        if(height[i] > height[j]) {
            j--;
        } else {
            i++;
        }
    }
    
    return max;
};

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
