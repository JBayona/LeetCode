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
var sortList = function(head) {
    if(head === null || head.next === null) return head;
    
    // Step 1: Find the middle of the list
    // MiddleNode is the left part of the list
    let middleNode = findMiddleNode(head);
    //Right head of the list
    let rightHead = middleNode.next;
    
    // Remove reference to the right head
    middleNode.next = null;
    
    return mergeSort(sortList(middleNode), sortList(rightHead));
};


function findMiddleNode(head) {
    // It's necessary a dummy Node to get the mid value
    // or we can use a new conditional fast.next.next
    let newHeadDummy = new ListNode(0);
    newHeadDummy.next = head;
    
    let slow = newHeadDummy;
    let fast = newHeadDummy;
    
    while(slow && fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// Merge and Sort
function mergeSort(left, right) {
    //Dummy node is required to insert nodes at the very beginning
    let dummy = new ListNode(0);
    let tail = dummy;
    
    while(left && right) {
        if(left.val < right.val) {
            tail.next = left;
            left = left.next
        } else {
            tail.next = right;
            right = right.next;
        }
        tail = tail.next;
    }
    
    tail.next = left || right;
    return dummy.next;
    
}
