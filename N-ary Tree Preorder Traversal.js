/*
Given an n-ary tree, return the preorder traversal of its nodes' values.

For example, given a 3-ary tree:

Return its preorder traversal as: [1,3,5,6,2,4].

Note:

Recursive solution is trivial, could you do it iteratively?

https://leetcode.com/problems/n-ary-tree-preorder-traversal/
*/


// Recursive
var preorder = function(root) {
  let result = [];
  helper(root, result);
  return result;
};

function helper(root, result) {
  if(!root) {
    return;
  }
  
  result.push(root.val);
  for(let i = 0; i < root.children.length; i++) {
    helper(root.children[i], result);
  }
}


// Iterative
var preorder = function(root) {
  let result = [];
  let stack = [];
  
  if(!root) {
    return [];
  }
  
  stack.push(root);
  
  while(stack.length) {
    let node = stack.pop();
    result.push(node.val);
    for(let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
  
  return result;
};