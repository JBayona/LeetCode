/*
Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return
the minimum number of conference rooms required.

Example 1:
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2

Example 2:
Input: intervals = [[7,10],[2,4]]
Output: 1

https://leetcode.com/problems/meeting-rooms-ii/description/
*/

// Approach
// 1. Have a priority queue that can help us to get the meeting which
// ends the earliest time, so we only need the endTime, whenever we find
// that the next meeting is starting later than the earliest in the heap
// we can pop it, otherwise we can add it and the number of minimum rooms
// needed will be the ones under the minheap as we were not able to pop them
// MinHeap
// https://github.com/datastructures-js/priority-queue/blob/v5/README.md
// Time O(NlogN) -> N for the tasks and LogN is the enqueue & dequeue cost
// Space O(N)
var minMeetingRooms = function(intervals) {
    if (!intervals) {
        return 0;
    }

    // Sort based on the start time
    // 0 - start
    // 1 - end
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Set-up a priority queue to get the earlist end time a meeting end
    let minHeap = new PriorityQueue({
        compare: (a, b) => a - b
    });
    // Add the first meeting to the heap
    minHeap.enqueue(intervals[0][1]);
    for(let i = 1; i < intervals.length; i++) {
        // No conflict, the earliest meeting ends first to the next
        // meeting start time so we can remove it from the heap
        if (minHeap.front() <= intervals[i][0]) {
            minHeap.dequeue();
        }
        // Add the next meeting schedule
        minHeap.enqueue(intervals[i][1]);
    }
    return minHeap.size();
};