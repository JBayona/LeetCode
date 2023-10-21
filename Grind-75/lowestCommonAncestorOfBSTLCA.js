/*
Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two
given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined
between two nodes p and q as the lowest node in T that has both p and q as
descendants (where we allow a node to be a descendant of itself).”

Example 1:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.

Example 2:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

Example 3:
Input: root = [2,1], p = 2, q = 1
Output: 2

https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/
*/

var lowestCommonAncestor = function (root, p, q) {
  // Base case
  if (!root) {
    return null;
  }

  // If we find the node p, return it
  if (root === p) {
    return p;
  }

  // If we find the node q, return it
  if (root === q) {
    return q;
  }

  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  // If both nodes are found, this means we have the
  // common ancestor
  if (left && right) {
    return root;
  }

  // If we reach this point, it means either left or right is empty
  return left ? left : right;
};
