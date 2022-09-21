/*
Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

Return the smallest level X such that the sum of all the values of nodes at level X is maximal.

Example 1:
Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.

Example 2:
Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2

https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/
*/

// BFS
// Time O(N)
// Space O(N)
var maxLevelSum = function(root) {
    if(!root) {
        return null;
    }
    
    let queue = [];
    queue.push([root, 1]);
    let levelResult = 0;
    let maxSumLevel = Number.MIN_SAFE_INTEGER;
    while(queue.length) {
        let tam = queue.length;
        // Reset sum
        let sum = 0;
        let node,level;
        for(let i = 0; i < tam; i++) {
            [node, level] = queue.shift();
            sum += node.val;
            if(node.left) {
                queue.push([node.left, level + 1]);
            }
            if(node.right) {
                queue.push([node.right, level + 1]);
            }
        }
        if(sum > maxSumLevel) {
            maxSumLevel = sum;
            levelResult = level;
        }
    }
    return levelResult;
};
