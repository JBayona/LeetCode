/*
Given the root of a binary tree, return the level order traversal of
its nodes' values. (i.e., from left to right, level by level).

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

Example 2:
Input: root = [1]
Output: [[1]]

Example 3:
Input: root = []
Output: []

https://leetcode.com/problems/binary-tree-level-order-traversal/description/
*/
// Time O(N)
// Space O(1)
var levelOrder = function (root) {
  if (!root) {
    return [];
  }

  let result = [];
  let queue = [root];

  while (queue.length) {
    let len = queue.length;
    let tmp = [];
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      tmp.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    result.push(tmp);
  }
  return result;
};
