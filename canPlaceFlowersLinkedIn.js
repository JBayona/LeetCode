/*
You have a long flowerbed in which some of the plots are planted, and some are not.
However, flowers cannot be planted in adjacent plots.

Given an integer array flowerbed containing 0's and 1's, where 0 means empty and
1 means not empty, and an integer n, return if n new flowers can be planted in the 
flowerbed without violating the no-adjacent-flowers rule.

Example 1:
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true

Example 2:
Input: flowerbed = [1,0,0,0,1], n = 2
Output: false

https://leetcode.com/problems/can-place-flowers/
*/

var canPlaceFlowers = function (flowerbed, n) {
  let count = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    // Checl if the current pllot is empty
    if (flowerbed[i] === 0) {
      // Check whether left and right spaces are empty
      let isLeftEmpty = i === 0 || flowerbed[i - 1] === 0;
      let isRightEmpty = i === flowerbed.length - 1 || flowerbed[i + 1] === 0;
      // If boths are empty, we can plant a flower
      if (isLeftEmpty && isRightEmpty) {
        flowerbed[i] = 1;
        count++;
        if (count >= n) {
          return true;
        }
      }
    }
  }
  return count >= n;
};
