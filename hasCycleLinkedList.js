/*
Given a linked list, determine if it has a cycle in it.

https://leetcode.com/problems/linked-list-cycle/description/
*/
var hasCycle = function(head) {
    if (!head) {
        return false;
    }
    let slow = head;
    let fast = head;

    // If both are met, the linked list has a cycle
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
        /*
        //Remover el ciclo si existe, fast es en donde existe el loop
        if(slow === fast){
            slow = head;
            while(show.next !== fast.next){
                slow = slow.next;
                fast = fast.next;
            }
            //Fast es el causante del loop
            fast.next = null;
        }
        */
        // Different problem to return where the cycle starts
        /*
        if(slow == fast) {
            break;
        }
        */
    }
    return false;
    // Continue to return where the cycle starts
    /*
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
    */
};

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
