/*
Given a sorted linked list, delete all duplicates such that each element appear only once.

For example,
Given 1->1->2, return 1->2.
Given 1->1->2->3->3, return 1->2->3.

https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/
*/

function ListNode(val, next){
  this.val = val;
  this.next = next || null;
}

var deleteDuplicates = function(head) {
  let current = head;
  while(current && current.next){
    if(current.val === current.next.val){
      current.next = current.next.next;
    }else{
      current = current.next;
    }
  }
  return head;
};

list = new ListNode(1, new ListNode(1, new ListNode(1, new ListNode(2))));
console.log(deleteDuplicates(list));