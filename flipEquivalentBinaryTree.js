/*

For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.

A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.

Write a function that determines whether two binary trees are flip equivalent.  The trees are given by root nodes root1 and root2.

Example 1:

Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
Output: true
Explanation: We flipped at nodes with values 1, 3, and 5.
Flipped Trees Diagram
 

Note:

Each tree will have at most 100 nodes.
Each value in each tree will be a unique integer in the range [0, 99].

https://leetcode.com/problems/flip-equivalent-binary-trees/
*/

// Time Complexity: O(min(N1, N2)) where N1, N2 are the lengths of node1, node2
var flipEquiv = function(root1, root2) {
    return helper(root1, root2);
};

function helper(root1, root2) {
    if(!root1 && !root2) {
        return true;
    }
    
    if(!root1 || !root2) {
        return false;
    }

    if(root1.val != root2.val) {
        return false;
    }
    
    // Check all the paths
    return (
        helper(root1.left, root2.right) && helper(root1.right, root2.left) ||
        helper(root1.left, root2.left) && helper(root1.right, root2.right)
    );
}
