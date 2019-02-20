/*
A binary tree is univalued if every node in the tree has the same value.

Return true if and only if the given tree is univalued.

 

Example 1:


Input: [1,1,1,1,1,null,1]
Output: true
Example 2:


Input: [2,2,2,5,2]
Output: false

https://leetcode.com/problems/univalued-binary-tree/

*/

// Recursive
var isUnivalTree = function(root) {
    if(!root) {
        return false;
    }
    let val = root.val;
    return helper(root, val);
};

function helper(node, val) {
    if(!node) {
        return true;
    }
    if(node.val !== val) {
        return false;
    }
    return helper(node.left, node.val) && helper(node.right, node.val);
}

// Iterative
var isUnivalTree = function(root) {
    if(!root) {
        return true;
    }
    
    let queue = [];
    let val = null;
    queue.push(root);
    val = root.val;
    
    while(queue.length) {
        let node = queue.shift();
        
        if(node.val !== val) {
            return false;
        }
        
        if(node.left) {
            queue.push(node.left);
        }
        
        if(node.right) {
            queue.push(node.right);
        }
    }
    
    return true;
};