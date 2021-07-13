"""
Given an array of positive integers nums and a positive integer target, return the minimal
length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or
equal to target. If there is no such subarray, return 0 instead.

Example 1:
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2

Explanation: The subarray [4,3] has the minimal length under the problem constraint.
Example 2:
Input: target = 4, nums = [1,4,4]
Output: 1

Example 3:
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0

https://leetcode.com/problems/minimum-size-subarray-sum/
"""

# Sliding window
# Time O(N)
import sys
class Solution(object):
    def minSubArrayLen(self, target, nums):
        """
        :type target: int
        :type nums: List[int]
        :rtype: int
        """
        start = 0
        end = 0
        minimum = sys.maxint
        current_sum = 0
        while end < len(nums):
            current_sum += nums[end]
            # If we reach the goal
            # Increase left window
            while current_sum >= target:
                minimum = min(end - start + 1, minimum)
                current_sum -= nums[start]
                start+=1
            end += 1
            
        return minimum if minimum != sys.maxint else 0