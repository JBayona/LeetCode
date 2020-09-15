/*
Write a program to find the node at which the intersection of two singly linked lists begins.

For example, the following two linked lists: begin to intersect at node c1.

Example 1:

Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Reference of the node with value = 8
Input Explanation: The intersected node's value is 8
(note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5].
There are 2 nodes before the intersected node in A; There are 3

https://leetcode.com/problems/intersection-of-two-linked-lists/
*/

var getIntersectionNode = function(headA, headB) {
    let lenA = 0;
    let lenB = 0;
    
    let listA = headA;
    let listB = headB;
    
    let diff;
    
    if(!headA || !headB) {
        return null;
    }
    
    // Length A
    while (listA){
        lenA++;
        listA = listA.next;
    }
    
    // Length B
    while (listB){
        lenB++;
        listB = listB.next;
    }
    
    listA = headA;
    listB = headB;
    
    let i = 0;
    if(lenA > lenB) {
       diff = lenA - lenB;
        while(i < diff) {
            i++;
            listA = listA.next;
        }
    } else {
        diff = lenB - lenA;
        while(i < diff) {
            i++;
            listB = listB.next;
        }
    }
    
    while(listA && listB) {
        if(listA === listB) {
            return listA
        }
        listA = listA.next;
        listB = listB.next;
    }
    
    // No intersection found
    return null;
};
