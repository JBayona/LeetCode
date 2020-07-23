/*
Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its zigzag level order traversal as:
[
  [3],
  [20,9],
  [15,7]
]

https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
*/

// Option 1

var zigzagLevelOrder = function(root) {
    if(!root) {
        return [];
    }
    let queue = [];
    let result = [];
    let flip = false;
    queue.push(root);
    
    while(queue.length) {
        let size = queue.length;
        let tmp = [];
        for(let i = 0; i < size; i++) {
            let node = queue.shift();
            tmp.push(node.val);
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right)
            }
        }
        if(!flip) {
           result.push(tmp); 
        } else {
            result.push(tmp.reverse());
        }
        flip = !flip;
    }
    return result;
};
