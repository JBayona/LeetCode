/*
Given a binary tree where all the right nodes are either leaf nodes with a sibling (a left node that shares the same parent node) or empty,
flip it upside down and turn it into a tree where the original right nodes turned into left leaf nodes. Return the new root.

Given a binary tree, the task is to flip the binary tree towards right direction that is clockwise.
See below examples to see the transformation.
In the flip operation, left most node becomes the root of flipped tree and its parent become its right child
and the right sibling become its left child and same should be done for all left most nodes recursively.

Have you met this question in a real interview?  
Example
Example1

Input: {1,2,3,4,5}
Output: {4,5,2,#,#,3,1}
Explanation:
The input is
    1
   / \
  2   3
 / \
4   5
and the output is
   4
  / \
 5   2
    / \
   3   1
Example2

Input: {1,2,3,4}
Output: {4,#,2,3,1}
Explanation:
The input is
    1
   / \
  2   3
 /
4
and the output is
   4
    \
     2
    / \
   3   1


https://www.geeksforgeeks.org/flip-binary-tree/
https://www.lintcode.com/problem/binary-tree-upside-down/description
https://leetcode.com/problems/binary-tree-upside-down/
*/

function TreeNode(val, left, right) {
    this.val = val || null;
    this.left = left || null;
    this.right = right || null;
}

let binaryUpsideDown = function(node) {
    // Base case
    if(!node) {
        return null;
    }

    // Node is leaf
    if(!node.left && !node.right) {
        return node;
    }

    // Left node is a root
    tree = binaryUpsideDown(node.left);

    node.left.left = node.right;
    node.left.right = node;
    node.left = null;
    node.right = null;
    return tree;
}

tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), new TreeNode(7)));
// tree = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(binaryUpsideDown(tree));