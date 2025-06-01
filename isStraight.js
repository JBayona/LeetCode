/*
Example 1:
Input: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
Output: true

Example 2:
Input: coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
Output: false

https://leetcode.com/problems/check-if-it-is-a-straight-line
*/

var checkStraightLine = function (coordinates) {
  if (coordinates.length === 2) {
    return true;
  }

  for (let i = 2; i < coordinates.length; i++) {
    if (!isStraight([coordinates[0], coordinates[1], coordinates[i]])) {
      return false;
    }
  }

  return true;
};

var isStraight = function ([[ax, ay], [bx, by], [cx, cy]]) {
  return (by - ay) * (cx - bx) === (cy - by) * (bx - ax);
};
