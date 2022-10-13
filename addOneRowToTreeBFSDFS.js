/*
Given the root of a binary tree and two integers val and depth, add a row of nodes with
value val at the given depth depth.

Note that the root node is at depth 1.
The adding rule is:

Given the integer depth, for each not null tree node cur at the depth depth - 1, create two tree
nodes with value val as cur's left subtree root and right subtree root.
cur's original left subtree should be the left subtree of the new left subtree root.
cur's original right subtree should be the right subtree of the new right subtree root.
If depth == 1 that means there is no depth depth - 1 at all, then create a tree node with value val
as the new root of the whole original tree, and the original tree is the new root's left subtree.
 

Example 1:
Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]

Example 2:
Input: root = [4,2,null,3,1], val = 1, depth = 3
Output: [4,2,null,1,1,3,null,null,1]

https://leetcode.com/problems/add-one-row-to-tree/description/
*/

// BFS
var addOneRow = function (root, val, depth) {
  // This is the root
  if (depth === 1) {
    let newNode = new TreeNode(val);
    newNode.left = root;
    return newNode;
  }

  let queue = [];
  queue.push(root);
  let count = 0;
  while (queue.length) {
    let n = queue.length;
    count++;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      if (count !== depth - 1) {
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      } else {
        // Create a new node
        let newNodeLeft = new TreeNode(val);
        // First put left of current to new node
        newNodeLeft.left = node.left;
        // Now current of left becomes newNode
        node.left = newNodeLeft;

        // Create a new node
        let newNodeRight = new TreeNode(val);
        // First put right of current to new node
        newNodeRight.right = node.right;
        // Now current of right becomes newNode
        node.right = newNodeRight;
      }
    }
  }
  return root;
};

// DFS
var addOneRow = function(root, val, depth) {
  if (depth === 1) {
      return new TreeNode(val, root, null);
  } else if (depth === 2) {
      root.left = new TreeNode(val, root.left, null);
      root.right = new TreeNode(val, null, root.right);
  } else {
      if (root.left != null) {
          addOneRow(root.left, val, depth - 1);
      }
      if (root.right != null) {
          addOneRow(root.right, val, depth - 1);
      }
  }
  return root;
};