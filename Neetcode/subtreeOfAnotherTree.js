/*
Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and
node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants.
The tree s could also be considered as a subtree of itself.

Example 1:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
Given tree t:
   4 
  / \
 1   2
Return true, because t has the same structure and node values with a subtree of s.
Example 2:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
    /
   0
Given tree t:
   4
  / \
 1   2
Return false.

https://leetcode.com/problems/subtree-of-another-tree/
*/

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

// Option 1
// Time O(M * N)
var isSubtree = function (p, q) {
  if (!p) {
    return false;
  }
  // Check if trees are the same
  if (isSame(p, q)) {
    return true;
  }
  // Check both options
  return isSubtree(p.left, q) || isSubtree(p.right, q);
};

function isSame(p, q) {
  // Both already are null
  if (p === null && q === null) {
    return true;
  }

  // One of the nodes are not null and the other is
  if (p === null || q === null) {
    return false;
  }
  // Values are different
  if (p.val !== q.val) {
    return false;
  }
  // Check for sides
  return isSame(p.left, q.left) && isSame(p.right, q.right);
}

// Option 2
var isSubtree = function (s, t) {
  return traverse(s, t);
};

// Consider every node as root of the subtree considered
function traverse(s, t) {
  if (!s) {
    return false;
  }
  // Check for both possible branches
  return equals(s, t) || traverse(s.left, t) || traverse(s.right, t);
}

// Check equality
function equals(s, t) {
  if (!s && !t) {
    return true;
  }
  if (!s || !t) {
    return false;
  }
  return s.val === t.val && equals(s.left, t.left) && equals(s.right, t.right);
}
