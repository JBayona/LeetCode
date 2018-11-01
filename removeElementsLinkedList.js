/*
Remove all elements from a linked list of integers that have value val.

Example:

Input:  1->2->6->3->4->5->6, val = 6
Output: 1->2->3->4->5

https://leetcode.com/problems/remove-linked-list-elements/description/
*/

var removeElements = function(head, val) {
    
    let dummyNode = new ListNode(-1);
    dummyNode.next = head;
    
    let current = head;
    let prev = dummyNode;
    
    while(current){
        if(current.val === val) {
            prev.next = current.next;
        } else {
            prev = current;
        }
        current = current.next;
    }
    
    return dummyNode.next;
};

// Recursive

var removeElements = function(head, val) {
    // If we have completed to check the list (base case)
    if(head === null) {
        return head;
    }
    // If we found the element we don´t conect it
    if(head.val === val) {
        head = removeElements(head.next, val);
    } else {
        // Connect the next elements.
        head.next = removeElements(head.next, val)
    }
    
    return head;
};