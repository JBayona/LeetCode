/*
You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Follow up:
What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

Example:

Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 8 -> 0 -> 7

https://leetcode.com/problems/add-two-numbers-ii/
*/

// Time O(N) and space O(N)
var addTwoNumbers = function(l1, l2) {
    let stack1 = addElementsToStack(l1);
    let stack2 = addElementsToStack(l2);
    
    let newList = null;
    let newCurrent = null;
    let carry = 0;
    while(stack1.length || stack2.length) {
        let elem1 = stack1.length ? stack1.pop(): 0;
        let elem2 = stack2.length ? stack2.pop(): 0;
        let sum = elem1 + elem2 + carry;
        let node = new ListNode(sum%10);
        if(newList) {
            newCurrent.next = node
            newCurrent = newCurrent.next;
        } else {
            newList = node
            newCurrent = newList;
        }
        carry = sum >= 10 ? 1 : 0;
    }
    
    if(carry) {
        newCurrent.next = new ListNode(1);
    }
    return reverseList(newList);
};

function addElementsToStack(list) {
    let stack = [];
    let current = list;
    while(current) {
        stack.push(current.val);
        current = current.next;
    }
    return stack;
}

function reverseList(list) {
    let prev = null;
    let current = list;
    let next = null;
    
    while(current) {
        next = current.next;
        current.next = prev;
        prev = current
        current = next;
    }
    return prev;
}