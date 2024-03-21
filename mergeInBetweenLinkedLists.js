/*
You are given two linked lists: list1 and list2 of sizes n and m respectively.

Remove list1's nodes from the ath node to the bth node, and put list2 in their place.

The blue edges and nodes in the following figure indicate the result:

https://leetcode.com/problems/merge-in-between-linked-lists/description/?envType=daily-question&envId=2024-03-20
*/

// Time O(N)
// Space O(1)
var mergeInBetween = function (list1, a, b, list2) {
  // Index to count the position
  let index = 0;
  // Position the first node in ath - 1
  let curr = list1;
  while (index !== a - 1) {
    curr = curr.next;
    index++;
  }
  // Store the front node
  let front = curr;

  // Posisionate the pointer in the bth + 1 node
  while (index !== b + 1) {
    curr = curr.next;
    index++;
  }
  // Store the node after the bth node
  let tail = curr;

  // Find the tail of list2
  let list2Head = list2;
  let list2Tail = list2;
  // Before the end of the list2
  while (list2Tail.next) {
    list2Tail = list2Tail.next;
  }
  // Connect the front with the head of the list2
  front.next = list2Head;
  // Connect the tail of the list2 to the tail
  list2Tail.next = tail;
  // Return the list1 that has connection
  return list1;
};
