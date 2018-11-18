/*
Given two linked lists, find the missing number between those linked lists. One lists contains the exact same numbers plus a different one. find which number
is missing
*/

function ListNode(val, next) {
  this.val = val,
  this.next = next || null;
}

// Time O(N) y O(1)
// Get the sum of both lists, then find the difference between both lists
// and that would be missing number
function findMissingNumberLinkedList(l1, l2) {
  let sum1 = 0;
  let sum2 = 0;

  while(l1) {
   sum1 += l1.val;
   l1 = l1.next;
  }

  while(l2) {
   sum2 += l2.val;
   l2 = l2.next;
  }

  return Math.abs(sum1 - sum2);
}

l1 = new ListNode(7, new ListNode(3, new ListNode(5, new ListNode(8, new ListNode(9, new ListNode(6))))));
l2 = new ListNode(8, new ListNode(3, new ListNode(5, new ListNode(9, new ListNode(7)))));
console.log(findMissingNumberLinkedList(l1,l2));