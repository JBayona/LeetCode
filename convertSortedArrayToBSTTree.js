/*
Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

Example:

Given the sorted array: [-10,-3,0,5,9],

One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:

      0
     / \
   -3   9
   /   /
 -10  5

 https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
*/

var sortedArrayToBST = function(nums) {
    return sortedArrayToBSTHelper(nums, 0, nums.length - 1);
};

var sortedArrayToBSTHelper = function(nums, start, end) {
  if(nums.length === 0) return null;
  if(nums.legnth === 1) return TreeNode(nums[0]);
  
  //Casos base
  if(start > end){
      return null;
  }
  //Get the middle of element and make it root
  let mid = Math.floor((start + end)/2);
  let node = new TreeNode(nums[mid]);
  
  /* Recursively construct the left subtree and make it
  left child of root */
  node.left = sortedArrayToBSTHelper(nums, start, mid - 1);
  
  /* Recursively construct the right subtree and make it
  right child of root */
  node.right = sortedArrayToBSTHelper(nums, mid + 1, end);
  return node;
};