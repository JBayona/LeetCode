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
 
https://leetcode.com/problems/employee-free-time
*/
// Option 1 - Min Heap
// Approach
// 1. Use a minHeap to get all the schedules, the min heap will
// get the elements first by earliest start time, then end time
// 2. If there's no overlap between the elements in the heap, the
// prev element and the current, it means that there's a free time.
// Otherwise we need to merge it
// Time O (N Log N)
// Space O(N)
var employeeFreeTime = function(schedules) {

    let minHeap = new PriorityQueue({
        compare: (a, b) => a.start !== b.start ? a.start - b.start : a.end - b.end
    });

    // Add all schedules on the heap
    for (let schedule of schedules) {
        for (let interval of schedule) {
            minHeap.enqueue(interval);
        }
    }

    if (minHeap.isEmpty()) {
        return [];
    }

    let result = [];
    let prev = minHeap.dequeue();
    while(!minHeap.isEmpty()) {
        let current = minHeap.dequeue();
        // No overlap, there's free time
        if (prev.end < current.start) {
            result.push(new Interval(prev.end, current.start));
        } else {
            // Overlap, we need to combine the interval
            current.end = Math.max(prev.end, current.end);
        }
        prev = current;
    }
    return result;
};


// Option 2 - Sort
// Time O (N Log N)
// Space O(N)
var employeeFreeTime = function(list) {
    // [ [ 1, 3 ], [ 6, 7 ], [ 2, 4 ], [ 2, 5 ], [ 9, 12 ] ]
    let flatten = list.reduce((acum, val) => acum.concat(val), []);
    // Sort based on the starting element and end element then
    flatten.sort((a,b) => a.start != b.start ? a.start - b.start : a.end - b.end);
    console.log(flatten);

    let result = [];
    let prev = flatten.shift();
    while(flatten.length) {
        // Get the first element
        let current = flatten.shift();
        // There's no overlap so we can add it in the result
        if (prev.end < current.start) {
            result.push(new Interval(prev.end, current.start));
        } else {
            // Combine the last time to find the next
            // free time
            current.end = Math.max(prev.end, current.end);
        }
        prev = current;
    }
    return result;
};
