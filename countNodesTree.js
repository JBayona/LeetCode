/*
Given the root to a binary tree, count the total number of nodes there are.
*/

function count(root) {
  if(node) {
    return count(root.left) + count(root.right) + 1;
  } else {
    return 0;
  }
}