/*
Given a binary tree root, a node X in the tree is named good if in the path
from root to X there are no nodes with a value greater than X.
Return the number of good nodes in the binary tree.

Example 1:
Input: root = [3,1,4,3,null,1,5]
Output: 4

Explanation: Nodes in blue are good.
Root Node (3) is always a good node.
Node 4 -> (3,4) is the maximum value in the path starting from the root.
Node 5 -> (3,4,5) is the maximum value in the path
Node 3 -> (3,1,3) is the maximum value in the path.

Example 2:
Input: root = [3,3,null,4,2]
Output: 3
Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.

Example 3:
Input: root = [1]
Output: 1
Explanation: Root is considered as good.

https://leetcode.com/problems/count-good-nodes-in-binary-tree/
*/

// DFS
var goodNodes = function(root) {
    let max = {n: 0};
    dfs(root, max, root.val);
    return max.n;
};

function dfs(root, result, currentMax) {
    if(!root) {
        return;
    }
    if (root.val >= currentMax) {
        result.n++;
    }
    let max = Math.max(root.val, currentMax);
    dfs(root.left, result, max);
    dfs(root.right, result, max);
}

// BFS
var goodNodes = function(root) {
    let queue = [];
    let result = 0;
    
    queue.push({node: root, max: root.val});
    while(queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let {node, max} = queue.shift();
            let newMax = Math.max(max, node.val);
            if (node.val >= max) {
                result++;
            }
            
            if (node.left) {
                queue.push({node: node.left, max: newMax});
            }
            
            if (node.right) {
                queue.push({node: node.right, max: newMax});
            }
        }
    }
    return result;
};
