/*
Given a binary tree, return all root-to-leaf paths

https://leetcode.com/problems/binary-tree-paths/description/
*/

// Opción 1
function Node(val, left, right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}


var binaryTreePaths = function(root) {
    let result = [];
    let tmp = [];
    dfs(root, tmp, result);
    return result;
};

function dfs(node, helper, result){
    if(node) {
        helper.push(node.val);
        if(!node.left && !node.right){
            result.push(helper.join('->'));
            helper = []
        }
        dfs(node.left, helper.concat(), result);
        dfs(node.right, helper.concat(), result);
    }
}