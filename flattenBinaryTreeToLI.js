/*
Given a binary tree, flatten it to a linked list in-place.

For example, given the following tree:

    1
   / \
  2   5
 / \   \
3   4   6
The flattened tree should look like:

1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6

https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/

*/

// O(n^2)
var flatten = function(root) {
  if(!root) return;
  
  // Save pointers
  let left = root.left;
  let right = root.right;
  
  // Clean left pointer to null
  root.left = null;
  
  // Flatten both sides
  flatten(left);
  flatten(right);
  
  // At this point we have reached the last point of right so we need to first add left elements
  root.right = left;
  
  // Now iterate over the new elements so we can add the other elements we have before on right
  while(root.right) {
      root = root.right;
  }
  // Once we got the final we just need to add them at the final
  root.right = right;
  return root;
};


var flatten = function(root) {
  root = helper(root, null);
};

function helper(root, prev) {
  // Base case
  if(!root) return prev;
  
  prev = helper(root.right, prev);
  prev = helper(root.left, prev);
  root.right = prev;
  root.left = null;
  prev = root;
  return root;
}