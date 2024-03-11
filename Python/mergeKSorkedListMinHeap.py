"""
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []

https://leetcode.com/problems/merge-k-sorted-lists/description/
"""

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
import heapq
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        # Min heap
        minHeap = []
        heapq.heapify(minHeap)

        for i in range(len(lists)):
            if lists[i]:
                heapq.heappush(minHeap, (lists[i].val, i))
                lists[i] = lists[i].next
        
        # If lists is [[1, 2, 3], [2, 2], [3, 1]]
        # list value and index
        # queue will have [[1, 0], [2, 1], [3, 2]]
        print(minHeap)

        head = ListNode(None)
        curr = head
        # The index
        while minHeap:
            val, i = heapq.heappop(minHeap)
            curr.next = ListNode(val)
            curr = curr.next
            # For each node on each list, remove the first element
            # add it to the Linked list and move the pointer to the
            # next element
            if lists[i]:
                heapq.heappush(minHeap, (lists[i].val, i))
                lists[i] = lists[i].next
        
        return head.next


        