/*
Given preorder and inorder traversal of a tree, construct the binary tree.

Note:
You may assume that duplicates do not exist in the tree.
https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
http://www.geeksforgeeks.org/construct-tree-from-given-inorder-and-preorder-traversal/
*/

// You may think why do we need both the preorder and inorder arrays?
// Because if we simply have only 1 of them, we don't know whether the elements are
// left or right children. Image a preorder of: [1,2,3]
// Is 2 on the right side or left side? we don't know. This is the reason for both the formats.

// What do we know about inorder traversal?
// All the elements are traversed left to right. This property will help us with building the final tree
// What do we know about preorder traversal?
// We first scan the "root" and then go to it's children (left and then right).
// With this we know what element is the root of the current level.
// Time O(N)
// preorder = [3,9,20,15,7]
// inorder = [9,3,15,20,7]
// [   9,  3, 15, 20, 7]
// <- left   right ->
var buildTree = function(preorder, inorder) {
  if(preorder.length === 0 || inorder.length === 0) return null;
  let n = preorder.length;
  let preIndex = {index: 0};
  return constructTree(inorder,preorder,0,n-1,preIndex);
};

function constructTree(inorder,preorder,inStart,inEnd,preIndex){
  //Base Case
  if(inStart > inEnd) return null;
  // Root node
  let node = new TreeNode(preorder[preIndex.index]);
  preIndex.index++;
  //If there is no more children
  if(inStart === inEnd) return node;
  // Divide and conquer
  // index has the index of the root
  let index = inorder.indexOf(node.val);
  // Find the left children
  node.left = constructTree(inorder,preorder,inStart, index-1, preIndex);
  // Find the right children
  node.right = constructTree(inorder,preorder,index+1, inEnd, preIndex);
  return node;
}

//inorder = [2, 1, 3]
//post = [2, 3, 1];
inorder = ["D", "B", "E", "A", "F", "C"];
preoder = ["A", "B", "D", "E", "C", "F"];
console.log(main(inorder, preoder));
