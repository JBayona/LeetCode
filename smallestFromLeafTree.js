/*
Given the root of a binary tree, each node has a value from 0 to 25 representing the
letters 'a' to 'z': a value of 0 represents 'a', a value of 1 represents 'b', and so on.

Find the lexicographically smallest string that starts at a leaf of this tree and ends
at the root.

(As a reminder, any shorter prefix of a string is lexicographically smaller: for
example, "ab" is lexicographically smaller than "aba".  A leaf of a node is a node that
has no children.)

https://leetcode.com/problems/smallest-string-starting-from-leaf/
*/

// Option 1
var smallestFromLeaf = function(root) {
    if(!root) {
        return '';
    }
    // Force to be the greatest one using z
    let answer = {result: 'z'};
    preorder(root, '', answer);
    return answer.result;
};

function preorder(node, current, answer) {
    if(!node) {
        return;
    }
    
    let convertToChar = String.fromCharCode(node.val + 97);
    let str = current ?  convertToChar + current : convertToChar;
    if(!node.left && !node.right) {
        if(str < answer.result) {
            answer.result = str;
        }
    }
    preorder(node.left, str, answer);
    preorder(node.right, str, answer);
}

// Option 2
var smallestFromLeaf = function(root) {
    if(!root) {
        return '';
    }
    let array = [];
    preorder(root, array, '');
    let arr = array.map(item => [...item].reverse().join('')).sort();
    return arr[0];
};

function preorder(node, array, current) {
    if(!node) {
        return;
    }
    
    let convertToChar = String.fromCharCode(node.val + 97);
    let str = current ? current + convertToChar : convertToChar;
    if(!node.left && !node.right) {
        array.push(str);
    }
    preorder(node.left, array, str);
    preorder(node.right, array, str);
}
