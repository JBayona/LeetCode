/*
Sort a linked list in O(n log n) time using constant space complexity.
Example 1:

Input: 4->2->1->3
Output: 1->2->3->4
Example 2:

Input: -1->5->3->4->0
Output: -1->0->3->4->5

https://leetcode.com/problems/sort-list/description/

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/*
1. Brute force could be adding all the list into an array, apply sort and then move it again to a linked list


// O(n Log n)
Step 1: Find the middle of the list
Step 2: Sort using merge sort (break down until we have only one node)
Step 3: Merge sorted
*/
var sortList = function (head) {
  if (head === null || head.next === null) return head;

  // step 1. cut the list to two halves
  let prev = null;
  let slow = head;
  let fast = head;

  // Split the list in two
  // slow has the middle node always
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = null;

  // step 2. sort each half
  let l1 = sortList(head);
  let l2 = sortList(slow);

  // step 3. merge l1 and l2
  return mergeSort(l1, l2);
};

// Merge and Sort
function mergeSort(left, right) {
  //Dummy node is required to insert nodes at the very beginning
  let dummy = new ListNode(0);
  let tail = dummy;

  while (left && right) {
    if (left.val < right.val) {
      tail.next = left;
      left = left.next;
    } else {
      tail.next = right;
      right = right.next;
    }
    tail = tail.next;
  }

  if (left) {
    tail.next = left;
  }

  if (right) {
    tail.next = right;
  }
  return dummy.next;
}
