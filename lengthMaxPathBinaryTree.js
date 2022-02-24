/*
Find the length of the maximum path in the tree. Length of a path is defined by
the number of nodes in a path, no node can be traversed more than once in a path.

Example:
    a
   / \
  b   c
 |\   \
 e f   h
   /
  g

The path is the maximum distance between two nodes, it can be anyware in the tree.

Output: 6
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
    res.val = Math.max(res.val, left + right + 1); // +1 counting root

    // Return maximum possible value for root being
    // on one side, this is needed for next computations
    return Math.max(left, right) + 1;
  }

  // If any of the greatest children paths is empty, return
  // root for root being on one side
  let tmp = left || right;
  res.val = Math.max(res.val, tmp + 1); // +1 counting root
  return tmp + 1;
}

let node = new Node(
  "a",
  new Node("b", new Node("e"), new Node("f", new Node("g"))),
  new Node("c", null, new Node("g"))
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
