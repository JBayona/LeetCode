// Tree traversals
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

// Postorder

// Iterative
/*
The idea is to move down to leftmost node using left pointer.
While moving down, push root and root’s right child to stack. Once we reach leftmost node
print it if it doesn’t have a right child. If it has a right child, then change root so
that the right child is processed before.
*/
var postorderTraversal = function(root) {
    if(!root) {
        return [];
    }
    let current = root;
    let stack = [];
    let result = [];
    
    while(true) {
        while(current) {
            // Push root's right child and then root to stack
            if(current.right) {
                stack.push(current.right);
            }
            stack.push(current);
            
            // Set root as root's left child 
            current = current.left;
        }
        // Pop item and set if as root
        current = stack.pop();

        // If the popped item has a right child and the 
        // right child is not processed yet, then make sure
        // right child is processed before root
        if(current.right && stack[stack.length-1] === current.right) {
            stack.pop(); // Remove the right child from the stack
            stack.push(current); // Push root back to stack
            current = current.right; // Change root so that the right child is processed next
        } else {
            // print root's data and set root as null
            result.push(current.val);
            current = null;
        }
        // We are done
        if(stack.length <= 0) {
            break;
        }
    }
    return result;
};

// Recursive
var postorderTraversal = function(root) {
    let result = [];
    postorderTraversalHelper(root, result);
    return result;
};

function postorderTraversalHelper(root, result) {
    if(!root) {
        return [];
    }
    postorderTraversalHelper(root.left, result);
    postorderTraversalHelper(root.right, result);
    result.push(root.val);
}
