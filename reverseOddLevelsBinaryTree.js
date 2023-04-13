/*
Given the root of a perfect binary tree, reverse the node values at each odd level of the tree.

For example, suppose the node values at level 3 are [2,1,3,4,7,11,29,18], then it should become [18,29,11,7,4,3,1,2].
Return the root of the reversed tree.

A binary tree is perfect if all parent nodes have two children and all leaves are on the same level.

The level of a node is the number of edges along the path between it and the root node.

https://leetcode.com/problems/reverse-odd-levels-of-binary-tree/description/
*/

// BFS
// Time: O(N)
// Space: O(N)
var reverseOddLevels = function (root) {
  let queue = [root];
  let level = 0;
  while (queue.length) {
    // Odd level
    // Reverse the elements in the queue
    if (level % 2 !== 0) {
      let left = 0;
      let right = queue.length - 1;
      while (left < right) {
        let tmp = queue[left].val;
        queue[left].val = queue[right].val;
        queue[right].val = tmp;
        left++;
        right--;
      }
    }
    // For non-odd elements, do the normal BFS run
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    level++;
  }
  return root;
};
