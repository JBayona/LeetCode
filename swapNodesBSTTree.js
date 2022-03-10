/*
You are given the root of a binary search tree (BST), where the values of exactly two
nodes of the tree were swapped by mistake. Recover the tree without changing its structure.

Example 1:
Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.

Example 2:
Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.

https://leetcode.com/problems/recover-binary-search-tree/
*/

var recoverTree = function (root) {
  let arr = [];
  // Iterating a BST in inorder the array should be sorted
  inorder(root, arr);
  // As there are two swap nodes, we need to find the difference
  let sorted = Array.from(arr);
  // Get the sorted array
  sorted.sort((a, b) => a - b);
  // Find the difference of nodes
  let nodes = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== sorted[i]) {
      nodes[arr[i]] = sorted[i];
      nodes[sorted[i]] = arr[i];
      break;
    }
  }
  swapNodes(root, nodes);
  return root;
};

function swapNodes(root, nodes) {
  if (!root) {
    return;
  }
  swapNodes(root.left, nodes);
  // Swap the nodes
  if (root.val in nodes) {
    root.val = nodes[root.val];
  }
  swapNodes(root.right, nodes);
}

function inorder(root, arr) {
  if (!root) {
    return;
  }
  inorder(root.left, arr);
  arr.push(root.val);
  inorder(root.right, arr);
}
