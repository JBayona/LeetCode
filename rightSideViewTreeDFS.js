/*
Given a binary tree, imagine yourself standing on the right side of it, return the
values of the nodes you can see ordered from top to bottom.

Example:

Input: [1,2,3,null,5,null,4]
Output: [1, 3, 4]
Explanation:

   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---

https://leetcode.com/problems/binary-tree-right-side-view/
*/

// DFS Postorder
var rightSideView = function(root) {
    let hash = {};
    let result = [];
    
    if(!root) {
        return [];
    }
    dfs(root, 0, hash, result);
    return result;
};

function dfs(root, depth, hash, result) {
    if(!root) {
        return;
    }
    if(!(depth in hash)) {
        result.push(root.val);
        hash[depth] += 1;
    }
    dfs(root.right, depth + 1, hash, result);
    dfs(root.left, depth + 1, hash, result);
}