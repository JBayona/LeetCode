/*
Given a collection of intervals, merge all overlapping intervals.

Example 1:
Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

Example 2:
Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

https://leetcode.com/problems/merge-intervals/
*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function(intervals) {
  if(!intervals.length) {
      return [];
  }
  
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  let prev = intervals[0];
  let result = [];
  for(let i = 1; i < intervals.length; i++) {
      let current = intervals[i];
      // No overlap exist
      if(current[0] > prev[1]) {
          result.push(prev);
          prev = current;
      } else {
          // Overlap exists
          // Get the first range, and the max of the current end or prev end
          let merged = [prev[0], Math.max(current[1], prev[1])];
          prev = merged
      }
  }
  
  // Add the last one
  result.push(prev);
  return result;
};

// Another option
var merge = function(intervals) {
  if(!intervals.length) {
      return [];
  }
  
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  let prev = intervals[0];
  let result = [];
  for(let i = 1; i < intervals.length; i++) {
      let current = intervals[i];
      // No overlap exist
      if(current[0] > prev[1]) {
          result.push(prev);
          prev = current;
      } else {
          // Overlap exists
          // Get the first range, and the max of the current end or prev end
          let merged = [prev[0], Math.max(current[1], prev[1])];
          prev = merged
      }
  }
  // Add the last one
  result.push(prev);
  return result;
};

// Updated
var merge = function(intervals) {
  let result = [];
  let index = null;

  if(!intervals || !intervals.length) {
    return [];
  }
  
  // Sort using start time as point of sorting
  // Use a comparator
  //[0] - Start time
  //[1] - End time
  intervals = intervals.sort((a,b) => a[0] - b[0]);

  let pre = intervals[0];
    for(let i = 0; i < intervals.length; i++){
      let curr = intervals[i];
      // If there´s no overlap, added
      if(curr[0] > pre[1]) {
          result.push(pre);
          pre = curr;
      } else{
          let merged = [pre[0], Math.max(pre[1], curr[1])];
          pre = merged;
      }
    }
  // The missing one
  result.push(pre);

  return result;
};

function Interval(start, end) {
  this.start = start;
  this.end = end;
}

var merge = function(intervals) {
  let result = [];

  if(!intervals || !intervals.length) {
    return [];
  }
  
  // Sort using start time as point of sorting
  // Use a comparator
  intervals = intervals.sort((a,b) => a.start - b.start);

  // Insert first element
  let pre = intervals[0];
  for(let i = 0; i < intervals.length; i++){
      let curr = intervals[i];
      // There´s no overlap
      if(curr.start > pre.end) {
          result.push(pre);
          pre = curr;
      } else{
          let merged = new Interval(pre.start, Math.max(pre.end, curr.end));
          pre = merged;
      }
  }
  // The missing one
  result.push(pre);

  return result;
};

// Time O(N Long N)
function Interval(start, end) {
  this.start = start;
  this.end = end;
}

var merge = function(intervals) {
  let result = [];
  let index = null;

  if(!intervals || !intervals.length) {
    return [];
  }
  
  // Sort using start time as point of sorting
  // Use a comparator
  intervals = intervals.sort((a,b) => a.start - b.start);

  // Index is used to control the index of our result array, regardless the current interval array
  for(let i = 0; i < intervals.length; i++) {
   if(!result.length) {
      result.push(intervals[i]);
      index = 0;
    } else if(intervals[i].start == result[index].end || intervals[i].start < result[index].end){
      // Here it means we have an overlap
      let tmp = result.pop();
      let start = Math.min(intervals[i].start, tmp.start);
      let end = Math.max(intervals[i].end, tmp.end);
      result.push(new Interval(start, end));
    } else {
      // No overlap
      result.push(intervals[i]);
      index++;
    }
  }
  return result;
};

// intervals = [new Interval(1,4), new Interval(0,2), new Interval(3,5)]; // [0,5]
// intervals = [new Interval(1,3), new Interval(2,6), new Interval(8,10), new Interval(15,18)]; 
//[[1,6],[8,10],[15,18]]
intervals = [new Interval(1,4), new Interval(4,5)]; //[[1,5]]
console.log(merge(intervals));
