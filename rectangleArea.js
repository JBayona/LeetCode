/*
Given the coordinates of two rectilinear rectangles in a 2D plane, return the
total area covered by the two rectangles.

The first rectangle is defined by its bottom-left corner (ax1, ay1) and its top-right corner (ax2, ay2).

The second rectangle is defined by its bottom-left corner (bx1, by1) and its top-right corner (bx2, by2).

https://leetcode.com/problems/rectangle-area/description/
*/

var computeArea = function(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  let rectangle1Area = (ax2 - ax1) * (ay2 - ay1);
  let rectangle2Area = (bx2 - bx1) * (by2 - by1);
  
  // Get the intersection, if there's no intersection it will be 0.
  let intersectionX = Math.max((Math.min(ax2, bx2) - Math.max(ax1, bx1)), 0);
  let intersectionY = Math.max((Math.min(ay2, by2) - Math.max(ay1, by1)), 0);
  let intersectionArea = intersectionX * intersectionY;
  
  return rectangle1Area + rectangle2Area - intersectionArea;
};