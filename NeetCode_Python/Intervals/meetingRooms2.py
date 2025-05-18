# Given an array of meeting time intervals intervals where intervals[i] = [starti, endi]
# return the minimum number of conference rooms required.

# Example 1:
# Input: intervals = [[0,30],[5,10],[15,20]]
# Output: 2

# Example 2:
# Input: intervals = [[7,10],[2,4]]
# Output: 1

from heapq import heappush, heappop

# Time O(NlogN)
# Space O(N)
class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if not len(intervals):
            return 0

        # Sort all rooms based on starting time
        intervals.sort(key=lambda x: x[0])

        minHeap = []
        ## Add the first element
        # We track only the time where the meeting ends
        heappush(minHeap, intervals[0][1])
        
        for i in range(1, len(intervals)):
            current = intervals[i]
            # If there's no overlap in the meetings, we can remove them
            # from the minHeap
            if minHeap[0] <= current[0]:
                heappop(minHeap)
            
            # Add the next meeting end time
            heappush(minHeap, current[1])
        
        return len(minHeap)
