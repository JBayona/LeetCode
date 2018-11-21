/*
Given a singly linked list, determine if it is a palindrome.

Example 1:

Input: 1->2
Output: false
Example 2:

Input: 1->2->2->1
Output: true
Follow up:
Could you do it in O(n) time and O(1) space?

https://leetcode.com/problems/palindrome-linked-list/description/
*/

// Time O(N) Space O(1)
var isPalindrome = function(head) {
  let list = head;
  let listLength = getListLength(list);
  
  if(listLength <= 1) return true;
  
  let l1 = head;
  let l2 = null;
  
  let current = head;
  let i = 0;
  let prev = null;
  while(current) {
    if(i === Math.floor(listLength/2)) {
      // Par
      if(listLength % 2 === 0) {
          l2 = current;
      } else {
          l2 = current.next;
      }
      // This line will ignore the middle element if it's even number (impar) 1 -> 2 (this will be ignored) -> 1
      // Or will carry with the correct size for even numbers
      prev.next = null;
      break;
    }
    prev = current;
    current = current.next;
    i++;
  }

  l2 = reverseList(l2);

  // Compare if both lists are the same
  // if it's odd number(impar) we ignore the element of the middle
  while(l1 && l2) {
    if(l1.val !== l2.val) {
        return false;
    }
    l1 = l1.next;
    l2 = l2.next;
  }
    return true;
};

function getListLength(list) {
  let size = 0;
  while(list) {
      size++;
      list = list.next;
  }
  return size;
}

function reverseList(list) {
  let current = list;
  let prev = null;
  let next = null;
  while(current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
  }
    return prev;
}

// Option 2
// Time O(N) Space O(N)
var isPalindrome = function(head) {
  let stack = [];
  let node;
  
  node = head;
  while(node) {
    stack.push(node.val);
    node = node.next;
  }
  
  // Check if the list is palindrome with the stack
  // as the stack pop from the back (last entered)
  node = head;
  while(node) {
    if(node.val !== stack.pop()) {
        return false;
    }
    node = node.next;
  }
  
  return true;
};