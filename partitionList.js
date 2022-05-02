/*
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
*/
// Two pointers - one list with values < x and the other one values >= x
// Traveling from left to right will fix the order problem as we are maintaining the original order
// Finally combine the two lists
var partition = function(head, x) {
  let head1 = new ListNode(0);
  let head2 = new ListNode(0);
  let list1 = head1;
  let list2 = head2;
  let current = head;
  
  while(current) {
      // Elements less than x
      if(current.val < x) {
          list1.next = current;
          list1 = list1.next;
      } else {
          list2.next = current;
          list2 = list2.next;
      }
      current = current.next;
  }
  // Set to null the last list to lose reference of the other elements
  list2.next = null;
  // Combine two lists
  list1.next = head2.next;
  return head1.next;
};
