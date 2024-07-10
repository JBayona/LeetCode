/*
Given the pointer to the head node of a linked list and an integer to insert at a certain position

create a new node with the given integer as its  attribute, insert this node at the desired position
and return the head node.

A position of 0 indicates head, a position of 1 indicates one node away from the head and so on.
The head pointer given may be null meaning that the initial list is empty.

Example
1 -> 2 -> 3, data = 4,  position = 2
Result = 1 -> 2 -> 4 -> 3

https://www.hackerrank.com/challenges/insert-a-node-at-a-specific-position-in-a-linked-list/problem
*/

function insertNodeAtPosition(head, data, position) {
    let prev = head;
    let newNode = new SinglyLinkedListNode(data);
    //If list is empty
    if(!head) {
        return newNode;
    }
    // If the position is in the head we create the node
    // and we updayte the head with the new node
    if(position === 0) {
        newNode.next = head;
        head = newNode;
        return head;
    }
    // Find the position of the node to insert
    // -1 because we want "n" away from the head
    while(position - 1 > 0) {
        prev = prev.next;
        position--;
    }
    // Connect nodes
    let next = prev.next;
    newNode.next = next;
    prev.next = newNode;
    return head;
}