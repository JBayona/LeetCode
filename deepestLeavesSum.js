/*
Given a binary tree, return the sum of values of its deepest leaves.
 

Example 1:



Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
Output: 15
 

Constraints:

The number of nodes in the tree is between 1 and 10^4.
The value of nodes is between 1 and 100.

https://leetcode.com/problems/deepest-leaves-sum/
*/

var deepestLeavesSum = function(root) {
    // Track all nodes by level
    let levels = {};
    let  maxLevel = {val: Number.MIN_SAFE_INTEGER};
    getLevelUtil(root, 1, levels, maxLevel);
    
    let deepestLevel = maxLevel.val;
    
    // Get the result sum
    return levels[deepestLevel].reduce((a,b) => a+b);
};

function getLevelUtil(node, currentLevel, levels, maxLevel) {
    if(!node) {
        return 0;
    }
    
    maxLevel.val = Math.max(currentLevel, maxLevel.val);
    
    // Track the nodes in the level
    if(currentLevel in levels) {
        levels[currentLevel].push(node.val);
    } else {
        levels[currentLevel] = [node.val];
    }
    
    let downLevel = getLevelUtil(node.left, currentLevel + 1, levels, maxLevel);
    if(downLevel !== 0) {
        return downLevel;
    }
    
    downLevel = getLevelUtil(node.right, currentLevel + 1, levels, maxLevel);
    return downLevel;
}