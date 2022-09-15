/*
Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

Return the number of pseudo-palindromic paths going from the root node to leaf nodes.

https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/
*/

// Version 1
var pseudoPalindromicPaths  = function(root) {
  return dfs(root, {});
};

function dfs(root, hash) {
  if (!root) {
      return 0;
  }
  if (root.val in hash) {
      delete hash[root.val];
  } else {
      hash[root.val] = 1;
  }
  // If node is leaf
  if (!root.left && !root.right) {
      return Object.keys(hash).length <= 1;
  }
  return dfs(root.left, {...hash}) + dfs(root.right, {...hash});
}

// Version 2
var pseudoPalindromicPaths  = function(root) {
  return dfs(root, {});
};

function dfs(root, hash) {
  if (!root) {
      return 0;
  }
  if (root.val in hash) {
      delete hash[root.val];
  } else {
      hash[root.val] = 1;
  }
  // If node is leaf
  if (!root.left && !root.right) {
      return Object.keys(hash).length <= 1;
  }
  let left = dfs(root.left, {...hash});
  let right = dfs(root.right, {...hash});
  return left + right;
}