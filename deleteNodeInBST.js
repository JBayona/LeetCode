/*
Given a root node reference of a BST and a key, delete the node with the given key in the BST.
Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

Search for a node to remove.

If the node is found, delete the node.

https://leetcode.com/problems/delete-node-in-a-bst/
*/

/*
                20
              /    \
             3      30
            / \    /  \ 
           2   4   19   31 
           
        2 3 4    19 30 31
        
We could use either the 4 or 19
- The max of the inorder of the left subtree
- The min of the inorder of the right subtree
*/

var deleteNode = function(root, key) {
  // Base case
  if(!root) {
      return root;
  }
  
  // If key is smaller than the root, it means that
  // the node lies in the left subtree
  if(key < root.val) {
      root.left = deleteNode(root.left, key);
  }
  
  // If key is greater than the root, it means that
  // the node lies in the right subtree
  else if (key > root.val) {
      root.right = deleteNode(root.right, key);
  }
  
  // Else, this is the node we want to delete
  else {
      // Node with only one child or no child
      if(!root.left) { // if no left child, use right to put it as replacement
          let tmp = root.right;
          root = null;
          return tmp;
      } else if(!root.right) { // if no right child, use left to put it as replacement
          let tmp = root.left;
          root = null;
          return tmp;
      }
      
      // Node with two childrens
      // Get the inorder successor (smallest in the right tree)
      let min = minValue(root.right);
      
      // Get the inorder successor (greater in the left tree)
      // let max = maxValue(root.left);
      
      // Copy the inorder successor's content into the node
      root.val = min.val;
      // root.val = max.val;
      
      // Remove the inorder successor
      root.right = deleteNode(root.right, min.val);
      // root.left = deleteNode(root.left, max.val);
  }
  return root
};

var minValue = function(node) {
  let current = node;
  while(current && current.left) {
      current = current.left;
  }
  return current;
}

var maxValue = function(node) {
  let current = node;
  while(current && current.right) {
      current = current.right;
  }
  return current;
}
