/*
Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

For example:
A = [2,3,1,1,4], return true.

A = [3,2,1,0,4], return false.


https://leetcode.com/problems/jump-game/description/
*/

var canJump = function(nums){
  var len = nums.length;
  var cover = 0;
    
  for(var i = 0; i < len; i++) {
      if (cover >= i) {
          cover = Math.max(cover, nums[i] + i);
          if (cover >= len - 1) {
              return true;
          }
      } else {
          return false;
      }
  }
}

var array = [2,3,1,1,4];
console.log(canJump(array));