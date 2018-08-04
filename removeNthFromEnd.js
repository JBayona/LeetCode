/*
Given linked list: 1->2->3->4->5, and n = 2.
After removing the second node from the end, the linked list becomes 1->2->3->5.
*/

function ListNode(val, node){
  this.val = val;
  this.next = node ? node : null;
}

var removeNthFromEnd = function(head, n) {
    let slow = head;
    let fast = head;
    
    // Move n nodes of difference
    for(let i = 0; i < n; i++) {
        fast = fast.next;
    }
    
    // if remove the first node
    if(fast === null) {
        head = head.next
        return head;
    }
    
    while(fast.next) {
        fast = fast.next;
        slow = slow.next;
    }
    
    slow.next = slow.next.next;
    return head;
};

list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
n = 2;

console.log(removeNthFromEnd(list,n));