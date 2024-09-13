/*
Given a binary tree, determine if it is a valid binary search tree (BST).
Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Example 1:
    2
   / \
  1   3
Binary tree [2,1,3], return true.

Example 2:
    1
   / \
  2   3
Binary tree [1,2,3], return false.

https://leetcode.com/problems/validate-binary-search-tree/description/
*/

// Time O(N)
var isValidBST = function(root) {
  return isValid(root, -Infinity, Infinity);
};

function isValid(node, min, max) {
  if(!node) {
      return true;
  }
  // Min should be less than the current val and Max greater
  // if this is not true, it's not a valid tree.
  if (min >= node.val || max <= node.val) {
      return false;
  }
  return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);
}