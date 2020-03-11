/*
children is separated by the null value (See examples).

Example 1:

Input: root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]
Example 2:

Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
 
Constraints:

The height of the n-ary tree is less than or equal to 1000
The total number of nodes is between [0, 10^4]

https://leetcode.com/problems/n-ary-tree-level-order-traversal/
*/

/*
Time Complexity: O(N)
Space Complexity:
- O(log N) in average case.
- O(N) in worst case, that there is an unbalanced tree.
*/
var levelOrder = function(root) { 
    if(!root) {
        return [];
    }
    
    result = [];
    bfs(root, 0);
    return result;
}

function bfs(node, level) {
    if(!node) {
        return;
    }
    // Create array for. every level
    if(result.length === level) {
        result.push([]);
    }
    result[level].push(node.val);
    for (child of node.children) {
        bfs(child, level + 1);
    }
}