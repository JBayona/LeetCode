/*
Given a binary search tree with non-negative values, find the minimum absolute difference between values of any two nodes.

Example:

Input:

   1
    \
     3
    /
   2

Output:
1

Explanation:
The minimum absolute difference is 1, which is the difference between 2 and 1 (or between 2 and 3).
https://leetcode.com/problems/minimum-absolute-difference-in-bst/
*/

var getMinimumDifference = function(root) {
  let result = Number.MAX_SAFE_INTEGER;
  let prev = -1;
  
  const inorder = (root) => {
    if(!root) {
        return;
    }
    inorder(root.left);
    if (prev !== -1){
        result = Math.min(result, Math.abs(prev - root.val));
    }
    prev = root.val;
    inorder(root.right);
  }
  
  if (root) {
      inorder(root);
  }
  
  return result;
};