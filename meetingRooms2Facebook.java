"""
Given an array of meeting intervals consisting of start and end times [[s1, e1]. [s2, e2]..]
(s < e), find the minimum number of conference rooms required
"""

// Solution O(N Log N) + O (K Log N)
import java.util.*;
class Solution {
    public int minMeetingRooms(Interval [] intervals) {
        if(intervals === null || intervals.length === 0) {
            return 0;
        }
        // Sort based on interval
        Arrays.sort(intervals, (a, b) => a.start - b.start);
        // Will pick the earliest time where a meeting ends
        PriorityQueue<Interval> minHeap = new PriorityQueue<>((a, b) => a.end - b.end);
        // Add the first meeting into the queue
        minHeap.add(intervals[0]);
        for(int i = 1; i < intervals.length; i++) {
            Interval current = intervals[i];
            Interval earliest = minHeap.remove();
            // There´s no conflict, should be >= as if a meeting is at 2:00pm, another
            // meeting should be able to start at 2:00 pm and there´s no need for another
            // room
            if(current.start >= earliest.end) {
                earliest.end = current.end; // Update the end time
            } else { // There´s a conflict
                minHeap.add(current);
            }
            // Add the elemment we removed, back to the heap
            minHeap.add(earliest);
        }
        return minHeap.size();
    }
}

class Solution {
    public int minMeetingRooms(Interval [] intervals) {
        if(intervals === null || intervals.length === 0) {
            return 0;
        }
        // Sort based on interval
        Arrays.sort(intervals, (a, b) => a.start - b.start);
        // Will pick the earliest time where a meeting ends
        PriorityQueue<Interval> minHeap = new PriorityQueue<>((a, b) => a.end - b.end);
        // Add the first meeting into the queue
        minHeap.add(intervals[0].end);
        for(int i = 1; i < intervals.length; i++) {
            // No conflict
            if(minHeap.peek() <= intervals[i].start) {
                minHeap.poll();
            }
            minHeap.add(intervals[i].end);
        }
        return minHeap.size();
    }
}