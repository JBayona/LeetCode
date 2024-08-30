/*
A linked list is given such that each node contains an additional random pointer which
could point to any node in the list or null.

Return a deep copy of the list.

The Linked List is represented in the input/output as a list of n nodes. Each node is represented as a
pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) where random pointer points to, or null if
it does not point to any node.

https://leetcode.com/problems/copy-list-with-random-pointer/
*/

// Option 1
// Time O(N)
// Space O(N)
var copyRandomList = function(head) {
    if (!head) {
        return null;
    }

    let oldNode = head;
    let newNode = new Node(oldNode.val);

    let seen = new Map();
    // Mark both firs node as visited
    // Old and new reference
    seen.set(oldNode, newNode);
    // Iterate until the node is not null
    while (oldNode != null) {
        // Clone nodes
        newNode.random = getClone(oldNode.random, seen);
        newNode.next = getClone(oldNode.next, seen);
        // Move
        oldNode = oldNode.next;
        newNode = newNode.next;
    };
    // return the result as head has the reference
    return seen.get(head);
};

function getClone(node, seen) {
    // If node exists
    if (node) {
        // If visited already
        if (seen.has(node)) {
            return seen.get(node);
        }
        // If not, create the copy and mark it as visited
        // Save the reference
        let newNode = new Node(node.val);
        seen.set(node, newNode);
        return newNode;
    }
    // Node does not exist
    return null;
}

// Option 2
var copyRandomList = function(head) {
    
    if(!head) {
        return null;
    }
    
    // create a new linked list newNode and copy the contents of original node to it and connect them
    let current = head;
    while(current){
        let newNode = new Node(current.val);
        newNode.next = current.next;
        current.next = newNode;
        current = newNode.next;
    }
    
    // make the node again point to head
    current = head;
    
    // correct the random pointer connection 
    while(current){
        current.next.random = current.random ? current.random.next : null;
        current = current.next.next;
    }
    
    // take result as the linked list to be retured and get that in result pointer so move ahead
    let curr = head;
    let result = head.next;
    let resPtr = result;
    while(curr) {
        curr.next = curr.next.next;
        curr = curr.next;
        resPtr.next = resPtr.next ? resPtr.next.next : null;
        resPtr = resPtr.next;
    }
    
    return result;
};