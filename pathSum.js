/*
Given the root of a binary tree and an integer targetSum, return true if the tree has
a root-to-leaf path such that adding up all the values along the path equals targetSum.

https://leetcode.com/problems/path-sum/description/
*/

// Option 1
// DFS
var hasPathSum = function(root, targetSum) {
  if(!root) {
      return 0;
  }
  
  targetSum -= root.val;
  // Check if the node is a leaf node
  if(!root.left && !root.right && targetSum === 0) {
      return true;
  }
  
  return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};

// Option 2
var hasPathSum = function(root, targetSum) {
  return helper(root, targetSum);
};

// DFS
function helper(root, target) {
  if(!root) {
      return 0;
  }
  
  target -= root.val;
  // Check if the node is a leaf node
  if(!root.left && !root.right && target === 0) {
      return true;
  }
  
  return helper(root.left, target) || helper(root.right, target);
}