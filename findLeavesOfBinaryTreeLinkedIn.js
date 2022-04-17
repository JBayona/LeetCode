/*
Given the root of a binary tree, collect a tree's nodes as if you were doing this:

Collect all the leaf nodes.
Remove all the leaf nodes.
Repeat until the tree is empty.
 
Example 1:
Input: root = [1,2,3,4,5]
Output: [[4,5,3],[2],[1]]
Explanation:
[[3,5,4],[2],[1]] and [[3,4,5],[2],[1]] are also considered correct answers since per each level it does not matter the order on which elements are returned.

Example 2:
Input: root = [1]
Output: [[1]]

https://leetcode.com/problems/find-leaves-of-binary-tree/

            1 (L= 2)
      2 (L= 1)    3 (L= 0)
4 (L= 0)  5(L= 0)


*/

// Time O(N)
var findLeaves = function(root) {
    let result = [];
    getLength(root, result);
    console.log(result);
    return result;
};

// Get based on the length
function getLength(node, result) {
    if(!node) {
        return 0;
    }
    let left = getLength(node.left, result);
    let right = getLength(node.right, result);
    let depth = Math.max(left, right);
    // Track this new level
    if(depth > result.length - 1) {
        result.push([]);
    }
    result[depth].push(node.val);
    return depth + 1;
}