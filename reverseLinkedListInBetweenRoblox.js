/*
Given a linked list and n, reverse the list in between, example:
1 -> 2 -> 3 -> 4 -> 5 -> 6
n = 3
Result = 3 -> 2 -> 1 -> 6 -> 5 -> 4
*/

function Node(val, next) {
    this.val = val;
    this.next = next || null;
}

var reverseList = function(head, n) {
    let current = head;
    let newHead;
  while(current) {
    // One we find the node
    if(current.val === n) {
        // Split the list
        let next = current.next;
        // Remove current reference to split the list
        current.next = null;
        // Reverse the first part of the list
        listFirst = reverseLinkedList(head);
        // Reverse the second part of the list
        listSecond = reverseLinkedList(next);
        let newHead = listFirst;
        let tmp = listFirst;
        // Append at the final the last list reversed
        while(tmp.next) {
          tmp = tmp.next; 
        }
        tmp.next = listSecond
        return newHead;
    }
    // Move pointer forward
    current = current.next;
  }
};

function reverseLinkedList(head) {
    let next = null;
    let current = head;
    let prev = null;
    while(current) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

list = new Node(1, new Node(2, new Node(3, new Node(4, new Node(5, new Node(6))))));
n = 3;
console.log(reverseList(list,n));
