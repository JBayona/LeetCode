/*
Given an array of meeting time intervalsof start and end times [[s1,ed], [s2, e2]..] determine if a person coudld attend al meetings

https://leetcode.com/problems/meeting-rooms/
https://www.youtube.com/watch?v=i2bBG7CaVxs
https://github.com/JBayona/Facebook-Interview-Coding-1/blob/master/253.%20Meeting%20Rooms%20II.java
*/

// Greedy algorithm
var canAttendMeetings = function(intervals) {
    // Sort the intervals per end time so we can check if collapses
    let sorted = intervals.sort((a,b) => a.end - b.end);
  
    for(let i = 1 ; i < intervals.length; i++) {
        if(sorted[i].start < sorted[i-1].end) {
            return false;
        }
    }
  
  return true;
};

var canAttendMeetings = function(intervals) {
    // Sort the intervals per end time so we can check if collapses
    let sorted = intervals.sort((a,b) => a.start - b.start);
  
    for(let i = 1 ; i < intervals.length; i++) {
        if(sorted[i].start < sorted[i-1].end) {
            return false;
        }
    }
  
  return true;
};

//intervals = [{start: 0, end: 30}, {start: 5, end: 10}, {start: 15, end: 20}]; // false
intervals = [{start: 7, end: 10}, {start: 2, end: 4}]; // true
console.log(canAttendMeetings(intervals));

// Opción 2
var canAttendMeetings = function(intervals) {
    // Sort the intervals per end time so we can check if collapses
    let starts = [];
    let ends = [];

    for(let i = 0; i < intervals.length; i++) {
        starts[i] = intervals[i].start;
        ends[i] = intervals[i].end;
    }
  
    for(let i = 0 ; i < intervals.length - 1; i++) {
        if(start[i + 1] < ends[i]) {
            return false;
        }
    }
  
  return true;
};

// Meeting rooms 2

/*
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] find the minimum number of conference rooms required.
*/

// Opción 1
// Greedy
function minMeetingRooms(intervals) {
  if(invervals.length ===  0 || !intervals) {
    return 0;
  }
  
  let starts = [];
  let ends = [];
  
  for(let i = 0; i < intervals.length; i++) {
    starts[i] = intervals[i].start;
    ends[i] = intervals[i].end;
  }
  
  starts.sort();
  ends.sort();
  
  let count = 0;
  let end = 0;
  for(let i = 0; i < intervals.length; i++) {
   if(start[i] < ends[end]) {
     count++;
    } else {
     end++;
    }
  }
  
  return count = 0;
  
}