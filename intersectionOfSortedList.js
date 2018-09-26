/*

Write a program to find the node at which the intersection of two singly linked lists begins.


For example, the following two linked lists:

A:          a1 → a2
                   ↘
                     c1 → c2 → c3
                   ↗            
B:     b1 → b2 → b3
begin to intersect at node c1.


Notes:

If the two linked lists have no intersection at all, return null.
The linked lists must retain their original structure after the function returns.
You may assume there are no cycles anywhere in the entire linked structure.
Your code should preferably run in O(n) time and use only O(1) memory.

https://leetcode.com/problems/intersection-of-two-linked-lists/description/

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
