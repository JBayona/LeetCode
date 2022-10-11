/*
Given the root of a Binary Search Tree and a target number k, return true if there
exist two elements in the BST such that their sum is equal to the given target.

https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
 var findTarget = function(root, k) {
  let memo = {};
  return dfs(root, k, memo);
};

function dfs (node, k, memo) {
  if (!node) {
      return false;
  }
  let tmp = k - node.val;
  if (tmp in memo) {
      return true;
  }
  memo[node.val] = true;
  return dfs (node.left, k, memo) || dfs (node.right, k, memo);
}