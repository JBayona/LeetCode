/*
Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the
two trees are overlapped while the others are not.
You need to merge them into a new binary tree. The merge rule is that if two nodes overlap
then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.

Example 1:

Input: 
    Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7                  
Output: 
Merged tree:
         3
        / \
       4   5
      / \   \ 
     5   4   7

Note: The merging process must start from the root nodes of both trees.


https://leetcode.com/problems/merge-two-binary-trees/

*/

// Creating temporary nodes
var mergeTrees = function(t1, t2) {
    if(!t1) {
        return t2;
    }
    if(!t2) {
        return t1;
    }
    let tree3 = new TreeNode(t1.val + t2.val);
    tree3.left = mergeTrees(t1.left, t2.left);
    tree3.right = mergeTrees(t1.right, t2.right);
    
    return tree3;
};

// Using t1 to place the results
var mergeTrees = function(t1, t2) {
    if(!t1) {
        return t2;
    }
    if(!t2) {
        return t1;
    }
    t1.val = t1.val + t2.val;
    t1.left = mergeTrees(t1.left, t2.left);
    t1.right = mergeTrees(t1.right, t2.right);
    
    return t1;
};

// Using t1 to place the results
// BFS
var mergeTrees = function(t1, t2) {
    
    if(!t1) {
        return t2;
    }
    
    let queue = [];
    queue.push([t1, t2]);
    while(queue.length) {
        let trees = queue.shift();
        let tree1 = trees[0];
        let tree2 = trees[1];
        
        if(!tree1 || !tree2) {
            continue;
        } else {
            tree1.val = tree1.val + tree2.val;
        }
        if(tree1.left == null) {
            tree1.left = tree2.left;
        } else {
            queue.push([tree1.left, tree2.left]);
        }
        if(tree1.right == null) {
            tree1.right = tree2.right;
        } else {
            queue.push([tree1.right, tree2.right]);
        }
    }
    return t1;
};