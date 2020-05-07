/*
Google calendar, Outlookm Ical, has been banned from your company! So an intrepid engineer has decided to roll their own
implementation. Unfourtunately one mayor missing feature is the ability to find out what time slots are free for a particular
individual.

Given a list of time blocks where a particular person is already booked/busy, a start and end time to seatch between, a minimum
durationt to search for find all the blocks of time that a person is free for a potential meeting that will last the
aforementioned duration.

Given start_time, end_time, duration, meeting_list -> suggested_meetings

Let´s assume we abstract the representation of time as simple integers, so a valid time is any valid integer supported by
your environment. Here is an example input [[3,20], [-2, 0], [0,2], [16,17], [19,23], [30,40], [27,233]]
*/

function bookTime(intervals, start, end, duration) {
  if(!intervals || !intervals.length) {
    return [];
  }
  
  // Sort using start time as point of sorting
  // Use a comparator
  //[0] - Start time
  //[1] - End time
  intervals = intervals.sort((a,b) => a[0] - b[0]);

  let mergedArray = [];
  let pre = intervals[0];
  for(let i = 0; i < intervals.length; i++){
    let curr = intervals[i];
    if(curr[0] > pre[1]) {
      mergedArray.push(pre);
      pre = curr;
    } else{
      let merged = [pre[0], Math.max(pre[1], curr[1])];
      pre = merged;
    }
  }
  // The missing one
  mergedArray.push(pre);

  let result = [];
  // At the beginning start is the time provided
  let lastStart = start;
  for(let i = 0; i < mergedArray.length; i++) {
    let curr = mergedArray[i];
    // check if the current is between our boundaries and the current
    if(lastStart <= curr[0] && Math.abs(lastStart-curr[0]) >= duration && curr[0] <= end) {
      result.push([lastStart, curr[0]]);
    }
    lastStart = curr[1];
  }
  return result;
}


list = [[3,20], [-2, 0], [0,2], [16,17], [19,23], [30,40], [27,233]];
// [-2, 0]0, 2][3, 20][16, 17] [19, 23] [27, 233][30, 40]
// merged = [-2, 2] [3, 23] [27, 233]
// expected = [-5, -2], [23, 27]
start = -5;
end = 27;
duration = 2
console.log(bookTime(list, start, end, duration));