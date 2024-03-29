/*
Given a binary tree, return the preorder traversal of its nodes' values.
Example:
Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,2,3]
Follow up: Recursive solution is trivial, could you do it iteratively?

https://leetcode.com/problems/binary-tree-preorder-traversal/
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
