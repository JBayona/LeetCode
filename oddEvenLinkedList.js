/*
Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here
we are talking about the node number and not the value in the nodes.

You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity.

Example 1:

Input: 1->2->3->4->5->NULL
Output: 1->3->5->2->4->NULL
Example 2:

Input: 2->1->3->5->6->4->7->NULL
Output: 2->3->6->7->1->5->4->NULL

https://leetcode.com/problems/odd-even-linked-list/
*/

// Time O(N)
// Time O(1)
// To solve it we can split the list in two lists, odd list and even list
var oddEvenList = function(head) {
    if(!head) {
        return null;
    }
    let odd = head;
    let even = head.next;
    let evenHead = even;
    
    while(even && even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    
    // append the even (par) list to the odd (impar) list
    odd.next = evenHead;
    return head;
};

// Time O(N)
// Space O(N)

var oddEvenList = function(head) {
    let oddNodes = []; // Nodos impares
    let evenNodes = []; // Nodos pares
    
    let current = head;
    let index = 1;
    while(current) {
        if(index % 2 === 0) {
            evenNodes.push(current.val);
        } else {
            oddNodes.push(current.val);
        }
        index++;
        current = current.next;
    }
    
    // Create the list aresult
    let newHead = new ListNode(0);
    let cur = newHead;
    for(let i = 0; i < oddNodes.length; i++) {
        cur.next = new ListNode(oddNodes[i]);
        cur = cur.next;
    }
    for(let i = 0; i < evenNodes.length; i++) {
        cur.next = new ListNode(evenNodes[i]);
        cur = cur.next;
    }
    return newHead.next;
};