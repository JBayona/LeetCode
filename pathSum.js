/*
Given the root of a binary tree and an integer targetSum, return true if the tree has
a root-to-leaf path such that adding up all the values along the path equals targetSum.

https://leetcode.com/problems/path-sum/description/
*/

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