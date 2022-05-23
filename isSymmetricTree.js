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

// Recursive.
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

// Iterative
var isSymmetric = function(root) {
  if(!root) {
      return true;
  }
  let queue = [];
  queue.push(root);
  
  
  while(queue.length) {
      let n = queue.length;
      let tmp = [];
      let values = [];
      for(let i = 0; i < n; i++) {
          let node = queue.shift();
          tmp.push(node.val);
          
          let left = node.left ? node.left.val : null;
          let right = node.right ? node.right.val : null;
          
          // Insert both regardless they are null
          values.push(left);
          values.push(right);
          
          // console.log(node.val);
          if(node.left) {
              queue.push(node.left);
          }
          if(node.right) {
              queue.push(node.right);
          }
      }
      
      let indexA = 0;
      let indexB = values.length - 1;
      while(indexA < indexB) {
          if(values[indexA++] !== values[indexB--]) {
              return false;
          }
      }
  }
  return true;
};

tree = new Tree(1, new Tree(2, new Tree(3), new Tree(4)), new Tree(2, new Tree(4), new Tree(3)));
console.log(isSymmetric(tree));
