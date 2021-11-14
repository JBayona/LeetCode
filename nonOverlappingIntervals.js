/*
Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Example 1:
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1

Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

Example 2:
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.

Example 3:
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.

https://leetcode.com/problems/non-overlapping-intervals/
*/

// Time O(N)
var eraseOverlapIntervals = function(intervals) {
    // Sorted based on the start interval
    intervals.sort((a,b) => a[0] - b[0]);
    let prevEnd = intervals[0][1];
    let count = 0;
    
    for(let i = 1; i < intervals.length; i++) {
        // If current start is less than prev end, it means that we
        // have an overlap
        if(intervals[i][0] < prevEnd) {
            count++;
            prevEnd = Math.min(prevEnd, intervals[i][1]);
        } else {
            prevEnd = intervals[i][1];
        }
    }
    return count;
};

// Option 2
var eraseOverlapIntervals = function(intervals) {
  // Sort based on start
  let sorted = intervals.sort((a,b) => a[0] - b[0]);
  let prevEnd = sorted[0][1]; // Save the latest end
  
  let count = 0;
  for(let i = 1; i < sorted.length; i++) {
      // if current interval start is less than prev interval end => overlap!
      if(sorted[i][0] < prevEnd) {
          count++;
          prevEnd = Math.min(prevEnd, sorted[i][1]);
      } else {
          prevEnd = sorted[i][1];
      }
  }
  return count;
};
