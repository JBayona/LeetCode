/*
Given the root of a binary search tree, a target value, and an integer k, return the k
values in the BST that are closest to the target. You may return the answer in any order.

You are guaranteed to have only one unique set of k values in the BST that
are closest to the target.

    4
   / \
  2   5
 / \
1   3

Input: root = [4,2,5,1,3], target = 3.714286, k = 2
Output: [4,3]
*/

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

// Time complexity: O(N LogN) Inorder N + Sort Log N
// Space complexity: O(N)
function closestValue(root, target, k) {
    let arr = [];
    inorder(root, arr);
    // Custom sort
    arr.sort((a, b) => Math.abs(a - target) - Math.abs(b - target));
    return arr.slice(0, k);
}

function inorder(node, arr) {
    if(!node) {
        return;
    }
    inorder(node.left, arr);
    arr.push(node.val);
    inorder(node.right, arr);
}

let root = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(5));
let target = 3.714286;
let k = 2;
console.log(closestValue(root, target, k));
