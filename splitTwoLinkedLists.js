/*
Split a linked list in two parts
*/

function ListNode(val, node) {
  this.val = val;
  this.next = node ? node : null;
}

function split(head) {
  if (!head) {
    return null;
  }

  // If there's only one node in the list
  if (head && !head.next) {
    return head;
  }

  let prev;
  let slow = head;
  let fast = head;
  while(fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  // Split the list
  prev.next = null;
  let l1 = head;
  let l2 = slow;

  console.log(l1);
  console.log(l2);
}

list = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4)))
);
split(list);
