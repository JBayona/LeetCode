/*
Given the root of a binary tree, return the same tree where every subtree
(of the given tree) not containing a 1 has been removed.

A subtree of a node node is node plus every node that is a descendant of node.

Example 1:
Input: root = [1,null,0,0,1]
Output: [1,null,0,null,1]
Explanation: 
Only the red nodes satisfy the property "every subtree not containing a 1".
The diagram on the right represents the answer.

Example 2:
Input: root = [1,0,1,0,0,0,1]
Output: [1,null,1,null,1]

Example 3:
Input: root = [1,1,0,1,1,0,1,0]
Output: [1,1,0,1,1,null,1]

https://leetcode.com/problems/binary-tree-pruning/
*/

// Option 1
var pruneTree = function (root) {
  if (!root) {
    return null;
  }
  root.left = pruneTree(root.left);
  root.right = pruneTree(root.right);
  // Node leaf, last value is 0 and it has no children
  if (root.val === 0 && !root.left && !root.right) {
    return null;
  }
  return root;
};

// Option 2
var pruneTree = function (root) {
  // Clean starting root
  if (!dfs(root)) {
    return null;
  }
  return root;
};

function dfs(root) {
  if (!root) {
    return false;
  }
  let oneSeen = root.val === 1;
  let left = dfs(root.left);
  let right = dfs(root.right);

  if (!left) {
    root.left = null;
  }

  if (!right) {
    root.right = null;
  }

  return oneSeen || left || right;
}
