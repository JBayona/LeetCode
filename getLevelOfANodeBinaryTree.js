// https://www.geeksforgeeks.org/get-level-of-a-node-in-a-binary-tree/

/*
iven a Binary Tree and a key, write a function that returns level of the key.

For example, consider the following tree. If the input key is 3, then your function should
return 1. If the input key is 4, then your function should return 3. And for key which is not
present in key, then your function should return 0.
*/

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}


// Time complexity is O(n) where n is the number of nodes
var getLevel = function(tree, value) {
    // Root has 1 as default value
    return getLevelUtil(tree, value, 1);
}

function getLevelUtil(node, value, level) {
    // If the node is not  present
    if(!node) {
        return 0;
    }

    if(node.val === value) {
        return level;
    }

    let downLevel = getLevelUtil(node.left, value, level + 1);
    if(downLevel !== 0) {
        return downLevel;
    }

    downLevel = getLevelUtil(node.right, value, level + 1);
    return downLevel;

}

/*
          4
       9     0
    5    1
*/

tree = new TreeNode(4, new  TreeNode(9, new TreeNode(5), new TreeNode(1)), new TreeNode(0));
console.log(getLevel(tree, 5)); // 3