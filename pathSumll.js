/*
Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.

Note: A leaf is a node with no children.

Example:

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \    / \
7    2  5   1
Return:

[
   [5,4,11,2],
   [5,8,4,5]
]

https://leetcode.com/problems/path-sum-ii/description/
*/

var pathSum = function(root, sum) {
  let result = [];
  let tmp = [];
  dfs(root, 0, tmp, result, sum);
  return result;
};

// Preorder
function dfs(node, current, tmp, result, sum) {
    // Base case
    if(!node) return;
    
    // Perform some action
    let currentSum = current + node.val;
    tmp.push(node.val)
    if(!node.left && !node.right && currentSum === sum) {
        result.push(tmp.concat());
    }

    // For each recursive call, we "save" the state of our variables
    dfs(node.left, currentSum, tmp.concat(), result, sum);
    dfs(node.right, currentSum, tmp.concat(), result, sum);
}