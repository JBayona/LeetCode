/*
Given a linked list, determine if it has a cycle in it.
https://leetcode.com/problems/linked-list-cycle/description/

*/

var hasCycle = function(head) {
    if(head === null) return false;
    let slow = head;
    let fast = head;
    while(slow && (fast && fast.next)){
        slow = slow.next;
        fast = fast.next.next;
        /* if(slow === fast) break */
        if(slow === fast){
            return true;
        }
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
    return false;
};