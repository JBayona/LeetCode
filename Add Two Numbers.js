/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var val = 0,
        newHead,
        newTail,
        node;
    
    if (!l1) {
        return l2;
    }
    
    if (!l2) {
        return l1;
    }
    
    while (l1 && l2) {
        val += l1.val + l2.val;
        node = new ListNode(val % 10);
        
        if (newHead) {
            newTail.next = node;
            newTail = newTail.next;
        } else {
            newHead = node;
            newTail = node;
        }
        
        val = (val >= 10)? 1 : 0;
        l1 = l1.next;
        l2 = l2.next;
    }
    
    while (l1) {
        val += l1.val;
        node = new ListNode(val % 10);
        newTail.next = node;
        newTail = newTail.next;
        val = (val >= 10)? 1 : 0;
        l1 = l1.next;
    }
    
    while (l2) {
        val += l2.val;
        node = new ListNode(val % 10);
        newTail.next = node;
        newTail = newTail.next;
        val = (val >= 10)? 1 : 0;
        l2 = l2.next;
    }
    
    if (val > 0) {
        node = new ListNode(val);
        newTail.next = node;
    }
    
    return newHead;
};