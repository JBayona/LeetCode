/*
Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.


An empty tree is height-balanced. A non-empty binary tree T is balanced if:
1) Left subtree of T is balanced
2) Right subtree of T is balanced
3) The difference between heights of left subtree and right subtree is not more than 1.


https://leetcode.com/problems/balanced-binary-tree/description/


*/

function TreeNode(val, left, right) {
  this.val = val || null;
  this.left = left || null;
  this.right = right || null;
}

function heightTree(tree) {
  if(!tree) {
    return 0;
  }
  let left = heightTree(tree.left);
  let right = heightTree(tree.right);
  return 1 + Math.max(left, right);
}

function isBalanced(tree) {
  let leftHeight = null; //left height of tree
  let rightHeight = null; //right height of tree

  //If tree is empty return true
  if(!tree) {
    return true;
  }

  leftHeight = heightTree(tree.left);
  rightHeight = heightTree(tree.right);
  if(Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(tree.left) && isBalanced(tree.right)) {
    return true;
  }
  return false;
}

tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(6))), new TreeNode(3,null, new TreeNode(7)));
console.log(isBalanced(tree));
