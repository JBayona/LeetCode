/*
Consider all the leaves of a binary tree, from left to right order, the values of
those leaves form a leaf value sequence.

https://leetcode.com/problems/leaf-similar-trees/
*/

// Time O(N)
var leafSimilar = function(root1, root2) {
    let array = [];
    let arr = [];
    
    // Iterate both trees
    preorder(root1, array);
    preorder(root2, arr);
    
    // Check result
    if(array.length !== arr.length) {
        return false;
    }
    
    for(let i = 0; i < array.length; i++) {
        if(array[i] !== arr[i]) {
            return false;
        }
    }
    return true;
};

function preorder(node, array) {
    if(!node) {
        return;
    }
    // Find if is a leaf node
    if(!node.left && !node.right) {
        array.push(node.val);
    }
    preorder(node.left, array);
    preorder(node.right, array);
}
