/*
Given the root node of a binary search tree, return the sum of values of all nodes with value between L and R (inclusive).
The binary search tree is guaranteed to have unique values.

Example 1:
Input: root = [10,5,15,3,7,null,18], L = 7, R = 15
Output: 32

Example 2:
Input: root = [10,5,15,3,7,13,18,1,null,6], L = 6, R = 10
Output: 23
 
Note:
The number of nodes in the tree is at most 10000.
The final answer is guaranteed to be less than 2^31.

https://leetcode.com/problems/range-sum-of-bst/
*/

// Opción 1
var rangeSumBST = function(root, L, R) {
    if(!root) {
        return 0;
    }
    return (root.val >= L && root.val <= R ? root.val : 0) + rangeSumBST(root.left, L, R) + rangeSumBST(root.right, L, R);
}

// Opción 2
var rangeSumBST = function(root, L, R) {
    if(!root) {
        return 0;
    }
    let left = rangeSumBST(root.left, L, R);
    let right = rangeSumBST(root.right, L, R);
    let current = root.val >= L && root.val <= R ? root.val : 0;
    return current + left + right;
};

// Iterative
var rangeSumBST = function(root, L, R) {
    if(!root) {
        return 0;
    }
    
    let queue = [];
    let result = 0;
    queue.push(root);
    while(queue.length) {
        let node = queue.shift();
        if(node.val >= L && node.val <= R) {
            result += node.val;
        }
        if(node.left) {
            queue.push(node.left);
        }
        if(node.right) {
            queue.push(node.right);
        }
    }
    return result;
};