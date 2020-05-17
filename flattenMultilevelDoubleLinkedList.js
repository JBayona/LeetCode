/*
You are given a doubly linked list which in addition to the next and previous pointers, it could have a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in the example below.

Flatten the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level of the list.

Example 1:

Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
Output: [1,2,3,7,8,11,12,9,10,4,5,6]
Explanation:

The multilevel linked list in the input is as follows:

After flattening the multilevel linked list it becomes:

Example 2:

Input: head = [1,2,null,3]
Output: [1,3,2]
Explanation:

The input multilevel linked list is as follows:

  1---2---NULL
  |
  3---NULL
Example 3:

Input: head = []
Output: []

https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/
*/

var flatten = function(head) {
    // if the head is null we can just return null
    if(!head) {
        return null;
    }
    
    // The prev node to head is null
    let prev = null;
    
    // Stack of nodes to maintain the order of visiting nodes
    let stack = [];
    
    // head node is the first to visit, push it to the stack
    stack.push(head);
    while(stack.length) {
        // pop
        let curr = stack.pop();
        
        //If previous node exists, then set the next pointer of the previous node to current node
        if(prev) {
            prev.next = curr;
        }
        
        //Setting the prev pointer of the current node as the previous node
        curr.prev = prev;
        
        //If the current node has next pointer, push it to the stack
        if(curr.next) {
            stack.push(curr.next);
        }
        // If the current node has child pointer, push it to the stack and set its child as NULL
        // Because we want to return the normal doubly linkedlist with no child links
        // The reason to push the child node in the stack, after the next node is
        // because, child node (if exist) has to be visited before the next node 
        if(curr.child) {
            stack.push(curr.child);
            curr.child = null;
        }
        // Set the previous node as the current node
        prev = curr;
    }
    // return the head pointer of the modified nodes
    return head;
};