/*
Given a binary tree, determine if it is height-balanced.
For this problem, a height-balanced binary tree is defined as a binary tree in
which the depth of the two subtrees of every node never differ by more than 1.
An empty tree is height-balanced. A non-empty binary tree T is balanced if:
1) Left subtree of T is balanced.
2) Right subtree of T is balanced.
3) The difference between heights of left subtree and right subtree is not more than 1.

https://leetcode.com/problems/balanced-binary-tree/description/
*/

function TreeNode(val, left, right) {
  this.val = val || null;
  this.left = left || null;
  this.right = right || null;
}

// Time O(N)
// Get the tree length function.
function isBalanced(tree) {
  // If we reach this point, it means we were able to make it until
  // the leaf node, which is true, otherwise the recursion would have stop.
  if(!tree) {
    return true;
  }

  let leftHeight = heightTree(tree.left);
  let rightHeight = heightTree(tree.right);
  if(Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(tree.left) && isBalanced(tree.right)) {
    return true;
  }
  return false;
}

function heightTree(tree) {
  if(!tree) {
    return 0;
  }
  let left = heightTree(tree.left);
  let right = heightTree(tree.right);
  return 1 + Math.max(left, right);
}

let tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(6))), new TreeNode(3,null, new TreeNode(7)));
console.log(isBalanced(tree));
