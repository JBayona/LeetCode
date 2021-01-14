/*
You are given the root of a binary tree where each node has a value 0 or 1.  Each root-to-leaf path represents a binary number
starting with the most significant bit.  For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.

For all leaves in the tree, consider the numbers represented by the path from the root to that leaf.

Return the sum of these numbers. The answer is guaranteed to fit in a 32-bits integer.

https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/
*/

// Option 1
var sumRootToLeaf = function(root) {
    let answer = {num: 0}
    if(!root) {
        return 0;
    }
    preorder(root, 0, answer);
    return answer.num;
};

function preorder(node, sum, answer) {
    if(!node) {
        return;
    }
    sum = sum * 2 + node.val;
    if(!node.left && !node.right) {
        answer.num+= sum;
    }
    preorder(node.left, sum, answer);
    preorder(node.right, sum, answer);
}

// Option 2
var sumRootToLeaf = function(root) {
    let array = [];
    preorder(root, '', array);
    return array.reduce((acum, val) => parseInt(val, 2) + acum, 0);
};

function preorder(node, current, array) {
    if(!node) {
        return;
    }
    
    let val = current ? current + node.val : node.val + '';
    
    if(!node.left && !node.right) {
        return array.push(val);
    }
    
    preorder(node.left, val, array);
    preorder(node.right, val, array);
}