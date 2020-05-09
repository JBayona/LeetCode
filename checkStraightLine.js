/*
You are given an array coordinates, coordinates[i] = [x, y], where [x, y] represents the coordinate of a point.
Check if these points make a straight line in the XY plane.

Example 1:

Input: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
Output: true
Example 2:

Input: coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
Output: false

https://leetcode.com/problems/check-if-it-is-a-straight-line/
https://www.youtube.com/watch?v=f2n9NOkqvZQ
*/

var checkStraightLine = function(coordinates) {
    let points = coordinates.length;
    let xDiff = Math.abs(coordinates[1][0] - coordinates[0][0]);
    let yDiff = Math.abs(coordinates[1][1] - coordinates[0][1]);
    let currXDiff = 0;
    let currYDiff = 0;
    
    for(let i = 2; i < coordinates.length; i++) {
        currXDiff = Math.abs(coordinates[i][0] - coordinates[i-1][0]);
        currYDiff = Math.abs(coordinates[i][1] - coordinates[i-1][1]);
        if(yDiff * currXDiff != xDiff * currYDiff) {
            return false;
        }
    }
    return true;
};