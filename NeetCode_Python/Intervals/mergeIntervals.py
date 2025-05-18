# Time O(NLogN)
# Soace O(N)
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if not len(intervals):
            return []

        # Sort using the first element of the list
        intervals.sort(key=lambda x: x[0])

        result = []

        prev = intervals[0]
        for i in range(1, len(intervals)):
            current = intervals[i]
            # Non-overlap
            if prev[1] < current[0]:
                result.append(prev)
                prev = current
            else:
                # Overlap
                prev[0] = min(prev[0], current[0])
                prev[1] = max(prev[1], current[1])
        
        # Add missing element
        result.append(prev)
        return result

# Min Heap
# Time O(NLogN)
# Space O(N)
from heapq import heappush, heappop

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if not len(intervals):
            return []

        minHeap = []

        # In python we need to use the fist key as the priority in order
        # to implement a min heap, we need to manipulate the data
        for interval in intervals:
            heappush(minHeap, (interval[0], interval)) # Use the first element as priority


        result = []
        while minHeap:
            _, current = heappop(minHeap)
            # minHeap[0] it's the "peak"
            # The minHeap[0][1][0] represents the below
            # print minHeap[0] -> (0, [1,2]) Tupple
            # print minHeap[0][1] -> [1,2] Removing the sorting index preference
            # print minHeap[0][1][0] -> 1 Element of the list
            while minHeap and current[1] >= minHeap[0][1][0]:
                _, tmp = heappop(minHeap)
                current[0] = min(current[0], tmp[0])
                current[1] = max(current[1], tmp[1])
            
            # Add the element
            result.append(current)
        
        return result