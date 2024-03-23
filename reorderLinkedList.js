/*
You are given the head of a singly linked-list. The list can be represented as:
L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

https://leetcode.com/problems/reorder-list/
*/

// Time O(N)
// Space O(1)
/*
1 -> 2 -> 3 -> 4
l1 = 1 -> 2
l2 = 4 -> 3
r = 1 -> 4 -> 2 -> 3
*/
var reorderList = function (head) {
  let mid = middleNode(head);
  let reversedList = reverse(mid.next);
  // Set the middle node as null as it´s the new final
  mid.next = null;
  // Merge lists, one is the middle, and the other is middle reversed
  return merge(head, reversedList);
};

var middleNode = function (head) {
  if (!head) {
    return null;
  }
  // If there's only one node in the list
  if (head && !head.next) {
    return head;
  }

  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

function reverse(node) {
  let current = node;
  let prev = null;
  let next = null;
  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

function merge(head1, head2) {
  let head = head1;
  while (head2) {
    let next = head1.next;
    head1.next = head2;
    head1 = head2;
    head2 = next;
  }
  return head;
}
