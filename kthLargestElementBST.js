// Find the Kth largest element of a BST


// Approach populate the left pointers of the leaf nodes to appropriate parents.
// Hence, we won't need a stack to store the elements and eliminate the O(N) space by storing the pointers
// When there is no right element, it means we are at kth largest element currently, and subsequently we
// decrease k each time there's no right element.
// Option 2
// Time O(N)
// Space O(1)
function kthLargest(root, k) {
  let current = root;
  let count = 0;
  let result = null;

  while (current) {
    if (current.right === null) {
      // No right child, visit the current node
      // first increment count and check if count = k
      if (++count === k) {
        result = current.val;
      }
      current = current.left;
    } else {
      // Find the inorder predecessor (leftmost node in the right subtree)
      let predecessor = current.right;
      while (predecessor.left && predecessor.left !== current) {
        predecessor = predecessor.left;
      }

      if (!predecessor.left) {
        // Create the thread (temporary link to current)
        predecessor.left = current;
        current = current.right;
      } else {
        // Thread already exists, remove it and visit current
        // restoring the tree back to original binary
        // search tree removing threaded links
        predecessor.left = null;
        if (++count === k) {
          result = current.val;
        }
        current = current.left;
      }
    }
  }

  return result;
}
