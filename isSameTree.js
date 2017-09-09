/*
Given two binary trees, write a function to check if they are equal or not.

Two binary trees are considered equal if they are structurally identical and the nodes have the same value.

https://leetcode.com/problems/same-tree/description/

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

 var isSameTree = function(p, q) {
    return checkTree(p,q);
};

function checkTree(p,q){
    if(p === null && q === null) return true;
    if(p === null || q === null) return false;
    if(p.val !==  q.val)return false;
    return checkTree(p.left, q.left) && checkTree(p.right, q.right); 
}