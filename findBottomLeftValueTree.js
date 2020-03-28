/*
Given a binary tree, find the leftmost value in the last row of the tree.

Example 1:
Input:

    2
   / \
  1   3

Output:
1
Example 2:
Input:

        1
       / \
      2   3
     /   / \
    4   5   6
       /
      7

Output:
7
Note: You may assume the tree (i.e., the given root node) is not NULL.

https://leetcode.com/problems/find-bottom-left-tree-value/
*/

var findBottomLeftValue = function(root) {
    let result = 0;
    let queue = [];
    
    if(!root) {
        return null;
    }
    
    queue.push(root);
    while(queue.length) {
        let size = queue.length;
        result = queue[0].val; // Pick the left most value on each level
        for(let i = 0; i < size; i++) {
            let node = queue.shift();
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            }
        }
    }
    return result;
};

