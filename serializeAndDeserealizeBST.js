/*
Serialization is the process of converting a data structure or object into a
sequence of bits so that it can be stored in a file or memory buffer, or transmitted
across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There is no
restriction on how your serialization/deserialization algorithm should work. You just need to
ensure that a binary search tree can be serialized to a string and this string can be deserialized
to the original tree structure.

The encoded string should be as compact as possible.

Note: Do not use class member/global/static variables to store states. Your serialize and
deserialize algorithms should be stateless.

https://leetcode.com/problems/serialize-and-deserialize-bst/
*/

var serialize = function(root) {
    let arr = [];
    preorder(arr, root);
    return arr.toString();
};

function preorder(arr, root) {
    if(!root) {
        return;
    }
    arr.push(root.val);
    preorder(arr, root.left);
    preorder(arr, root.right);
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if(!data.length) {
        return null;
    }
    let arr = data.split(',');
    let root = new TreeNode(parseInt(arr[0]));
    
    for(let i = 1; i < arr.length; i++) {
        let tmp = parseInt(arr[i]);
        insert(root, tmp);
    }
    return root;
};

function insert(root, val) {
    if(!root) {
        return new TreeNode(val);
    }
    if(val < root.val) {
        root.left = insert(root.left, val);
    }
    if(val > root.val) {
        root.right = insert(root.right, val);
    }
    return root;
}