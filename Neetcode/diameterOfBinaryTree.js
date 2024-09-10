/*
Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

Example:
Given a binary tree 
          1
         / \
        2   3
       / \     
      4   5    
Return 3, which is the length of the path [4,2,1,3] or [5,2,1,3].

Note: The length of path between two nodes is represented by the number of edges between them.

https://leetcode.com/problems/diameter-of-binary-tree/
*/

var diameterOfBinaryTree = function(root) {
  if(!root) {
    return 0;
  }
  let result = {max: 0};
  height(root, result);
  return result.max;
};

function height(node, result) {
  // Write your code here.
  if(!node) {
      return 0;
  }
  // Get the height of left and right branches
  let left = height(node.left, result);
  let right = height(node.right, result);
  
  // This will consider the max path between both nodes
  result.max = Math.max(left + right, result.max)
  
  return Math.max(left, right) + 1;
}