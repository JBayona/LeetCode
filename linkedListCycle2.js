/*
Given a linked list, return the node where the cycle begins. If there is no cycle, return null.
There is a cycle in a linked list if there is some node in the list that can be reached again by
continuously following the next pointer. Internally, pos is used to denote the index of the node that
tail's next pointer is connected to. Note that pos is not passed as a parameter.
Notice that you should not modify the linked list.
https://leetcode.com/problems/linked-list-cycle-ii/
*/

// Option 1
// Time O(N)
// Space O(1)
var detectCycle = function(head) {
    // There´s no head
    if(!head || !head.next) {
        return null;
    }
    let slow = head;
    let fast = head;
    // We are only interested in fast because it will
    // reach faster to null if any and not slow which is behind
    // while(slow && (fast && fast.next)){
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
        // We detect a cycle
        if(slow == fast) {
            break;
        }
    }
    
    // No loops found
    if(fast == null || fast.next == null) {
        return null;
    }
    
    // Set fast to the head and try to meet slow
    slow = head;
    while(slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
};