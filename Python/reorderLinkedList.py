"""
You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

https://leetcode.com/problems/reorder-list/
"""

# Time O(N)
# Space O(1)
class Solution(object):
    def reorderList(self, head):
        """
        :type head: ListNode
        :rtype: None Do not return anything, modify head in-place instead.
        """
        middle_node = self.find_middle(head)
        reversed_list = self.reverse_list(middle_node.next)
        # Set the middle node as None as it´s the new final
        middle_node.next = None
        return self.merge(head, reversed_list)
        
        
    def find_middle(self, head):
        if head is None:
            return None
        
        if head and head.next is None:
            return head
        
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow
    
    def reverse_list(self, node):
        current = node
        prev = None
        next = None
        while current:
            next = current.next
            current.next = prev
            prev = current
            current = next
        return prev
    
    def merge(self, head1, head2):
        head = head1
        while head2:
            next = head1.next
            head1.next = head2
            head1 = head2
            head2 = next
        return head
        