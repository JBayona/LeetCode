/*
A full binary tree is a binary tree where each node has exactly 0 or 2 children.

Return a list of all possible full binary trees with N nodes.
 Each element of the answer is the root node of one possible tree.

Each node of each tree in the answer must have node.val = 0.

You may return the final list of trees in any order.

Example 1:

Input: 7
Output: [[0,0,0,null,null,0,0,null,null,0,0],
[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0]
[0,0,0,0,0,null,null,0,0]]

https://leetcode.com/problems/all-possible-full-binary-trees/
*/

memo = [[null]];
var allPossibleFBT = function(N) {
    if (memo[N]) {
        return memo[N];
    } 
    
    const ans = [];
    if(N % 2 === 0) {
        return [];
    }
    // we can only construct the full binary tree if we have an odd N
    for (let i = 0; i < N; i++) {
        let left = allPossibleFBT(i);
        let right = allPossibleFBT(N - 1 - i);
        for (let lt of left) {
            for (let rg of right) {
                const node = new TreeNode(0);
                node.left = cloneTree(lt);
                node.right = cloneTree(rg);
                ans.push(node);
            }
        }
    }
    
    memo[N] = ans;
    return memo[N];
};

function cloneTree(node) {
    if (node == null) return null;
    
    const root = new TreeNode(node.val);
    root.left = cloneTree(node.left);
    root.right = cloneTree(node.right);
    return root;
};