"""
Given an array nums, we call (i, j) an important reverse pair if i < j and nums[i] > 2*nums[j].
You need to return the number of important reverse pairs in the given array.

Example1:
Input: [1,3,2,3,1]
Output: 2
Example2:

Input: [2,4,3,5,1]
Output: 3
Note:
The length of the given array will not exceed 50,000.
All the numbers in the input array are in the range of 32-bit integer.

https://leetcode.com/problems/reverse-pairs/
"""

import bisect
class Solution:
    def reversePairs(self, nums: List[int]) -> int:
        sorted_list = sorted(nums)
        current_sorted = []
        result = 0
        total = len(nums)
        for v in nums:
            index = bisect.bisect_left(sorted_list, v / 2)
            index_to_insert = bisect.bisect_left(current_sorted, v)
            current_sorted.insert(index_to_insert, v)
            index_existing = bisect.bisect_left(current_sorted, v / 2)
            to_add = index - index_existing
            result += to_add
        return result
