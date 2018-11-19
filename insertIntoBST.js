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

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */

 // If tree is balanced O(logN), if not O(N)
var insertIntoBST = function(root, val) {
  let newRoot = root;
  insertValue(root, val);
  return newRoot;
};

function insertValue(root, val) {
  // Base Case (node not found and insert it value)
  if(root === null) {
    return new TreeNode(val);
  } else {
    if(val < root.val) {
      root.left = insertValue(root.left, val);
    } else {
      root.right = insertValue(root.right, val);
    }
    return root;
  }
}

// Iterative

var insertIntoBST = function(root, val) {
  let newRoot = root;
  insertValue(root, val);
  return newRoot;
};

// Iterative solution
// O(N) time complexity
function insertValue(root, val) {
    let node = root;
    while(true) {
        if(val < node.val) {
            if(node.left) {
                node = node.left;
                continue;
            } else {
                node.left = new TreeNode(val);
                break;
            }
        } else {
            if(node.right) {
                node = node.right;
                continue;
            } else {
                node.right = new TreeNode(val);
                break;
            }
        }
    }
    return root;
}