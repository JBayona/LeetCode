/*
Given a singly linked list, return the nth node from the last node. Return null if n is larger than the size of the list.
*/

let findNthFromLast = function (head, n) {
  // Return None if linked list is empty or value of n is less than 1
  if (!head || n < 1) {
    return null;
  }

  // We will use two pointers head and tail
  // where head and tail are 'n' nodes apart.
  let tail = head;

  //  Making tail 'n' nodes apart from the head
  while (tail && n > 0) {
    tail = tail.next;
    n -= 1;
  }

  // Check out-of-bounds
  if (n != 0) {
    return null;
  }

  // When tail pointer reaches the end of
  // list, head is pointing at nth node.
  while (tail) {
    tail = tail.next;
    head = head.next;
  }
  return head.data;
};
