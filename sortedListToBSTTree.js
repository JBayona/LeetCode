/*
Given a binary tree, determine if it is a complete binary tree.

Definition of a complete binary tree from Wikipedia:
In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

Example 1:
Input: [1,2,3,4,5,6]
Output: true
Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6}) are as far left as possible.

Example 2:
Input: [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 isn't as far left as possible.
 
Note:

The tree will have between 1 and 100 nodes.

https://leetcode.com/problems/check-completeness-of-a-binary-tree/
*/

var isCompleteTree = function(root) {
    if(!root) {
        return true;
    }
    
    let queue = [];
    queue.push(root);
    
    let isEnd = false;
    while(queue.length) {
        let size = queue.length;
        for(let i = 0; i < size; i++) {
            let node = queue.shift();
            if(node.left) {
                // If we detected an end and we still have the flag, break
                if(isEnd) {
                    return false;
                }
                queue.push(node.left);
            } else { // We can mark end now
                isEnd = true;
            }
            if(node.right) {
                // After ending, no right children should appear
                if(isEnd) {
                    return false;
                }
                queue.push(node.right);
            } else {
                isEnd = true;
            }
        }
    }
    return true;
};
