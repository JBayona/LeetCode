/*
Given the root of a binary tree, each node in the tree has a distinct value.

After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).

Return the roots of the trees in the remaining forest.  You may return the result in any order.


Example 1:

Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
Output: [[1,2,null,4],[6],[7]]

https://leetcode.com/problems/delete-nodes-and-return-forest/
https://www.youtube.com/watch?time_continue=18&v=aaSFzFfOQ0o&feature=emb_logo
*/

// Time complexity O(N) - N, number of nodes
// Space O(N + M) -> O(N)

// We have two options to approach the problem, go to top-to-bottom and
// bottom-up, if we go from top to bottom there's no way we can get the
// references of the childs of the node we want to remove, that's why makes
// more sense to use bottom-up approach so we can keep the references
var delNodes = function(root, to_delete) {
    result = [];
    let set = new Set(to_delete);
    removeNode(root, set);
    // Check if the root needs to be stored as well
    if(!set.has(root.val)) {
        result.push(root);
    }
    return result;
};

// Post order traversal
function removeNode(root, set) {
    // Base case
    if(!root) {
        return null;
    }
    
    root.left = removeNode(root.left, set);
    root.right = removeNode(root.right, set);
    
    // Check if we need to remove the node
    if(set.has(root.val)) {
        // We don´t want to lose the references of both childresn, left and right
        // if we need to remove the current node
        if(root.left !== null) {
            result.push(root.left);
        }
        if(root.right !== null) {
            result.push(root.right);
        }
        // Remove the current node
        return null;
    }
    // Return the root
    return root;
}