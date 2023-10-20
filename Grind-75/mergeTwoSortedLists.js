/*
You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists into one sorted list. The list should be made by splicing together
the nodes of the first two lists.

Return the head of the merged linked list.

https://leetcode.com/problems/merge-two-sorted-lists/description/
*/

var mergeTwoLists = function (l1, l2) {
  // List2 is null
  if (!l2) {
    return l1;
  }
  // List1 is null
  if (!l1) {
    return l2;
  }

  let dummy = new ListNode(0);
  let head = dummy;
  let current = head;
  // Iterate over the two lists
  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // If there are still elements in l1
  if (l1) {
    current.next = l1;
  }
  // If there are still elements in l2
  if (l2) {
    current.next = l2;
  }

  return head.next;
};
