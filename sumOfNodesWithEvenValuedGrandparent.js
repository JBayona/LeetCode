/*
Given a binary tree, return the sum of values of nodes with even-valued
grandparent.(A grandparent of a node is the parent of its parent, if it exists.)

If there are no nodes with an even-valued grandparent, return 0.

https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent/
*/

var sumEvenGrandparent = function(root) {
    let sum = {val: 0};
    preorder(root, -1, -1, sum);
    return sum.val;
};

function preorder(node, parent, grandparent, sum) {
    if(!node) {
        return;
    }

    if(grandparent.val % 2 === 0) {
        sum.val += node.val;
    }
    
    preorder(node.left, node, parent, sum);
    preorder(node.right, node, parent, sum);
}