/*
You are given a binary tree in which each node contains an integer value.

Find the number of paths that sum to a given value.

The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.

Example:

root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

Return 3. The paths that sum to 8 are:

1.  5 -> 3
2.  5 -> 2 -> 1
3. -3 -> 11

https://leetcode.com/problems/path-sum-iii/description/
*/

var pathSum = function(root, sum) {
    if(!root) return 0;
    let result = {count: 0};
    dfs(root, sum, result);
    return result.count;
};

// Walk over all the nodes to check all the children
// We are walking preorder but we can do it inorder or postorder with the same result
function dfs(node, sum, result) {
    // Base case
    if(node === null) {
        return;
    }
    
    checkPathSum(node, sum, result);
    dfs(node.left, sum, result);
    dfs(node.right, sum, result);
}

// Check all the nodes for each node
function checkPathSum(node, sum, result, curr) {
    // Base case
    if(node === null) {
        return;
    }
    
    if(node.val === sum) {
        result.count++;
    }
    checkPathSum(node.left, sum-node.val, result);
    checkPathSum(node.right, sum-node.val, result);
}