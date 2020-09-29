/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.

https://leetcode.com/problems/add-two-numbers/
*/

// Time O(N)
// Space O(1)
var addTwoNumbers = function(l1, l2) {
    
    if(!l1) {
        return l2;
    }
    
    if(!l2) {
        return l1;
    }
    
    let val = 0;
    let newHead = null;
    let newTail = null;
    while(l1 && l2) {
        val += l1.val + l2.val;
        let node = new ListNode(val % 10);
        if(!newHead) {
            newHead = node
            newTail = node;
        } else {
            newTail.next = node;
            newTail = newTail.next;
        }
        val = val > 9 ? 1 : 0;
        
        // Move nodes
        l1 = l1.next;
        l2 = l2.next;
    }
    
    while (l1) {
        val += l1.val;
        let node = new ListNode(val % 10);
        newTail.next = node;
        // Move node
        newTail = newTail.next;
        val = (val >= 10)? 1 : 0;
        l1 = l1.next;
    }
    
    while (l2) {
        val += l2.val;
        let node = new ListNode(val % 10);
        newTail.next = node;
        // Move node
        newTail = newTail.next;
        val = (val >= 10)? 1 : 0;
        l2 = l2.next;
    }
    
    // Remaining
    if (val > 0) {
        let node = new ListNode(val);
        newTail.next = node;
    }
    
    return newHead;
};
