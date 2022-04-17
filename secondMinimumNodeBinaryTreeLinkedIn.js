/*
Given a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly two or zero sub-node.
If the node has two sub-nodes, then this node's value is the smaller value among its two sub-nodes. More formally, the property root.val = min(root.left.val, root.right.val) always holds.

Given such a binary tree, you need to output the second minimum value in the set made of all the nodes' value in the whole tree.
If no such second minimum value exists, output -1 instead.

https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/
*/

var findSecondMinimumValue = function (root) {
  let queue = [];
  let set = new Set();
  queue.push(root);

  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      set.add(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  // Get the second minimum
  let firstMin = root.val;
  let secondMin = Number.MAX_SAFE_INTEGER;
  for (let val of set) {
    if (firstMin < val && val < secondMin) {
      secondMin = val;
    }
  }
  return secondMin < Number.MAX_SAFE_INTEGER ? secondMin : -1;
};
