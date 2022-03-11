/*
Given a list, rotate the list to the right by k places, where k is non-negative.
For example:
Given 1->2->3->4->5->NULL and k = 2,
return 4->5->1->2->3->NULL.

https://leetcode.com/problems/rotate-list/description/
*/

//Option 1
function ListNode(val, next) {
  this.val = val;
  this.next = next || null;
}

var rotateRight = function (head, k) {
  if (!head) {
    return head;
  }
  // Step 1 - Get length of the list
  let len = 0;
  let current = head;
  while (current) {
    len++;
    current = current.next;
  }

  // Step 2 - Number of rotations, we need to use module in case we overflow
  k = k % len;

  // Step 3 - Move pointer k positions ahead
  current = head;
  while (k) {
    k--;
    current = current.next;
  }

  // Step 4, since the current is k steps ahead, then it will tell us
  // the kth position from the end, then current.next == null it means that we reach the last node
  // our prev pointer will have kth position from the end, here the is the number of rotations
  let prev = head;
  while (current.next) {
    current = current.next;
    prev = prev.next;
  }

  // Step 5 - Modify the head and last node
  current.next = head;
  head = prev.next;
  prev.next = null;
  return head;
};

list = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
k = 2;
console.log(rotateRight(list, k));
