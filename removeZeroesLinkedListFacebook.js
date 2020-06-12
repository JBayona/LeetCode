/*
Given a linked list of numbers, how would you remove all the nodes that contain
the value zero (unlike and remove them)
Input: 1 -> 0 -> 2 -> 0 -> 5
Output: 1 -> 2 -> 5
Input and output is the head of the Linked List
*/

function ListNode(val, next) {
    this.val = val;
    this.next = next || null;
  }
  
  function removeZeroesLinkedList(head) {
    if(!head) {
      return null;
    }
  
    let dummy = new ListNode(-1);
    dummy.next = head;
  
    let current = head;
    let prev = dummy;
  
    while(current) {
      if(current.val === 0) {
        prev.next = current.next;
      } else {
        prev = current;
      }
      current = current.next;
    }
    return dummy.next;
  }
  
  function printList(list) {
    let values = [];
    let current =list;
    while(current) {
      values.push(current.val);
      current = current.next;
    }
    console.log(values);
  }
  
  list = new ListNode(1, new ListNode(0, new ListNode(2, new ListNode(0, new ListNode(5)))));
  console.log(removeZeroesLinkedList(list));