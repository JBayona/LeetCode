/*
Given the root of a binary search tree, rearrange the tree in in-order so that the
leftmost node in the tree is now the root of the tree, and every node has no left child and only one right child.

https://leetcode.com/problems/increasing-order-search-tree/
*/

// Time O(N)
// Space O(N)
var increasingBST = function(root) {
    let values = [];
    // Walk inorder
    inorder(root, values);
    
    let res = new TreeNode(0);
    let current = res;
    for(let i = 0; i < values.length; i++) {
        current.right = new TreeNode(values[i]);
        current = current.right;
    }
    return res.right;
};

function inorder(root, arr) {
    if(!root) {
        return;
    }
    inorder(root.left, arr);
    arr.push(root.val);
    inorder(root.right, arr);
}

// Option 2 - Construct on the fly

// Time O(N)
// Space O(H) where H is the height of the tree
let curr;
var increasingBST = function(root) {
    let resp = new TreeNode(0);
    // Walk inorder and construct on the fly
    curr = resp;
    inorder(root, curr);
    return resp.right;
};

function inorder(node) {
    if(!node) {
        return;
    }
    inorder(node.left);
    node.left = null;
    curr.right = node;
    curr = node;
    inorder(node.right);
}