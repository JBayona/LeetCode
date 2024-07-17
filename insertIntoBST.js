/*
Given the root node of a binary search tree (BST) and a value to be inserted into the tree, insert the value into the BST. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

Note that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

For example, 
Given the tree:
        4
       / \
      2   7
     / \
    1   3
And the value to insert: 5
You can return this binary search tree:

         4
       /   \
      2     7
     / \   /
    1   3 5
This tree is also valid:

         5
       /   \
      2     7
     / \   
    1   3
         \
          4

https://leetcode.com/problems/insert-into-a-binary-search-tree/description/
*/

 // Time O(N)
 var insertIntoBST = function(root, val) {
  if (root === null) {
      return new TreeNode(val);
  }
  if (val < root.val) {
      root.left = insertIntoBST(root.left, val);
  } else {
      root.right = insertIntoBST(root.right, val);
  }
  return root;
};

// Iterative
var insertIntoBST = function(root, val) {
  let newNode = new TreeNode(val);

  if (!root) {
      return newNode;
  }
  
  let tmp = root;
  let node = root;
  // This will iterate until the desire position
  while (node) {
      // Track the reference on the existing node
      tmp = node;
      if (val < node.val) {
          node = node.left;
      } else {
          node = node.right
      }
  }

  // Append the node where the position should be inserted
  if (val < tmp.val) {
      tmp.left = newNode;
  } else {
      tmp.right = newNode;
  }

  return root;
};