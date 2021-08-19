"""
Given an integer array nums, find the contiguous subarray (containing at least one number) which
has the largest sum and return its sum.

A subarray is a contiguous part of an array.

Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

Example 2:
Input: nums = [1]
Output: 1

Example 3:
Input: nums = [5,4,-1,7,8]
Output: 23

https://leetcode.com/problems/maximum-subarray/
"""
# Time O(N)
# Space O(1)
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        result = nums[0]
        currentMax = 0
        
        for n in nums:
            currentMax += n
            # Current max could be either the sum or the current
            # number in case it´s greater than previous sum
            currentMax = max(currentMax, n)
            # Update our result
            result = max(result, currentMax)
        return result