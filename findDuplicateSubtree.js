/*
Given a binary tree, return all duplicate subtrees.
For each kind of duplicate subtrees, you only need to return the root node of any one of them.

Two trees are duplicate if they have the same structure with same node values.

Example 1:

        1
       / \
      2   3
     /   / \
    4   2   4
       /
      4
The following are two duplicate subtrees:

      2
     /
    4
and

    4
Therefore, you need to return above trees' root in the form of a list.

https://leetcode.com/problems/find-duplicate-subtrees/
*/
// Time O(N)
// Space O(N)
var findDuplicateSubtrees = function(root) {
    let map = {};
    preorder(root, map);
    
    let result = [];
    for(let elem in map) {
        // We only need one node, the array has multiple same nodes
        let node = map[elem][0];
        // If there are more than 1 it means that there are repeated
	// subtress for the given key so we need to track them and only return one.
	if(map[elem].length > 1) {
            result.push(node);
        }
    }
    return result;
};

function preorder(root, map) {
    if(!root) {
        return 'x';
    }
    
    let left = preorder(root.left, map);
    let right = preorder(root.right, map);
    // Create a key as serialize and find duplicates
    let current = root.val.toString() + ',' + left + ',' + right;
    
    // Use our hash to store the elements
    if(current in map) {
        map[current].push(root);
    } else {
        map[current] = [root];
    }
    // Return it
    return current;
}
