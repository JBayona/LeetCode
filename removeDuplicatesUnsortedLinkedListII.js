/*
Given the head of a linked list, find all the values that appear more than once in the list and
delete the nodes that have any of those values.

Return the linked list after the deletions.

Examples:
Input: linked list = 1->2->3->2
Output: 1->3

Input: linked list = 2->1->1->2
Output: []

https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list/description/
*/

// Time O(N)
// Space O(N)
var deleteDuplicatesUnsorted = function (head) {
  let hash = {};
  let current = head;
  // Count the number of ocurrences
  while (current) {
    if (!(current.val in hash)) {
      hash[current.val] = 0;
    }
    hash[current.val]++;
    current = current.next;
  }

  current = head;
  let prev = null;
  let newHead = null;
  while (current) {
    let val = current.val;
    // Check unique values
    if (val in hash && hash[val] <= 1) {
      // Set the first unique and set the new head
      if (!prev) {
        prev = current;
        newHead = prev;
      } else {
        // Update the prev to the current element which has no repetitive elements and move the prev to the current
        // as the current will be updated to the next one
        prev.next = current;
        prev = prev.next;
      }
    }
    current = current.next;
  }
  // If the prev still has elements set to null to remove the duplicates if any
  if (prev && prev.next !== null) {
    prev.next = null;
  }
  return newHead;
};
