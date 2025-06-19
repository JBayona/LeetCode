/*
Given a binary tree, find the lowest common ancestor (LCA) of two given
nodes in the tree.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined
between two nodes p and q as the lowest node in T that has both p and q as
descendants (where we allow a node to be a descendant of itself)."

https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/
 */
//Time O(N)
var lowestCommonAncestor = function (root, p, q) {
  // Base case
  if (root === null) {
    return null;
  }

  // If we found a node while traversing, return it
  if (root === p) {
    return p;
  }

  // If we found a node while traversing, return it
  if (root === q) {
    return q;
  }

  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  // If we have nodes from both, left and right, means that we
  // have found the lowest common ancestor
  // Means this is the LCA, return the current node
  if (left && right) {
    return root;
  }

  // If we reach this point it means that we have null in left or right node
  // so let's return to the parent the one is not null
  return left !== null ? left : right;
};
