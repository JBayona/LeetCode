/*
Given the root of a binary tree, find the maximum value V for which there exists
different nodes A and B where V = |A.val - B.val| and A is an ancestor of B.
(A node A is an ancestor of B if either: any child of A is equal to B
or any child of A is an ancestor of B.)

Example 1:
Input: [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
Explanation: 
We have various ancestor-node differences, some of which are given below :
|8 - 3| = 5
|3 - 7| = 4
|8 - 1| = 7
|10 - 13| = 3
Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.

https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/
*/

// Run preorder and for each subtree keep track of
// the maximum and minimum values seen to get the
// calculations
var maxAncestorDiff = function(root) {
    if(!root) {
        return 0;
    }
    maxDiff = Number.MIN_SAFE_INTEGER;
    preorder(root, root.val, root.val);
    return maxDiff;
};

function preorder(node, min, max) {
    if(!node) {
        return;
    }
    // Get the difference between the current node against the minimum
    // and the maximum nodes to find the max difference
    let diffMinNodeWithCurrent = Math.abs(node.val - min);
    let diffMaxNodeWithCurrent = Math.abs(node.val - max);
    maxDiff = Math.max(maxDiff, Math.max(diffMinNodeWithCurrent, diffMaxNodeWithCurrent));
    if(node.left) {
        preorder(node.left, Math.min(node.val, min), Math.max(node.val, max));
    }
    if(node.right) {
        preorder(node.right, Math.min(node.val, min), Math.max(node.val, max));
    }
}
