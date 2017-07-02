/*
Given linked list: 1->2->3->4->5, and n = 2.
After removing the second node from the end, the linked list becomes 1->2->3->5.
*/

function ListNode(val, node){
  this.val = val;
  this.next = node ? node : null;
}

function removeNthFromEnd(head, n){
  var nodeA = head;
  var nodeB = head;
  var i = 0;
  //If the head is null, the empty is null
  if(!head){
    return null;
  }

  while(nodeA.next){
    nodeA = nodeA.next;
    if(i < n){
      i++;
    }else{
      nodeB = nodeB.next;
    }
  }

  if(i < n){
    head = head.next;
    return head;
  }

  if(nodeB.next){
    nodeB.next = nodeB.next.next;
    return head;
  }
  return null;
}

list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
n = 2;

console.log(removeNthFromEnd(list,n));