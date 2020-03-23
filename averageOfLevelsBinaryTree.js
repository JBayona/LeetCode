/*
Given a non-empty binary tree, return the average value of the nodes on each level in the form of an array.
Example 1:
Input:
    3
   / \
  9  20
    /  \
   15   7
Output: [3, 14.5, 11]
Explanation:
The average value of nodes on level 0 is 3,  on level 1 is 14.5, and on level 2 is 11. Hence return [3, 14.5, 11].
Note:
The range of node's value is in the range of 32-bit signed integer.

https://leetcode.com/problems/average-of-levels-in-binary-tree/
*/

// BST
var averageOfLevels = function(root) {
    if(!root) {
        return [];
    }
    let queue = [];
    let result = [];
    queue.push(root);
    
    while(queue.length) {
        let size = queue.length;
        let  sum = 0;
        for(let i = 0; i < size; i++) {
            let node = queue.shift();
            sum += node.val;
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            }
        }
        result.push(sum/size);
    }
    return result;
};