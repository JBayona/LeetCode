/*
Merge two sorted linked lists and return it as a new list.
The new list should be made by splicing together the nodes of the first two lists.

https://leetcode.com/problems/merge-two-sorted-lists/#/description
*/


function ListNode(val, node) {
     this.val = val;
    this.next = node? node : null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
/*var mergeTwoLists = function(l1, l2) {
    if (!l1) {
        return l2;
    }
    
    if (!l2) {
        return l1;
    }
    
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};*/

// Iterative solution
var mergeTwoLists = function(l1, l2) {
    // If only l2 is provided, return second list
    if (!l1) {
        return l2;
    }

    // If only l1 is provided, return l1
    if (!l2) {
        return l1;
    }

    let dummy = new ListNode(0);
    let current = dummy;
    // Change references on the list
    while (l1 && l2) {
        if(l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    // If we have not visited the full list
    // add them to the result
    if (l1) {
        current.next = l1;
    } else if (l2) {
        current.next = l2;
    }
    return dummy.next;
};

l1 = new ListNode(5, new ListNode(10, new ListNode(15, new ListNode(40))));
l2= new ListNode(2, new ListNode(3, new ListNode(20)));
console.log(mergeTwoLists(l1,l2));
