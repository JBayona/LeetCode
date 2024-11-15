/*
Given a binary tree, return the vertical order traversal of its nodes values.

For each node at position (X, Y), its left and right children respectively
will be at positions (X-1, Y-1) and (X+1, Y-1).

Running a vertical line from X = -infinity to X = +infinity, whenever the vertical line touches some nodes, we report the values of the nodes in order from top to bottom (decreasing Y coordinates).

If two nodes have the same position, then the value of the node that is reported first is the value that is smaller.

Return an list of non-empty reports in order of X coordinate.  Every report will have a list of values of nodes.

Example 1:
Input: [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
Explanation: 
Without loss of generality, we can assume the root node is at position (0, 0):
Then, the node with value 9 occurs at position (-1, -1);
The nodes with values 3 and 15 occur at positions (0, 0) and (0, -2);
The node with value 20 occurs at position (1, -1);
The node with value 7 occurs at position (2, -2).

Example 2:
Input: [1,2,3,4,5,6,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation: 
The node with value 5 and the node with value 6 have the same position according to the given scheme.
However, in the report "[1,5,6]", the node value of 5 comes first since 5 is smaller than 6.
 

Note:
The tree will have between 1 and 1000 nodes.
Each node's value will be between 0 and 1000.

https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/
*/

// Time O(V + E)
// Space Complexity: O(N)

// Option 1
var verticalOrder = function(root) {
    if (!root) {
        return [];
    }

    // Assume the root is column 0, left is -1 and right + 1
    let columnTable = {};
    let queue = [{node: root, column: 0}];

    // Do BFS as it will to all the way down
    while (queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let {node, column} = queue.shift();
            if (column in columnTable) {
                columnTable[column].push(node.val);
            } else {
                columnTable[column] = [node.val];
            }

            if (node.left) {
                queue.push({node: node.left, column: column - 1});
            }
            if (node.right) {
                queue.push({node: node.right, column: column + 1});
            }
        }
    }
    // Get sorted keys
    const sortedKeys = Object.keys(columnTable).sort((a, b) => a - b);

    // Format the result
    let result = [];
    for (let key of sortedKeys) {
        result.push(columnTable[key]);
    }
    return result;
};


// Option 2
var verticalTraversal = function(root) {
    
    if(!root) {
        return root;
    }
    
    let nodeCoordinates = {};
    preorder(root, nodeCoordinates, 0, 0);
    
    /*
    {
    '0': [ { y: 0, val: 3 }, { y: -2, val: 15 } ],
    '1': [ { y: -1, val: 20 } ],
    '2': [ { y: -2, val: 7 } ],
    '-1': [ { y: -1, val: 9 } ]
    }
    */
    
    // Sort keys based on "x" as it's the key on the hash
    let sorkedKeysArray = Object.keys(nodeCoordinates)
        .map((element => Number(element))).sort((a,b) => a - b);

    // console.log(sorkedKeysArray);
    // console.log(nodeCoordinates);
    
    let result = [];
    // Get elements in the array and
    for(let i = 0; i < sorkedKeysArray.length; i++) {
        let levelX = sorkedKeysArray[i];
        // Retrieve the elements in our hash
        let elements = nodeCoordinates[levelX];
        // Sort the array with objects by vertical order based on "y" coordinate
        elements.sort((a,b) => {
            // If "y" has not the same value, we report first the greater "y" value
            if(a.y != b.y) {
                return b.y - a.y;
            } else {
                return a.val - b.val;
            }
        });
        // Form our result array
        let tmp = [];
        for(let  j = 0; j < elements.length; j++) {
            tmp.push(elements[j].val);
        }
        result.push(tmp);
    }
    return result;
};

function preorder(node, nodeCoordinates, x, y) {
    if(!node) {
        return;
    }
    
    if(!(x in nodeCoordinates)) {
        nodeCoordinates[x] = [];
    }
    nodeCoordinates[x].push({y, val: node.val});
    // x and y based on the cartesian plane, the root node is 0,0
    preorder(node.left, nodeCoordinates, x - 1, y - 1);
    preorder(node.right, nodeCoordinates, x + 1, y - 1);
}
