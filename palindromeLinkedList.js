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
// Option 1
// Time O(N)
// Space O(1)
var isPalindrome = function (head) {
  let slow = head;
  let fast = head;
  // Split the list in 2;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let mid = slow;
  // Reverse list from mid to end
  mid = reverse(mid);

  // Compare values
  let current = head;
  while (mid) {
    // If the value is not the same it´s not a palindrome
    if (current.val !== mid.val) {
      return false;
    }
    mid = mid.next;
    current = current.next;
  }
  return true;
};

function reverse(head) {
  let current = head;
  let prev = null;
  let next;
  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// Option 2
// Time O(N) Space O(N)
var isPalindrome = function (head) {
  let stack = [];
  let node;

  node = head;
  while (node) {
    stack.push(node.val);
    node = node.next;
  }

  // Check if the list is palindrome with the stack
  // as the stack pop from the back (last entered)
  node = head;
  while (node) {
    if (node.val !== stack.pop()) {
      return false;
    }
    node = node.next;
  }

  return true;
};
