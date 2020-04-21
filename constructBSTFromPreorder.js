/*
Return the root node of a binary search tree that matches the given preorder traversal.

(Recall that a binary search tree is a binary tree where for every node, any descendant of node.left has a value < node.val, and any descendant of node.right has a value > node.val.  Also recall that a preorder traversal displays the value of the node first, then traverses node.left, then traverses node.right.)

 

Example 1:

Input: [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]

https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
*/

/*
The first element of preorder traversal is always root. We first construct the root.
Then we find the index of first element which is greater than root. Let the index be ‘i’. The values
between root and ‘i’ will be part of left subtree, and the values between ‘i+1’ and ‘n-1’ will be part of right subtree.
Divide given pre[] at index “i” and recur for left and right sub-trees.
For example in {10, 5, 1, 7, 40, 50}, 10 is the first element, so we make it root. Now we look for the first
element greater than 10, we find 40. So we know the structure of BST is as following.
*/

// Time O(N)
var bstFromPreorder = function(preorder) {
    let start = 0;
    let end = preorder.length;
    return bstFromPreorderUtil(preorder, start, end);
};

function bstFromPreorderUtil(preorder,  start, end) {
    //  Base case
    if(start >= end){
        return null ;
    }
    
    let node = new TreeNode(preorder[start]);
    let rightNodeIndex = start;
    // Find the first node greater then the current node
    while(rightNodeIndex < preorder.length) {
        if(preorder[rightNodeIndex] > node.val) {
            break;
        }
        rightNodeIndex++;
    }
    // Left tree
    if(start + 1 < end && preorder[start] > preorder[start + 1]) {
        node.left = bstFromPreorderUtil(preorder, start + 1,  rightNodeIndex);
    }
    // Right subtree
    node.right = bstFromPreorderUtil(preorder, rightNodeIndex, end);
    return node;
}

// Iterative
var bstFromPreorder = function(preorder) {
    if(!preorder.length) {
        return null;
    }
    
    let stack = [];
    let root = new TreeNode(preorder[0]);
    let node;
    stack.push(root);
    
    for(let i = 1; i < preorder.length; i++) {
        node = stack[stack.length-1]; // Peek
        let child = new TreeNode(preorder[i]);
        while(stack.length && node.val < child.val) {
            node = stack.pop();
        }
        
        if(node.val < child.val) {
            node.right = child;
        } else {
            node.left = child;
        }
        stack.push(child);
    }
    return root;
};

