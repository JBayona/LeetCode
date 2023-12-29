/*
Given a binary tree, return the inorder traversal of its nodes' values.
For example:
Given binary tree [1,null,2,3],
   1
    \
     2
    /
   3
return [1,3,2].
Note: Recursive solution is trivial, could you do it iteratively?

https://leetcode.com/problems/binary-tree-inorder-traversal/description/
*/

function Tree(val, left, right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

var inorderTraversal = function(root) {
  let stack = [];
  let result = [];
  let cur = root;
  while (stack.length > 0 || cur !== null) {
      if (cur !== null) {
          stack.push(cur);
          cur = cur.left;
      } else {
          cur = stack.pop();
          result.push(cur.val);
          cur = cur.right;
      }
  }
  return result;
};

tree = new Tree(1,null, new Tree(2,new Tree(3), null));
console.log(inorderTraversal(tree));
