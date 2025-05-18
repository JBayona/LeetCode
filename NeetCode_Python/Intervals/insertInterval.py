# You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi]
# represent the start and the end of the ith interval and intervals is sorted in ascending order by starti.
# You are also given an interval newInterval = [start, end] that represents the start
# and end of another interval.

# Insert newInterval into intervals such that intervals is still sorted in ascending order by starti
# and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

# Return intervals after the insertion.

# Note that you don't need to modify intervals in-place. You can make a new array and return it.

# Example 1:
# Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
# Output: [[1,5],[6,9]]

# Example 2:
# Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
# Output: [[1,2],[3,10],[12,16]]
# Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

# Time O(N)
# Space O(N)
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        index = 0
        result = []

        # Non-overlapping elements
        while index < len(intervals) and intervals[index][1] < newInterval[0]:
            result.append(intervals[index])
            index += 1

        # At this point we should have already added all non-overlapping elements
        # Here we are going to merge all elements and as soon as the current interval
        # in the first position/start is greater than the new interval end, we need that
        # all elements have been merged
        while index < len(intervals) and intervals[index][0] <= newInterval[1]:
            newInterval[0] = min(intervals[index][0], newInterval[0])
            newInterval[1] = max(intervals[index][1], newInterval[1])
            index += 1

        # Push the merged element
        result.append(newInterval)

        # All elements left in any
        while index < len(intervals):
            result.append(intervals[index])
            index += 1

        return result
