/*
Given the head of a singly linked list and 'n', swap the head with the nth node. Return the head of the new linked list.

Let’s take a look at an example where n is equal to 4
7 -> 14 -> 21 -> 28 -> 35 -> 42 -> null, n = 4
28 -> 14 -> 21 -> 7 -> 35 -> 42 -> null

https://www.educative.io/courses/coderust-hacking-the-coding-interview/k5MBN
*/

let swapNthNode = function (head, n) {
  if (!head || n === 1) {
    return head;
  }

  let current = head;
  let prev = null;
  let count = 1;
  while (current && n !== count) {
    prev = current;
    current = current.next;
    count++;
  }

  // Return head if the current is equal to none
  if (!current) {
    return head;
  }

  // current is pointing to nth node.
  // Let's swap nth node with head.
  prev.next = head;
  let tmp = head.next;
  head.next = current.next;
  current.next = tmp;
  return current;
};
