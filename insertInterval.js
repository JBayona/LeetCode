/*
Given a set of non-overlapping intervals, insert a new interval into the
intervals (merge if necessary).
You may assume that the intervals were initially sorted according to their start times.

Example 1:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

https://leetcode.com/problems/insert-interval/
*/
// Time O(N)
var insert = function (intervals, newInterval) {
  let result = [];
  let i = 0;
  // Here we handle all of the non overlapping cases that we are sure
  // There's no overlap if the current interval end is less that the start
  // of the new interval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i++]);
  }

  // Combine all of the intervals, here we have an overlap
  // We want the new interval to be always greater, we are forcing the
  // interval start to be greater than the overlap to continue adding
  // more elements if any
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
  }

  //Add the result of the overlapping combined
  result.push(newInterval);

  // Add the rest of the cases we don´t match the conditions above
  while (i < intervals.length) {
    result.push(intervals[i++]);
  }

  return result;
};

// Interval class
function Interval(start, end) {
  this.start = start;
  this.end = end;
}

var insert = function (intervals, newInterval) {
  let result = [];
  let i = 0;

  // Here we handle all of the non overlapping cases that we are sure
  while (i < intervals.length && intervals[i].end < newInterval.start) {
    result.push(intervals[i++]);
  }

  // Add those overlaping scenarios
  while (i < intervals.length && intervals[i].start <= newInterval.end) {
    newInterval.start = Math.min(intervals[i].start, newInterval.start);
    newInterval.end = Math.max(intervals[i].end, newInterval.end);
    i++;
  }

  //Add the result of the overlapping
  result.push(newInterval);

  // Add the rest of the cases we don´t match the conditions above
  while (i < intervals.length) {
    result.push(intervals[i++]);
  }

  return result;
};

newInterval = new Interval(2, 5);
intervals = [new Interval(1, 3), new Interval(6, 9)];
console.log(insert(intervals, newInterval));
