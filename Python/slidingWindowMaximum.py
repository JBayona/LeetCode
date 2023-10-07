"""""
You are given an array of integers nums, there is a sliding window of size k which is
moving from the very left of the array to the very right. You can only see the k numbers
in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

Example 2:
Input: nums = [1], k = 1
Output: [1]

https://leetcode.com/problems/sliding-window-maximum/description/
"""""

import heapq


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        if k == 1:
            return nums

        max = []
        result = []

        # Insert the first k elements
        # We need it to set is as negative to keep the max heap
        for i in range(k):
            # Add a tuple of the nums and the index
            heapq.heappush(max, (-nums[i], i))

        # Add first element in the result array
        result.append(-max[0][0])
        # Iterate the last elements
        for i in range(k, len(nums)):
            heapq.heappush(max, (-nums[i], i))
            # If the index of the left window is overbreaching
            # our k, we need to "move" the window by removing the
            # first element from the window
            while max[0][1] <= i - k:
                heapq.heappop(max)
            result.append(-max[0][0])

        return result
