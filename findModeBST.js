/*
Given a binary search tree (BST) with duplicates, find all the mode(s) (the most frequently occurred element) in the given BST.

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than or equal to the node's key.
The right subtree of a node contains only nodes with keys greater than or equal tothe node's key.
Both the left and right subtrees must also be binary search trees.
 

For example:
Given BST [1,null,2,2],

   1
    \
     2
    /
   2
 

return [2].


https://leetcode.com/problems/find-mode-in-binary-search-tree/
*/

// Opción 1

var findMode = function(root) {
    let hash = {};
    let max = {count: 0};
    let result = [];
    helper(root, hash, max);
    for(let key in hash) {
        if(hash[key] === max.count) {
            result.push(key);
        }
    }
    return result;
};

function helper(root, hash, max) {
    if(!root) {
        return;
    }
    if(root.val in hash) {
        hash[root.val]++;
        max.count = Math.max(max.count, hash[root.val]);
    } else {
        hash[root.val] = 1;
        max.count = Math.max(max.count, hash[root.val]);
    }
    helper(root.left, hash, max);
    helper(root.right, hash, max);
}

// Opción 2

var findMode = function(root) {
    let hash = {};
    let result = [];
    let max = helper(root, hash);
    
    for(let key in hash) {
        if(hash[key] === max) {
            result.push(key);
        }
    }
    return result;
};

function helper(root, hash, max) {
    if(!root) {
        return 0;
    }
    if(root.val in hash) {
        hash[root.val]++;
    } else {
        hash[root.val] = 1;
    }
    return Math.max(hash[root.val], helper(root.left, hash), helper(root.right, hash));
}

// Lineal

var findMode = function(root) {
    inorder(root);
    result = [];
    inorder(root, true);
    maxCount = 0;
    return result;
};

let maxCount = 0;
let prevValue;
let currentVal;
let currentCount = 0;
let result = [];

function inorder(node, flag = false) {
    if(!node) {
        return null;
    }
    inorder(node.left, flag);
    helper(node.val, flag);
    inorder(node.right, flag);
}

function helper(val, flag) {
    if(val !== currentVal) {
        currentVal = val;
        currentCount = 0;
    }
    currentCount++;
    if (currentCount > maxCount) {
        maxCount = currentCount;
    }
    
    if(flag) {
        // This indexOf should be replaced for other method to check for the existence
        if(currentCount === maxCount && result.indexOf(val) < 0){
            result.push(val);
        }
    }
    
}