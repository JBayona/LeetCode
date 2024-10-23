/*
Given the root of a binary tree, replace the value of each node in the tree with
the sum of all its cousins' values.

Two nodes of a binary tree are cousins if they have the same depth with different parents.
Return the root of the modified tree.
Note that the depth of a node is the number of edges in the path from the root node to it.

https://leetcode.com/problems/cousins-in-binary-tree-ii/description
*/

// The key is noticing that formula
// child's value = levelSum - (parent children's sum aka parentSum)
// Time O(N) => 2N = N
var replaceValueInTree = function (root) {
  let levelSum = {};
  // Get the sum of all levels
  traverse(root, 0, levelSum);
  console.log(levelSum);
  // pass the root.val as the parent sum to ensure it's zero
  traverseAndReplace(root, 0, root.val, levelSum);
  return root;
};

function traverse(node, level, levelSum) {
  if (!node) {
    return;
  }
  if (!(level in levelSum)) {
    levelSum[level] = node.val;
  } else {
    levelSum[level] += node.val;
  }
  traverse(node.left, level + 1, levelSum);
  traverse(node.right, level + 1, levelSum);
}

function traverseAndReplace(node, level, parentSum, levelSum) {
  if (!node) {
    return;
  }
  // Get your kids sum
  let left = node.left ? node.left.val : 0;
  let right = node.right ? node.right.val : 0;
  let kidsSum = left + right;
  node.val = levelSum[level] - parentSum;
  if (node.left) {
    traverseAndReplace(node.left, level + 1, kidsSum, levelSum);
  }
  if (node.right) {
    traverseAndReplace(node.right, level + 1, kidsSum, levelSum);
  }
}
