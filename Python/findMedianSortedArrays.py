"""
Given two sorted arrays nums1 and nums2 of size m and n respectively, return
the median of the two sorted arrays.

Follow up: The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Example 3:
Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000

Example 4:
Input: nums1 = [], nums2 = [1]
Output: 1.00000

Example 5:
Input: nums1 = [2], nums2 = []
Output: 2.00000

https://leetcode.com/problems/median-of-two-sorted-arrays/
"""

# Option 1
# Time O(N+M)
# Space O(N+M)
class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: float
        """
        indexA = 0
        indexB = 0
        index = 0
        merged = []
        
        # Merge arrays
        while indexA < len(nums1) and indexB < len(nums2):
            if nums1[indexA] < nums2[indexB]:
                merged.append(nums1[indexA])
                indexA += 1
            else:
                merged.append(nums2[indexB])
                indexB += 1
            index+=1
        
        # If we left elements in nums1
        while indexA < len(nums1):
            merged.append(nums1[indexA])
            indexA += 1
            
        # If we left elements in nums2
        while indexB < len(nums2):
            merged.append(nums2[indexB])
            indexB += 1
        
        if len(merged) % 2 != 0:
            return merged[len(merged)/2]
        else:
            return ((merged[len(merged)/2] + merged[len(merged)/2 - 1])) / 2.0