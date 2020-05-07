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


