/*
You are given the head of a linked list, and an integer k.

Return the head of the linked list after swapping the values of the kth node from the beginning
and the kth node from the end (the list is 1-indexed).

Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]

Example 2:
Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]

https://leetcode.com/problems/swapping-nodes-in-a-linked-list/description/
*/

var swapNodes = function (head, k) {
  let currentHead = head;
  let count = 1;
  while (currentHead && count !== k) {
    currentHead = currentHead.next;
    count++;
  }

  let fast = head;
  // Move k positions
  for (let i = 0; i < k; i++) {
    fast = fast.next;
  }

  let endHead = head;
  while (fast) {
    endHead = endHead.next;
    fast = fast.next;
  }

  // If both nodes are the same, nothing needs to be done.
  if (currentHead === endHead) {
    return head;
  }

  // Swap currentHead and endHead
  let tmp = currentHead.val;
  currentHead.val = endHead.val;
  endHead.val = tmp;
  return head;
};
