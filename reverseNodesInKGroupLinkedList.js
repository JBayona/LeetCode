/*
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is
not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]

Example 2:
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]

https://leetcode.com/problems/reverse-nodes-in-k-group/description/
*/
// Approach: From the list, divide the nodes in K groups and reverse
// each group, finally join them all together
// Time O(N)
// Space O(1)
var reverseKGroup = function(head, k) {
  if (!head || k === 1) {
      return head;
  }

  let dummy = new ListNode(0);
  dummy.next = head;
  let current = head;
  let tail = dummy;

  while (current) {
      // Get the K nodes
      let kNode = getKthNode(current, k)

      // If there are fewer nodes than K
      if (kNode === null) {
          break;
      }

      // Save the position we have for the next group
      let nextNode = kNode.next;
      // Disconnect the k-node so we only reverse those
      kNode.next = null;

      // Connect and reverse
      tail.next = reverse(current);

      // Move tail to the last node of the reversed group
      tail = current;
      // Move the current to the next of the next group
      current = nextNode;
  }
  // Connect the last group tail to the remaining nodes
  tail.next = current;
  return dummy.next;
};

function getKthNode(node, k) {
  let current = node;
  let i = 0;
  while (i < k - 1 && current) {
      current = current.next;
      i++;
  }
  return current;
}

// Reverse the group of nodes
function reverse(node) {
  let current = node;
  let next;
  let prev = null;
  while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
  }
  return prev;
}
