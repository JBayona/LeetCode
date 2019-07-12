/*
Print a binary tree in an m*n 2D string array following these rules:

The row number m should be equal to the height of the given binary tree.
The column number n should always be an odd number.
The root node's value (in string format) should be put in the exactly middle of the first row it can be put. The column and the row where the root node belongs will separate the rest space into two parts (left-bottom part and right-bottom part). You should print the left subtree in the left-bottom part and print the right subtree in the right-bottom part. The left-bottom part and the right-bottom part should have the same size. Even if one subtree is none while the other is not, you don't need to print anything for the none subtree but still need to leave the space as large as that for the other subtree. However, if two subtrees are none, then you don't need to leave space for both of them.
Each unused space should contain an empty string "".
Print the subtrees following the same rules.

https://leetcode.com/problems/print-binary-tree/
*/

function Node(val, left, right) {
    this.left = left || null;
    this.right = right || null;
    this.val = val;
}

var printTree = function(root) {
    // Height of the tree
    let height = getHeight(root);
    // Number of sons
    let nodes = Math.pow(2, height) - 1;
    
    // Form structure
    let tree = [];
    for(let i = 0; i < height; i++) {
        tree[i] = new Array(nodes).fill("");
    }

    let queue = [];
    let indexQueue = [];

    // Push initial node
    queue.push(root);

    // -1 because these are positions
    indexQueue.push([0, nodes - 1]);

    let row = 0;

    while(queue.length) {
        // How many elements are in the current level of the tree
        let levelSize = queue.length;

        for(let i = 0; i < levelSize; i++) {
            // Get current node in the tree
            let node = queue.shift();

            let elements = indexQueue.shift();
            let left = elements[0];
            let right = elements[1];
            let mid = (left + right) / 2;

            tree[row][mid] = node.val + '';

            if(node.left) {
                queue.push(node.left);
                indexQueue.push([left, mid - 1]);
            }

            if(node.right) {
                queue.push(node.right);
                indexQueue.push([mid + 1, right]);
            }
        }

        // Increase tree row
        row++;
    }

    return tree;
    
};

const getHeight = function(root) {
    if(!root) {
        return 0;
    }
    let left = getHeight(root.left);
    let right = getHeight(root.right);
    
    return 1 + Math.max(left, right);
}

tree = new Node(1, new Node(2, null, new Node(4)), new Node(3));
console.log(printTree(tree));