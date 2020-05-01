/*
Given a binary tree, write a function to get the maximum width of the given tree. The width of a tree is the maximum width among all levels. The binary tree has the same structure as a full binary tree, but some nodes are null.

The width of one level is defined as the length between the end-nodes (the leftmost and right most non-null nodes in the level, where the null nodes between the end-nodes are also counted into the length calculation.

Example 1:

Input: 

           1
         /   \
        3     2
       / \     \  
      5   3     9 

Output: 4
Explanation: The maximum width existing in the third level with the length 4 (5,3,null,9).
Example 2:

Input: 

          1
         /  
        3    
       / \       
      5   3     

Output: 2
Explanation: The maximum width existing in the third level with the length 2 (5,3).
Example 3:

Input: 

          1
         / \
        3   2 
       /        
      5      

Output: 2
Explanation: The maximum width existing in the second level with the length 2 (3,2).
Example 4:

Input: 

          1
         / \
        3   2
       /     \  
      5       9 
     /         \
    6           7
Output: 8
Explanation:The maximum width existing in the fourth level with the length 8 (6,null,null,null,null,null,null,7).


Note: Answer will in the range of 32-bit signed integer.

https://leetcode.com/problems/maximum-width-of-binary-tree/
*/

// Time complexity O(N)
var widthOfBinaryTree = function(root) {
    if(!root) {
        return 0;
    }
    
    let queue = [];
    queue.push({node: root, index: 0});
    let maxWidth = Number.MIN_SAFE_INTEGER;
    while(queue.length) {
        let size = queue.length;
        for(let i = 0; i < size; i++) {
            let queueNode = queue.shift();
            let node = queueNode.node;
            let index = queueNode.index;
            if(node.left) {
                queue.push({node: node.left, index: index*2});
            }
            if(node.right) {
                queue.push({ node: node.right, index: 2*index+1});
            }
            let left = 0;
            let right = 0;
            if(i === 0) { // Mark the leftmost node
                left = index;
            }
            if(i === size - 1) { // Update with the rightmost node
                maxWidth = Math.max(maxWidth, index - left + 1);
            }
        }
    }
    return maxWidth;
};

from collections import deque
class Solution:
    def widthOfBinaryTree(self, root: TreeNode) -> int:
        q = deque()
        q.append((root, 0))
        result = 0
        while len(q) > 0:
            lenq = len(q)
            for i in range(lenq):
                v, index = q.popleft()
                if v.left:
                    q.append((v.left, 2*index))
                if v.right:
                    q.append((v.right, 2*index + 1))
                if i == 0: # mark the leftmost node
                    left = index
                if i == lenq - 1: # update the width at the rightmost node
                    result = max(result, index - left + 1)
        return result
        