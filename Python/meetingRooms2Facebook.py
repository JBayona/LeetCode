"""
Given an array of meeting intervals consisting of start and end times [[s1, e1]. [s2, e2]..]
(s < e), find the minimum number of conference rooms required

Code: https://shareablecode.com/snippets/meeting-rooms-ii-python-solution-leetcode-k9uc-cHGM
"""

# Time: O(nlogn)
# Space: O(n)
import heapq
def minMeetingRooms(intervals):
    if not intervals:
        return 0
    
    # Sort based on the first element, in the start
    intervals.sort(key=lambda x: x[0])
    min_heap = []
    
    # Only insert the end element of the intervals
    heapq.heappush(min_heap, intervals[0][1])
    # Start from the first element as we already add one
    for interval in intervals[1:]:
        # If the end is less than the current interval start time, there's no overlap
        # so we can remove it from the heap
        if min_heap[0] <= interval[0]:
            heapq.heappop(min_heap)
        
        # Add the end time of the interval
        heapq.heappush(min_heap, interval[1])
    
    # Minimum meetings is the number of elements we kept on the queue
    return len(min_heap)

intervals = [[0, 30],[5, 10],[15, 20]] # 2
# intervals = [[7,10],[2,4]] # 1
print(minMeetingRooms(intervals)) 