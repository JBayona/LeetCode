/*
Find the length of the maximum path in the tree. Length of a path is defined by
the number of nodes in a path, no node can be traversed more than once in a path.

Example:
    5
   / \
 2   4
 |\   \
 3 1   4
   /
  -3

The path is the maximum distance between two nodes, it can be anyware in the tree.

Output: 18
*/

class Res {
  constructor() {
    this.val = 0;
  }
}

function Node(val, left, right) {
  this.val = val || null;
  this.left = left || null;
  this.right = right || null;
}

function getLengthOfMaxPathTree(root, result) {
  let res = { val: 0 };

  helper(root, res);
  return res.val;
}

function helper(root, res) {
  // Base cases
  // Check if the it´s a leaf node
  if (!root) {
    return 0;
  }

  // Find maximum path in all subtrees. Also
  // find maximum root to leaf paths in all children
  // Get the two maximum which is the path
  let left = helper(root.left, res);
  let right = helper(root.right, res);
  // If both left and right children exist
  if (left && right) {
    // Update result if needed
    res.val = Math.max(res.val, left + right + root.val); // +1 counting root

    // Return maximum possible value for root being
    // on one side, this is needed for next computations
    return Math.max(left, right) + root.val;
  }

  // If any of the greatest children paths is empty, return
  // root for root being on one side
  let tmp = left || right;
  res.val = Math.max(res.val, tmp + root.val); // +1 counting root
  return tmp + root.val;
}

let node = new Node(
  5,
  new Node(2, new Node(3), new Node(1, new Node(-3))),
  new Node(4, null, new Node(4))
); // Output 6

/* let node = new Node('b', [
  new Node('d'),
  new Node('e'),
  new Node('f', [
    new Node('g')
  ]),
])*/ // 4

/* let node = new Node('f', [
  new Node('g')
])*/ // 2
console.log(getLengthOfMaxPathTree(node));
