/*
Given an array of meeting time intervalsof start and end times [[s1,ed], [s2, e2]..] determine if a
person coudld attend all meetings.

Description: https://aaronice.gitbook.io/lintcode/sweep-line/meeting-rooms

https://leetcode.com/problems/meeting-rooms/
https://www.youtube.com/watch?v=i2bBG7CaVxs
https://github.com/JBayona/Facebook-Interview-Coding-1/blob/master/253.%20Meeting%20Rooms%20II.java
*/

// Greedy algorithm
// Time O(N)
// Space O(1)
var canAttendMeetings = function(intervals) {
  // Sort the intervals per start time so we can check if collapses
  let sorted = intervals.sort((a,b) => a.start - b.start);

  for(let i = 1 ; i < intervals.length; i++) {
      if(sorted[i].start < sorted[i-1].end) {
          return false;
      }
  }

return true;
};

// Time O(N Log N + N) // Creation (N) + Insertion (N Log N)
// Space O(N)
var canAttendMeetings = function(intervals) {
  // Create min heap
  let heap = new PriorityQueue(
      compare = (a, b) => a[0] - b[0]
  );

  // Add all intervals to the min heap
  for (let interval of intervals) {
      heap.enqueue(interval);
  }

  while (!heap.isEmpty()) {
      let interval = heap.dequeue();
      // If there's a conflict early return false
      if (!heap.isEmpty() && interval[1] > heap.front()[0]) {
          return false;
      }
  }
  return true;
};

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
    // Sort the intervals per start time so we can check if collapses
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
https://www.youtube.com/watch?v=GmpyAMpjpUY
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

//Opción 2
/*
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] find the minimum number of conference rooms required.
*/

public int minMeetingRooms(Interval[] intervals) {
  if (intervals == null || intervals.length == 0) return 0;

  Arrays.sort(intervals, new Comparator<Interval>(){
    public int compare(Interval i1, Interval i2) {
      return i1.start - i2.start;
    }
  });
  
  
  // Min heap
  // We sort by end so we can extend or reuse the meeting room, that´s why we use end time.
  PriorityQueue<Interval> pq = new PriorityQueue<>(new Comparator<Interval>(){
   public int compare(Interval i1, Interval i2) {
    return i1.end - i2.end;
   }
  });
  pq.add(intervals[0]);

  for (int i = 1; i < intervals.length; i++) {
    Interval interval = pq.poll();
    // If the current event is greater thatn the earliest end time
    // Means we can reuse the room, so we "extend" the event and
    // later will be added again
    if (intervals[i].start >= interval.end)
      // Means we need another room
      interval.end = intervals[i].end;
    else
      // There´s a conflict and we need to add them to the minheap
      pq.add(intervals[i]);
    pq.add(interval);
}
  
  // The number of rooms will be the size of the heap
return pq.size();
}

// Example = [[0, 30], [5, 10], [15, 20]];
// Result = 2
