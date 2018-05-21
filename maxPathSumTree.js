/*
Given a non-empty binary tree, find the maximum path sum.

For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.

Example 1:

Input: [1,2,3]

       1
      / \
     2   3

Output: 6
Example 2:

Input: [-10,9,20,null,null,15,7]

   -10
   / \
  9  20
    /  \
   15   7

Output: 42

https://leetcode.com/problems/binary-tree-maximum-path-sum/description/
*/

/*
Retornamos en cada nodo la mayor suma del subtree, hay cuatro formas de obtener el maximo pat
de cada nodo, la forma de obtebnerla es la siguiente:
1. El maximo puede ser el nodo root del subtree.
2. El maximo puede ser la suma del root node mas el left child
3. El maximo puede ser la suma del root node mas el right child
4. El maximo puede ser la suma del root + left + right en caso de ser el root
*/

function Node(data, left, right) {
  this.data = data;
  this.left = left || null;
  this.right = right || null;
}

function findMaxPath(node, result) {
  // Check if null is not null so we can compute childrens
  // Base case
  if(!node) {
    return 0;
  }

  let left = findMaxPath(node.left, result);
  let right = findMaxPath(node.right, result);

  // Get max of single node, should include at lear one child
  // Could be only the single root node or root node + max one children
  let max_single_node = Math.max(Math.max(left, right) + node.data, node.data);

  // Max top is the sum
  // The max could the the one subtree that includes the root node also
  let max_top = Math.max(max_single_node, left + right + node.data);

  // Update the result
  // The new max is the prev result or our max of single node
  result.val = Math.max(result.val, max_top);

  // We need to return the max of each subtree so we can keep compute
  // This will be a repetitive process for all root nodes
  return max_single_node;
}

function findMaxPathSum(root){
  // Result
  result = {val: -10e5}; //Min negative positive value
  //Main function
  findMaxPath(root, result);
  return result.val;
}

root = new Node(10, new Node(2, new Node(20), new Node(1)), new Node(10, null, new Node(-25, new Node(3), new Node(4))));
//root = new Node(-3, null, null);
console.log(findMaxPathSum(root));