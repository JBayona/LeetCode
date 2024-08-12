/*
Given head, the head of a linked list, determine if the linked list has a cycle in it.
There is a cycle in a linked list if there is some node in the list that can be reached
again by continuously following the next pointer. Internally, pos is used to denote the index of
the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
Return true if there is a cycle in the linked list. Otherwise, return false.

https://leetcode.com/problems/linked-list-cycle/description/
*/

var hasCycle = function(head) {
  if (!head) {
      return false;
  }
  let slow = head;
  let fast = head;

  // If both are met, the linked list has a cycle
  while(fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) {
          return true;
      }
      /*
      //Remover el ciclo si existe, fast es en donde existe el loop
      if(slow === fast){
          slow = head;
          while(show.next !== fast.next){
              slow = slow.next;
              fast = fast.next;
          }
          //Fast es el causante del loop
          fast.next = null;
      }
      */
      // Different to return where the cycle starts, continuation below
      /*
      if(slow == fast) {
          break;
      }
      */
  }
  return false;
  // Continue to return where the cycle starts
  /*
  // No loops found
  if(fast == null || fast.next == null) {
      return null;
  }
  
  // Set fast to the head and try to meet slow
  slow = head;
  while(slow != fast) {
      slow = slow.next;
      fast = fast.next;
  }
  return slow;
  */
};