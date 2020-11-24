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

var rightSideView = function(root) {
    if(!root) {
        return [];
    }
    
    let result = [];
    let queue = [];
    queue.push(root);
    while(queue.length) {
        let size = queue.length;
        for(let i = 0; i < size; i++) {
            let node = queue.shift();
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            }
            if(i === size - 1) {
                result.push(node.val);
            }
        }
    }
    return result;
};
