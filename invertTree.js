/*
Invert a binary tree.
     4
   /   \
  2     7
 / \   / \
1   3 6   9

to
     4
   /   \
  7     2
 / \   / \
9   6 3   1

https://leetcode.com/problems/invert-binary-tree/description/
*/

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

var invertTree = function(root) {
  // Base case
  if(!root) {
      return null;
  };
  // This is to avoid override changes
  let tmp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(tmp);
  return root;
};

// Stack
// Iterative O(N) space and time complexity.
var invertTree = function(root) {
  if(!root) {
      return root;
  }
  
  let stack = [];
  stack.push(root);
  while(stack.length) {
    let current = stack.pop();
    let left = current.left || null;
    current.left = current.right;
    current.right = left;
    
    if(current.left) {
        stack.push(current.left);
    }
    if(current.right) {
        stack.push(current.right);
    }
  }
  
  return root;
};

// We go from top to bottom of our tree and if we reached the leaf, we do not do anything.
//If current subtree is not a leaf, we recursively call our function
// for both its children, first inverting them.
// Time O(n) where n is the number of nodes
// Time O(h) where h is the height of the tree, calls to the stack
var invertTree = function(root) {
  if(!root) {
      return null;
  }
  let left = invertTree(root.right);
  let right = invertTree(root.left);
  root.left = left
  root.right = right;
  return root;
};

tree = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7, new TreeNode(6), new TreeNode(9)));
//tree = new TreeNode(1,new TreeNode(2));
console.log(invertTree(tree));

















