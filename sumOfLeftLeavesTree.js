/*
Find the sum of all left leaves in a given binary tree.
Example:

    3
   / \
  9  20
    /  \
   15   7

There are two left leaves in the binary tree, with values 9 and 15 respectively. Return 24.

https://leetcode.com/problems/sum-of-left-leaves/

*/

// Opción 1
var sumOfLeftLeaves = function (root) {
  let result = { sum: 0 };
  helper(root, result, false);
  return result.sum;
};

function helper(node, sumLeft, isLeft) {
  if (!node) {
    return;
  }
  // There's no more childrens
  if (isLeft && !node.left && !node.right) {
    sumLeft.sum += node.val;
  }
  helper(node.left, sumLeft, true);
  helper(node.right, sumLeft, false);
}

// Opción 2
var sumOfLeftLeaves = function (root) {
  let sum = 0;
  return helper(root, sum);
};

function helper(node, sum) {
  if (!node) {
    return sum;
  }
  if (node.left && !node.left.left && !node.left.right) {
    sum += node.left.val;
  }
  sum = helper(node.left, sum);
  sum = helper(node.right, sum);
  return sum;
}

// Iterative approach
var sumOfLeftLeaves = function (node) {
  let stack = [];
  let sum = 0;

  if (!node) {
    return 0;
  }

  stack.push(node);

  while (stack.length) {
    let node = stack.pop();
    if (node.left) {
      // Check if the node comes from a leave node (there's no children)
      if (!node.left.left && !node.left.right) {
        sum += node.left.val;
      } else {
        stack.push(node.left);
      }
    }

    // If we have right nodes
    if (node.right) {
      // Check if we the right node has a left children, if yes, we need to consider it
      if (node.right.left || node.right.right) {
        stack.push(node.right);
      }
    }
  }

  return sum;
};

// Opción 5
var sumOfLeftLeaves = function (node) {
  if (!node) {
    return 0;
  }
  let sum = 0;
  if (node.left) {
    if (!node.left.left && !node.left.right) {
      sum += node.left.val;
    } else {
      sum += sumOfLeftLeaves(node.left);
    }
  }
  sum += sumOfLeftLeaves(node.right);
  return sum;
};
