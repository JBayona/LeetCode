/*
Given an n-ary tree, return the postorder traversal of its nodes' values.

For example, given a 3-ary tree:

Return its postorder traversal as: [5,6,3,2,4,1].

Note:

Recursive solution is trivial, could you do it iteratively?

https://leetcode.com/problems/n-ary-tree-postorder-traversal/

*/

// Recursive
var postorder = function(root) {

  if(!root){
    return [];
  } 

  let result = [];
  helper(root, result);
  return result;
};

function helper(node, result) {
  if(!node) {
    return;
  }
  
  // Visit all children
  for(let i = 0; i < node.children.length; i++) {
    helper(node.children[i], result);
  }
  
  result.push(node.val);
}

// Iterativo
var postorder = function(root) {
  if(!root) {
    return [];
  }
  
  let stack = [];
  let result = [];
  stack.push(root);
  
  while(stack.length) {
    let node = stack.pop();
    result.push(node.val);
    for(let i = 0; i < node.children.length; i++) {
      stack.push(node.children[i]);
    }
  }
  
  return result.reverse();
};