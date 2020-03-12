/*
https://www.geeksforgeeks.org/kth-largest-element-in-bst-when-modification-to-bst-is-not-allowed/
*/

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

function findKLargestInBST(root, k) {
    result = null;
    let count = {val: 0};
    inorder(root, k, count);
    return result;
}

function inorder(node, k, count) {
    // Base case, the second condition is important to 
    // avoid unnecessary recursive calls
    if(!node || count.val >= k){
        return;
    }

    // Reverse the inorder traversal so that the largest
    // element is visited first
    inorder(node.right, k, count);

    // Increment the visited count
    count.val++;

    // If the count become K now, then this is the Kth largest
    if(count.val === k) {
        result = node.val;
    }

    // Traverse the left tree
    inorder(node.left, k, count);
}


tree = new TreeNode(10, new TreeNode(5), new TreeNode(20, null, new TreeNode(30)));
k = 2;
console.log(findKLargestInBST(tree, k));