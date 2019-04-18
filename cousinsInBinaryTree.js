/*
Two nodes of a binary tree are cousins if they have the same depth, but have different parents.

We are given the root of a binary tree with unique values, and the values x and y of two different nodes in the tree.

Return true if and only if the nodes corresponding to the values x and y are cousins.
https://leetcode.com/problems/cousins-in-binary-tree/
/
Level up your coding skills and quickly land a job. This is the best place to expand your knowledge and get prepared for your next interview.
leetcode.com

*/

var isCousins = function(root, x, y) {
    let xNode = getHeight(root, x, 0, null);
    let yNode = getHeight(root, y, 0, null);
    
   if (!xNode || !yNode) return false;
    
    return xNode[0] === yNode[0] && xNode[1] !== yNode[1];
};

function getHeight(node, target, level, parent) {
    // Break condition
    if(!node) {
        return null;
    }
    
    if(node.val === target) {
        return [level, parent];
    }
    
    return getHeight(node.left, target, level + 1, node.val) || getHeight(node.right, target, level + 1, node.val);
}