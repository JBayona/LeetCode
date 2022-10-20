/*
Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

iReturn the number of pseudo-palindromic paths going from the root node to leaf nodes.

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
    // The frequency must have at maximum 1 odd number
    if (!root.left && !root.right) {
        return Object.keys(hash).length <= 1 ? 1 : 0;
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

// Version 3
var pseudoPalindromicPaths  = function(root) {
  let result = {count: 0};
  dfs(root, result, '');
  return result.count;
};

function dfs(root, result, str) {
  if (!root) {
      return null;
  }
  str += root.val;
  // If node is leaf
  if (!root.left && !root.right && isShiftedPalindrome(str)) {
      result.count++;
  }
  dfs(root.left, result, str);
  dfs(root.right, result, str);
}

function isShiftedPalindrome(str) {
  let hash = {};
  for (let i = 0; i < str.length; i++) {
      let c = str[i];
      if (!(c in hash)) {
          hash[c] = 0;
      }
      hash[c]++;
  }
  
  let count = 0;
  for (let prop in hash) {
      if (hash[prop] % 2 !== 0) {
          count++;
      }
      if (count > 1) {
          return false;
      }
  }
  return count <= 1;
}
