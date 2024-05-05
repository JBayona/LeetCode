/*
Write a function to delete a node (except the tail) in a singly linked list, given only access to that node.

Given linked list -- head = [4,5,1,9], which looks like following:

Example 1:
Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.

Example 2:
Input: head = [4,5,1,9], node = 1
Output: [4,5,9]
Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.

https://leetcode.com/problems/delete-node-in-a-linked-list/
*/

// As we don't have a reference and we can not remove the node, we copy the information of the next node to the current one
// and we remove the next node instead.
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};
