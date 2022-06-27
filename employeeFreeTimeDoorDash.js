/*
We are given a list schedule of employees, which represents the working time for each employee.

Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.

Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

(Even though we are representing Intervals in the form [x, y], the objects inside are Intervals, not lists or arrays.
For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and schedule[0][0][0] is not defined). 
Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.

 

Example 1:

Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation: There are a total of three employees, and all common
free time intervals would be [-inf, 1], [3, 4], [10, inf].
We discard any intervals that contain inf as they aren't finite.
Example 2:

Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]
 

Constraints:

1 <= schedule.length , schedule[i].length <= 50
0 <= schedule[i].start < schedule[i].end <= 10^8
*/

// Option 1
function employeeFreeTime(list) {
    // [ [ 1, 3 ], [ 6, 7 ], [ 2, 4 ], [ 2, 5 ], [ 9, 12 ] ]
    let flatten = list.reduce((acum, val) => acum.concat(val), []);
    // Sort based on the starting element
    flatten.sort((a,b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
    console.log(flatten);

    let result = [];
    let prev = flatten.shift();
    while(flatten.length) {
        let current = flatten.shift();
        // There's no overlap so we can add it in the result
        if (prev[1] < current[0]) {
            // result.add(new Interval(prev.end, current.start));
            // prev.end, current.start
            result.push([prev[1], current[0]]);
        } else {
            // Combine the last time to find the next
            // free time
            // current.end = Math.max(prev.end, current.end);
            current[1] = Math.max(prev[1], current[1]);
        }
        prev = current;
    }
    console.log('Result');
    return result;
}

// Option 2
function employeeFreeTime(list) {

    flatten = list.reduce((acum, val) => acum.concat(val), []);
    flatten.sort((a,b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

    let merge = [];
    let pre = flatten[0];
    for(let i = 0; i < flatten.length; i++){
        let curr = flatten[i];
        if(curr[0] > pre[1]) {
            merge.push(pre);
            pre = curr;
        } else{
            let merged = [pre[0], Math.max(pre[1], curr[1])];
            pre = merged;
        }
    }
    // The missing one
    merge.push(pre);

    let result = [];
    // At the beginning start is the time provided
    let lastStart = merge[1];
    for(let i = 0; i < merge.length; i++) {
        let curr = merge[i];
        // check if the current is between our boundaries and the current
        if(lastStart <= curr[0]) {
            result.push([lastStart, curr[0]]);
        }
        lastStart = curr[1];
    }

    console.log('RESULT');
    console.log(result);
}

// list =[[[1, 2], [5, 6]], [[1, 3]], [[4, 10]]];
list = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]];
console.log(employeeFreeTime(list));

var employeeFreeTime = function(schedule) {
    flatten = schedule.reduce((acum, val) => acum.concat(val), []);
    // console.log(flatten);
    flatten.sort((a,b) => a.start != b.start ? a.start - b.start : a.end - b.end);

    // console.log('===',flatten);

    let merge = [];
    let pre = flatten[0];
    for(let i = 0; i < flatten.length; i++){
        let curr = flatten[i];
        if(curr.start > pre.end) {
            merge.push(pre);
          pre = curr;
         } else{
            let merged = new Interval(pre.start, Math.max(pre.end, curr.end));
            pre = merged;
        }   
    }
    // The missing one
    merge.push(pre);
    // console.log("**",merge);

    // console.log('MERGE');
    // console.log(merge);

    let result = [];
    // At the beginning start is the time provided
    let lastStart = merge.end;
    for(let i = 0; i < merge.length; i++) {
      let curr = merge[i];
      // check if the current is between our boundaries and the current
      if(lastStart <= curr.start) {
        result.push(new Interval(lastStart, curr.start));
      }
      lastStart = curr.end;
    }
    return result;
};


