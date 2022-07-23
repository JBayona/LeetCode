/*
Given the root of a binary search tree, and an integer k, return the kth smallest
value (1-indexed) of all the values of the nodes in the tree.

Example 1:
Input: root = [3,1,4,null,2], k = 1
Output: 1

Example 2:
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
https://leetcode.com/problems/kth-smallest-element-in-a-bst/
*/

var kthSmallest = function (root, k) {
  let node = root;
  let stack = [];
  let count = 0;

  // Smallest elements come from left branches
  while (node) {
    stack.push(node);
    node = node.left;
  }

  while (stack.length) {
    let node = stack.pop();
    count++;
    if (count === k) {
      return node.val;
    }
    let right = node.right;
    while (right) {
      stack.push(right);
      right = right.left;
    }
  }
  return -1;
};
