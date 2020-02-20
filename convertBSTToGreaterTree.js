/*
Given a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

Example:

Input: The root of a Binary Search Tree like this:
              5
            /   \
           2     13

Output: The root of a Greater Tree like this:
             18
            /   \
          20     13


https://leetcode.com/problems/convert-bst-to-greater-tree/
*/

var convertBST = function(root) {
    sum = 0;
    postorder(root);
    return root;
};

const postorder = function(root) {
    if(!root) {
        return;
    }
    postorder(root.right);
    sum += root.val;
    root.val = sum;
    postorder(root.left)
}