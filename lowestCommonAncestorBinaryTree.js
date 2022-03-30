/*
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the
lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.

Example 3:
Input: root = [1,2], p = 1, q = 2
Output: 1

https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
*/

var lowestCommonAncestor = function(root, p, q) {
    // Base case
    if(root === null) {
        return null;
    }
    
    // If we found a node while traversing, return it
    if(root.val === p.val) {
        return root;
    }
    
    // If we found a node while traversing, return it
    if(root.val === q.val) {
        return root;
    }
    
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    
    // If we have nodes from both, left and right, means that we
    // have found the lowest common ancestor
    // Means this is the LCA, return the current node
    if(left && right) {
        return root;
    }
    
    // If we reach this point it means that we have null in left or right node
    // so let's return to the parent the one is not null
    return left ? left : right;
};