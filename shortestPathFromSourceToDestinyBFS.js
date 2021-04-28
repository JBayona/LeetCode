/*
Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.

For example,
Given 1->2->3->3->4->4->5, return 1->2->5.
Given 1->1->1->2->3, return 2->3.

https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/
*/

function ListNode(val, next){
  this.val = val;
  this.next = next || null;
}

// Option 1
var deleteDuplicates = function(head) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  let duplicate = false;
  
  let current = head;
  while(current && current.next) {
      if(current.val !== current.next.val) {
          if(duplicate) {
              prev.next = current.next;
              duplicate = false;
          } else {
              prev = current;
          }
      } else {
          duplicate = true;
      }
      current = current.next;
  }
  
  // Check the last one
  if(duplicate) {
      prev.next = null;
  }
  
  return dummy.next;
};

// Option 2
var deleteDuplicates = function(head) {
  let list = head;
  let duplicate = null;

  let newHead = new ListNode(0);
  newHead.next = head;
  let current = newHead;

  while(list && list.next){
    if(list.val === duplicate || list.val === list.next.val){
      duplicate = list.val;
      current.next = list.next;
    }else{
      current = current.next;
    }
    list = list.next;
  }

  //Para la ultima vuelta en caso de fallar
  if(list && list.val === duplicate){
    current.next = null;
  }

  return newHead.next;
};

list = new ListNode(1, new ListNode(1, new ListNode(1, new ListNode(2))));
console.log(deleteDuplicates(list));