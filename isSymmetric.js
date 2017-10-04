/*
Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3
But the following [1,2,2,null,3,null,3] is not:
    1
   / \
  2   2
   \   \
   3    3
Note:
Bonus points if you could solve it both recursively and iteratively.

https://leetcode.com/problems/symmetric-tree/description/
*/

function Tree(val, left, right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

var isSymmetric = function(root) {
  if(root === null) return true;
  return checkSymetric(root.left, root.right);
};

function checkSymmetric(a,b){
  if(a === null && b === null) return true;
  if(!a || !b) return false;
  if(a.val !== b.val) return false;
  return checkSymmetric(a.left, b.right) && checkSymmetric(a.right, b.left);
}

tree = new Tree(1, new Tree(2, new Tree(3), new Tree(4)), new Tree(2, new Tree(4), new Tree(3)));
console.log(isSymmetric(tree));