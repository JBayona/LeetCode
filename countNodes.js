/*
Given a complete binary tree, count the number of nodes.
Note:
Definition of a complete binary tree from Wikipedia:
In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

Example:

Input: 
    1
   / \
  2   3
 / \  /
4  5 6

Output: 6

https://leetcode.com/problems/count-complete-tree-nodes/
*/

// Opción 1 - BFS
var countNodes = function(root) {
  let queue = [];
  let count = 0;

  if(root) {
    count++;
    queue.push(root);
  }

  // BFS
  while(queue.length) {
    let node = queue.shift();
    if(node.left) {
        queue.push(node.left);
        count++;
    }
    if(node.right) {
        queue.push(node.right);
        count++;
    }
  }

  return count;
};

// Opción 2
var countNodes = function(root) {
  return helper(root, 0);
};

function helper(root, count) {
  if(!root) {
      return 0;
  }
  let left = 0;
  let right = 0;
  if(root.left) {
    left = helper(root.left, count);
  }
  if(root.right) {
    right = helper(root.right, count);
  }
  
  return left + right + 1;
}

// Opción 3
var countNodes = function(root) {
  // La suma del 1 es por el root de ese nodo
  return root ? countNodes(root.left) + countNodes(root.right) + 1 : 0;
};
