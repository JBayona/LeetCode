/*
Reverse Linked List
*/

function ListNode(val, next){
  this.val = val;
  this.next = next || null;
}

// Iterative
// Time O(N)
function reverseList(list){
  let current = list;
  let prev = null;
  let next;

  while(current){
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log(reverseList(list));