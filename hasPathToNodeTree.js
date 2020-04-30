/*
Given a binary tree, define the path from the route to the given node

The result will be an array with the path.
*/

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

var findPath = function(root, p) {
    let path = [];
    inorder(root, p, nodePTraverse);
    return path;
}

function inorder(root, node, array) {
    // Return false if we don´t find it
    if(!root) {
        return false;
    }
    
    // Inser the element into the array
    array.push(root);
    
    // If we find the last node we are done
    if(root.val === node.val) {
        return true;
    }
    
    // Check if we can find the path from boths branches
    if(inorder(root.left, node, array) || inorder(root.right, node, array)) {
        return true
    }
    
    // Remove the node from the array if we don´t find it
    array.pop();
    return false;
}