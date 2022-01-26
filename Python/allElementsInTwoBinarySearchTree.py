"""
Given two binary search trees root1 and root2, return a list containing al
lthe integers from both trees sorted in ascending order.

https://leetcode.com/problems/all-elements-in-two-binary-search-trees/
"""

import heapq
class Solution:
    def getAllElements(self, root1: TreeNode, root2: TreeNode) -> List[int]:
        # Set up a heap and heapify it
        heap = []
        heapq.heapify(heap)
        # Set up a dfs function that goes thru every node for root1 and root2
        def dfs(node):
            if node:
                heapq.heappush(heap, node.val)
                dfs(node.left)
                dfs(node.right)
        # Add both nodes into the heap
        dfs(root1)
        dfs(root2)
        # heapify returns the specified number of smallest elements from an iterable in sorted order
        return heapq.nsmallest(len(heap), heap)