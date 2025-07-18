/*
function Tree(val, left, right){
  this.val = val;
  this.left = left ? left : null;
  this.right = right ? right : null;
}

function findHeight(t){
  return getHeight(t);
}

https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

/*Recursion para obtener el height*/

function Tree(val, left, right) {
  this.val = val;
  this.left = left ? left : null;
  this.right = right ? right : null;
}

// Time O(N)
// Space O(1)
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  let left = maxDepth(root.left);
  let right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};

/*
       1
      /\
     2   3
    /\  / \
   4  5 6 7
      /\
      8 9
*/

tree = new Tree(
  1,
  new Tree(2, new Tree(4), new Tree(5, new Tree(8), new Tree(9))),
  new Tree(3, new Tree(6), new Tree(7))
);
console.log(getHeight(tree));
