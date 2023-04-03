/*
Given a Binary Search Tree (BST) with the root node root, return the minimum
difference between the values of any two different nodes in the tree.
Example :

Input: root = [4,2,6,1,3,null,null]
Output: 1
Explanation:
Note that root is a TreeNode object, not an array.

The given tree [4,2,6,1,3,null,null] is represented by the following diagram:

          4
        /   \
      2      6
     / \    
    1   3  

while the minimum difference in this tree is 1, it occurs between node 1 and node 2
also between node 3 and node 2.
https://leetcode.com/problems/minimum-distance-between-bst-nodes/
*/

var minDiffInBST = function(root) {
    prev = null;
    min = Number.MAX_SAFE_INTEGER;
    // Walking inorder will get the elements sorted
    inorder(root);
    return min;
};

function inorder(node) {
    if(!node) {
        return;
    }
    inorder(node.left);
    
    if(prev) {
        min = Math.min(min, node.val - prev.val);
    }
    prev = node;
    
    inorder(node.right);
}

// Another opcion with O(N) space
var minDiffInBST = function(root) {
    array = [];
    // Walking inorder will get the elements sorted
    inorder(root);
    let min = Number.MAX_SAFE_INTEGER;
    for(let i = 1; i < array.length; i++) {
        min = Math.min(array[i] - array[i-1], min);
    }
    return min;
};

function inorder(node) {
    if(!node) {
        return;
    }
    inorder(node.left);
    array.push(node.val);
    inorder(node.right);
}

// Get the minimun between two nodes 
/* var minDiffInBST = function(root) {
    min = Number.MAX_SAFE_INTEGER;
    minDiffInBSTHelper(root);
    return min;
};

function minDiffInBSTHelper(node) {
    if(!node) {
        return;
    }
    if(node.left) {
        min = Math.min(min, node.val - node.left.val);
    }
    if(node.right) {
        min = Math.min(min, node.right.val - node.val);
    }
    minDiffInBSTHelper(node.left);
    minDiffInBSTHelper(node.right);
}*/
