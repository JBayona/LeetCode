/*
Given two binary search trees root1 and root2, return a list containing all the integers
from both trees sorted in ascending order.

https://leetcode.com/problems/all-elements-in-two-binary-search-trees/
*/

var getAllElements = function(root1, root2) {
    let arrayA = [];
    let arrayB = [];
    inorder(root1, arrayA);
    inorder(root2, arrayB);
    // Get result array
    let result = [];
    let indexA = 0;
    let indexB = 0;
    let index = 0;
    while(indexA < arrayA.length && indexB < arrayB.length) {
        if(arrayA[indexA] < arrayB[indexB]) {
            result[index++] = arrayA[indexA++]; 
        } else {
            result[index++] = arrayB[indexB++]; 
        }
    }
    
    // Check if arrayA has more elements
    while(indexA < arrayA.length) {
        result[index++] = arrayA[indexA++]; 
    }
    
    // Check if arrayB has more elements
    while(indexB < arrayB.length) {
        result[index++] = arrayB[indexB++]; 
    }
    return result;
};

function inorder(node, array) {
    if(!node) {
        return;
    }
    inorder(node.left, array);
    array.push(node.val);
    inorder(node.right, array);
}