/*
Given linked list: 1->2->3->4->5, and n = 2.
After removing the second node from the end, the linked list becomes 1->2->3->5.
*/

function ListNode(val, node){
  this.val = val;
  this.next = node ? node : null;
}

function removeNthFromEnd(head, n){
  var dummy = new ListNode(0);
  dummy.next = head;
  var p1 = dummy;
  var p2 = dummy;

  //Move p1 "n" so we will have p1 and p2 "n" nodes of difference
  for(var i = 0; i < n; i++){
    p1 = p1.next;
  }

  while(p1 !== null){
    p1 = p1.next;
    p2 = p2.next;
  }

  p2.next = p2.next.next;
  return dummy.next;
}

list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
n = 2;

console.log(removeNthFromEnd(list,n));