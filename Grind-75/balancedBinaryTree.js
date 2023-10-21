/*
Given a binary tree, determine if it is 
height-balanced.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: true

Example 2:
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

Example 3:
Input: root = []
Output: true

https://leetcode.com/problems/balanced-binary-tree/description/
*/

var isBalanced = function (root) {
  if (!root) {
    return true;
  }

  let leftHeight = getHeight(root.left);
  let rightHeight = getHeight(root.right);
  if (
    Math.abs(leftHeight - rightHeight) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  ) {
    return true;
  }
  return false;
};

function getHeight(node) {
  if (!node) {
    return 0;
  }
  let left = getHeight(node.left);
  let right = getHeight(node.right);
  return Math.max(left, right) + 1;
}
