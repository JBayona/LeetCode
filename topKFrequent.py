"""
Given a non-empty array of integers, return the k most frequent elements.

For example,
Given [1,1,1,2,2,3] and k = 2, return [1,2].

Note: 
You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

https://leetcode.com/problems/top-k-frequent-elements/description/
"""

import heapq
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        c = Counter(nums);
        # Min heap
        minHeap = []
        heapq.heapify(minHeap)
        
        for i in c:
            heapq.heappush(minHeap,(c[i], i))
            
            if len(minHeap) > k:
                heapq.heappop(minHeap)
                
        return [x[1] for x in minHeap]