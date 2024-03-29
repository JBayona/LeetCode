/*
Given a linked list, swap every two adjacent nodes and return its head.
You may not modify the values in the list's nodes, only nodes itself may be changed.

Example:
Given 1->2->3->4, you should return the list as 2->1->4->3.

https://leetcode.com/problems/swap-nodes-in-pairs/
*/

// Option 1 - Recursive
var swapPairs = function(head) {
    // We exhausted the list
    if (!head || !head.next) {
        return head;
    }
    let second = head.next;
    let swap = swapPairs(second.next);
    second.next = head;
    head.next = swap;
    return second;
};

function Node(val, next) {
    this.val = val;
    this.next = next || null;
}

var swapPairs = function(head) {
    if(head == null || head.next == null) {
        return head;
    }
    let first = head;
    let second = head.next;
    let newHead = second;
    
    while(true) {
        let tmp = second.next;
        second.next = first;
        // Nothing to swap again
        if(tmp == null || tmp.next == null) {
            first.next = tmp;
            break;
        }
        first.next = tmp.next;
        first = tmp;
        second = tmp.next;
    }
    return newHead;
};

// Recursion
/*
var swapPairs = function(head) {
    if (head==null || head.next==null) {
        return head;
    }
       
   let first = head;
   let second = head.next;
   let newHead = second;
   let temp = second.next;
   second.next = first;
   first.next = swapPairs(temp);
   return newHead;
};
*/

let list = new Node(1, new Node(2, new Node(3, new Node(4))));
console.log(swapPairs(list));
