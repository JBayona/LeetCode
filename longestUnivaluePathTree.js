/*
Given a binary tree, find the length of the longest path where each node in the path has
the same value. This path may or may not pass through the root.

The length of path between two nodes is represented by the number of edges between them.

Example 1:

Input:

              5
             / \
            4   5
           / \   \
          1   1   5
Output: 2

 

Example 2:

Input:

              1
             / \
            4   5
           / \   \
          4   4   5

https://leetcode.com/problems/longest-univalue-path/
*/

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

var longestUnivaluePath = function(root) {
    console.log(root);
    max = Number.MIN_SAFE_INTEGER;
    longestUnivaluePathHelper(root, root.val, 0);
    return max;
};

function longestUnivaluePathHelper(node, val, count) {
    if(!node) {
        return 0;
    }
    if(node.val == val) {
        count++;
    } else {
        count = 0;
    }
    let leftCount = longestUnivaluePathHelper(node.left, node.val, count);
    let rightCount = longestUnivaluePathHelper(node.right, node.val, count);
    max = Math.max(leftCount + rightCount, max);

    if(node.val === val) {
        return Math.max(leftCount, rightCount) + 1;
    }
    return count;
}

//let tree = new TreeNode(5, new TreeNode(4, new TreeNode(1), new TreeNode(1)), new TreeNode(5, null, new TreeNode(5))); // 2
let tree = new TreeNode(1, new TreeNode(4, new TreeNode(4), new TreeNode(4)), new TreeNode(5, null, new TreeNode(5))); // 2
console.log(longestUnivaluePath(tree));