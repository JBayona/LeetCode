/*
Given the root of a binary tree, invert the tree, and return its root.

Example 1:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

Example 2:
Input: root = [2,1,3]
Output: [2,3,1]

Example 3:
Input: root = []
Output: []

https://leetcode.com/problems/invert-binary-tree/description/
*/

// We go from top to bottom of our tree and if we reached the leaf, we do not do anything.
//If current subtree is not a leaf, we recursively call our function
// for both its children, first inverting them.
// Time O(n) where n is the number of nodes
// Time O(h) where h is the height of the tree, calls to the stack
// Recursion
var invertTree = function (root) {
  if (!root) {
    return null;
  }
  let left = invertTree(root.left);
  let right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};

// Iterative BFS
var invertTree = function (root) {
  if (!root) {
    return null;
  }
  let queue = [];
  queue.push(root);

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      let left = node.left;
      let right = node.right;
      // Invert
      node.left = right;
      node.right = left;
      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return root;
};
