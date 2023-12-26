/*
Given a binary search tree and a node in it, find the in-order successor of that node in the BST.
https://www.youtube.com/watch?v=JdmAYw5h3G8
https://www.youtube.com/watch?v=kr3BOCNEYHI
https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/
https://www.programcreek.com/2014/05/leetcode-inorder-successor-in-bst-java/
*/

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

// O(N) Time complexity, space O(1)
var inorderSuccessor = function(root, node) {
  if(!root) return -1;

  // 1 case - We have right tree(children), get the most left element
  let current = node;
  if(current.right) {
   current = current.right;
   while(current.left) {
    current = current.left;
   }
   return current;
  }

  // 2 case - There's no right tree(children), we get the last node which has left tree
  // In other words, get the first parent greater than the node
  // Start from the route and search the node
  let result = null;
  while(root) {
   if(node.val < root.val) {
    result = root;
    root = root.left;
   } else if(node.val > root.val) {
    root = root.right;
   } else {
    // We found the node
    break;
   }
  }
  return result;
}


// O(N) Time complexity, O(N) space complexity
var inorderSuccessor = function(root, node) {

  let result = null;
  let tmp = [];
  // Fill the values of all the nodes in our array
  inorder(root, tmp);
  console.log(tmp);

  //let find the node successor
  for(let i = 0; i < tmp.length; i++) {
   if(tmp[i].val === node.val) {
    return tmp[i+1];
   }
  }

  return -1;
}

function inorder(node, tmp) {
  if(!node) return;

  inorder(node.left, tmp);
  tmp.push(node);
  inorder(node.right, tmp);
}


/*
       20
     8     22
   4   12
     10 14
*/
/*node = new TreeNode(8, new TreeNode(4), new TreeNode(12, new TreeNode(10), new TreeNode(14)));
root = new TreeNode(20, node, new TreeNode(22)); // 10 */

/*node = new TreeNode(10);
root = new TreeNode(20, new TreeNode(8, new TreeNode(4), new TreeNode(12, node, new TreeNode(14))), new TreeNode(22)); // 12 */

/*node = new TreeNode(14);
root = new TreeNode(20, new TreeNode(8, new TreeNode(4), new TreeNode(12, new TreeNode(10), node)), new TreeNode(22)); // 20 */

console.log(inorderSuccessor(root, node));
