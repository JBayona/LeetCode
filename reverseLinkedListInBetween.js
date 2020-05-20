/*
Reverse a linked list from position m to n. Do it in one-pass.

Note: 1 ≤ m ≤ n ≤ length of list.

Example:

Input: 1->2->3->4->5->NULL, m = 2, n = 4
Output: 1->4->3->2->5->NULL

https://leetcode.com/problems/reverse-linked-list-ii/
*/

// Time O(N)
// Space O(1)

// Flow
// 1->2->3->4->5-> NULL // Origin
// 1->3->2->4->5-> NULL // Pass 1
// 1->4->3->2->5-> NULL // Pass 2
var reverseBetween = function(head, m, n) {
    let dummy = new ListNode(0);
    dummy.next = head;
    
    let list1 = dummy;
    let list2;
    
    // Move first pointer right before from where we need to start
    let count = 1;
    while(count < m) {
        list1 = list1.next;
        count++;
    }
    
    // Position second pointer to the next of the first list
    list2 = list1.next;
    while(count < n) {
        // Remove list2.next
        // Tmp has the next element from list2
        let tmp = list2.next;
        // Update next to go to one elment after tmp (next)
        list2.next = list2.next.next;
        
        // Move list2 behind list1
        let tmp1 = list1.next;
        list1.next = tmp;
        tmp.next = tmp1
        
        // list2 should not move
        count++;
    }
    return dummy.next;
};

list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))));
m = 2;
n = 4;
console.log(reverseBetween(list,m, n));