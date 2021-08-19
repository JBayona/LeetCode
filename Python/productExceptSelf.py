"""
Given an integer array nums, return an array answer such that answer[i] is equal to
the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Example 2:
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

https://leetcode.com/problems/product-of-array-except-self/
"""
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        left = [0] * len(nums)
        right = [0] * len(nums)
        result = [0] * len(nums)
        
        # First element in the left array is 1 and we need compute to the left
        left[0] = 1
        for i in range(1, len(nums)):
            left[i] = left[i-1] * nums[i-1]
            
            
        # Last element in the right array is 1 and we need to compute to the right
        right[len(nums)-1] = 1
        for i in range(len(nums)-2, -1, -1):
            right[i] = right[i+1] * nums[i+1]
            
        # Construct the result array
        for i in range(0, len(nums)):
            result[i] = left[i] * right[i]
        return result