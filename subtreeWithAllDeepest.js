/*
Given a binary tree rooted at root, the depth of each node is the shortest distance to the root.

A node is deepest if it has the largest depth possible among any node in the entire tree.

The subtree of a node is that node, plus the set of all descendants of that node.

Return the node with the largest depth such that it contains all the deepest nodes in its subtree.

 

Example 1:

Input: [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation:



We return the node with value 2, colored in yellow in the diagram.
The nodes colored in blue are the deepest nodes of the tree.
The input "[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]" is a serialization of the given tree.
The output "[2, 7, 4]" is a serialization of the subtree rooted at the node with value 2.
Both the input and output have TreeNode type.
 

Note:

The number of nodes in the tree will be between 1 and 500.
The values of each node are unique.

https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/
*/

var subtreeWithAllDeepest = function(root) {
    if(!root) {
        return 0;
    }
    // Get the length of the left and right tree
    let leftHeight = getHeight(root.left);
    let rightHeight = getHeight(root.right);
    
    // If both heights are the same, the root has the same subtree
    if(leftHeight === rightHeight) {
        return root;
    }
    // If the height of the right is greater, the subtree belongs to the right subtree
    if(leftHeight < rightHeight) {
        return subtreeWithAllDeepest(root.right);
    } else {
        // If the height of the left is greater, the subtree belongs to the right subtree
        return subtreeWithAllDeepest(root.left);
    }
    
};

// Get Height of the binary tree
function getHeight(root) {
    if(!root) {
        return 0;
    }
    
    let leftHeight = getHeight(root.left);
    let rightHeight = getHeight(root.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
}