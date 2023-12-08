/*
On a 2D plane, there are n points with integer coordinates points[i] = [xi, yi]. Return
the minimum time in seconds to visit all the points in the order given by points.

You can move according to these rules:
In 1 second, you can either:
move vertically by one unit,
move horizontally by one unit, or
move diagonally sqrt(2) units (in other words, move one unit vertically then one unit horizontally in 1 second).
You have to visit the points in the same order as they appear in the array.
You are allowed to pass through points that appear later in the order, but these do not count as visits.

https://leetcode.com/problems/minimum-time-visiting-all-points/description/?envType=daily-question&envId=2023-12-03
*/

// Find the minimum time required to visit all points, each second you can either move to
// the left, to the right and diagonal.
// Traveling diagional is the fastest way to do it, that's why we want to optimize the maximum
// difference between two points, the more we can more to either "x" or to "y", that will help
// us move in diagonal quicker
// The time is the maximum difference between differences in
var minTimeToVisitAllPoints = function (points) {
  let result = 0;
  for (let i = 0; i < points.length - 1; i++) {
    // Distance in x from x to next x
    let xDistance = Math.abs(points[i][0] - points[i + 1][0]);
    // Distance in y from y to next y
    let yDistance = Math.abs(points[i][1] - points[i + 1][1]);
    result += Math.max(xDistance, yDistance);
  }
  return result;
};
