/*
Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

For example:
Given the below binary tree and sum = 22,
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.

https://leetcode.com/problems/path-sum/description/

*/

function TreeNode(val, left,right){
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}
   
var hasPathSum = function(root, sum) {
    if(!root) return false;
    return checkPathSum(root,sum, 0);
};

function checkPathSum(node,target, curr){
    if(node === null){
        return false;
    }
    let currSum = curr + node.val;
    if(currSum === target && !node.left && !node.right){
      return true;
    }
    return checkPathSum(node.left,target,currSum) || checkPathSum(node.right,target,currSum);
}

tree = new TreeNode(1);
k = 1;
console.log(hasPathSum(tree,k));