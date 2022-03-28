"""
You are given an m x n binary matrix mat of 1's (representing soldiers)
and 0's (representing civilians). The soldiers are positioned in front of the civilians.
That is, all the 1's will appear to the left of all the 0's in each row.

A row i is weaker than a row j if one of the following is true:

The number of soldiers in row i is less than the number of soldiers in row j.
Both rows have the same number of soldiers and i < j.
Return the indices of the k weakest rows in the matrix ordered from weakest to strongest.

Example 1:
Input: mat = 
[[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]], 
k = 3
Output: [2,0,3]
Explanation: 
The number of soldiers in each row is: 
- Row 0: 2 
- Row 1: 4 
- Row 2: 1 
- Row 3: 2 
- Row 4: 5 
The rows ordered from weakest to strongest are [2,0,3,1,4].

Example 2:
Input: mat = 
[[1,0,0,0],
 [1,1,1,1],
 [1,0,0,0],
 [1,0,0,0]], 
k = 2
Output: [0,2]
Explanation: 
The number of soldiers in each row is: 
- Row 0: 1 
- Row 1: 4 
- Row 2: 1 
- Row 3: 1 
The rows ordered from weakest to strongest are [0,2,3,1].

https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/
"""
# Python default is min heap
# Insert O(LogN)
# Search O(N)
import heapq
class Solution:
    def kWeakestRows(self, mat: List[List[int]], k: int) -> List[int]:
        minHeap = []
        for i, a in enumerate(mat):
            # En base al primer elemento de la tupla
            heapq.heappush(minHeap, (self.count(a), i))

        print(minHeap)
        result = []
        while k > 0:
            # 0 is the index
            result.append(heapq.heappop(minHeap)[1])
            k -= 1
        return result

    def count(self, arr: List[int]) -> int:
        count = 0
        for n in arr:
            if n == 1:
                count += 1
            else:
                break
        return count
