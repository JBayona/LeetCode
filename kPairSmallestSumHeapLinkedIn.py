"""
You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.
Define a pair (u, v) which consists of one element from the first array and one element from the second array.
Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

Example 1:
Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

Example 2:
Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

Example 3:
Input: nums1 = [1,2], nums2 = [3], k = 3
Output: [[1,3],[2,3]]
Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]  

https://leetcode.com/problems/find-k-pairs-with-smallest-sums/
"""
# Time O(K Log N)
# Time O(K Log N)
class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        minHeap = []
        res = []
		# Iterate up to k because the result will not be out of this range
        for i in range(min(k, len(nums1))):
            # Insert in the tuples the first k elements which is the
            # nums[i] elements from the first array + arrays[0] of the second element
            # additionally add the "i" index for first element and "0" for the second
            heappush(minHeap, (nums1[i] + nums2[0], i, 0))

        print(minHeap)
        
        counter = 1
		# Only go upto k
        while minHeap and counter <= k:
            # Sum i first array, i second array
            _, i1, i2 = heappop(minHeap)
            
            res.append([nums1[i1], nums2[i2]])
            
            nxt_i2 = i2 + 1
            # If next element available for the nums2 then add it to the heap
            if nxt_i2 < len(nums2):
                # Generate combinations for the second array
                heappush(minHeap, (nums1[i1] + nums2[nxt_i2], i1, nxt_i2))
            
            counter+=1

        return res