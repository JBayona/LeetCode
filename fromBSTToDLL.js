/*
Convert a BST to a sorted circular doubly-linked list in-place.
Think of the left and right pointers as synonymous to the previous and next pointers in a doubly-linked list.
*/

function Node(data, left, right) {
  this.data = data;
  this.left = left || null;
  this.right = right || null;
}

function convertBSTtoDLL(node) {
  // Base case
  if(!node) {
    return;
  }

  // Recursively convert left sub-tree
  convertBSTtoDLL(node.left);
  // Convert this node
  if(!prev) {
    head = node;
  } else {
    // Point our current node to the past node
    node.left = prev;
    // The past node for the next node is our current node
    prev.right = node; 
  }
  // We update the new prev node whici is our current node
  prev = node;
  // Finally convert right sub-tree
  convertBSTtoDLL(node.right);
  return head;
}

head = null;
prev = null;

function init(node) {
  let prev = new Node();
  convertBSTtoDLL(node);
  return head;
}

tree = new Node(10, new Node(12,new Node(25), new Node(30)), new Node(15, new Node(36), null));
console.log(convertBSTtoDLL(tree));