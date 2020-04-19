// Tree traversal

// Preorder

/*
It is O (n) where n is the number of nodes in the tree. It is simply because
the algorithm will need to visit every node exactly once.
*/

// Iterative
// https://www.youtube.com/watch?v=elQcrJrfObg&t=213s
var preorderTraversal = function(root) {
    
    if(!root) {
        return [];
    }
    
    let stack = [];
    let result = [];
    stack.push(root);
    
    while(stack.length){
        let node = stack.pop();
        result.push(node.val);
        if(node.right){
            stack.push(node.right);
        }
        if(node.left){
            stack.push(node.left);
        }
    }
    return result;
};

// Recursive

var preorderTraversal = function(root) {
    let result = [];
    preorder(root, result);
    return result;
};

function preorder(node, result) {
    if(!node) {
        return;
    }
    // Do something with the node
    result.push(node.val);
    preorder(node.left, result);
    preorder(node.right, result);
}

// Inorder

// Iterative
var inorderTraversal = function(root) {
    if(!root) {
        return [];
    }
    let result = [];
    let stack = [];
    let current = root;
    
    while(true) {
        // reach the left most node of the current node 
        if(current) {
            // Place pointer to a tree node on the stack  
            // before traversing the node's left subtree
            stack.push(current);
            current = current.left;
        } else {
            // Backtrack the empty subtree and visit the top node, if the stack
            // is empty we  are done
            if(!stack.length) {
                break;
            }
            current = stack.pop();
            result.push(current.val);
            current = current.right;
        }
    }
    return result;
};

// Recursive
var inorderTraversal = function(root) {
    let result = [];
    inorderTraversalHelper(root, result);
    return result;
};

function inorderTraversalHelper(root, result) {
    if(!root) {
        return;
    }
    inorderTraversalHelper(root.left, result);
    result.push(root.val);
    inorderTraversalHelper(root.right, result);
}