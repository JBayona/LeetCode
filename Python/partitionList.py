"""
Given the head of a linked list and a value x, partition it such that all nodes
less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

Example 1:

Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
Example 2:

Input: head = [2,1], x = 2
Output: [1,2]

https://leetcode.com/problems/partition-list/
"""

# Two pointers - one list with values < x and the other one values >= x
# Traveling from left to right will fix the order problem as we are maintaining the original order
# Finally combine the two lists
def partition(self, head: ListNode, x: int) -> ListNode:
    head1 = ListNode(0)
    head2 = ListNode(0)
    l1 = head1
    l2 = head2
    current = head
    
    while current:
        # Elements less than x
        if current.val < x:
            l1.next = current
            l1 = l1.next
        else:
            l2.next = current
            l2 = l2.next
        current = current.next
    
    # Set to null the last list to lose reference of the other elements
    l2.next = None
    # Combine the two lists
    l1.next = head2.next
    return head1.next