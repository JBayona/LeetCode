/*
Find the length of the maximum path in the tree. Length of a path is defined by
the number of nodes in a path, no node can be traversed more than once in a path.

Example:
    a
   / \
  b   c
 /|\   \
d e f   h
   /
  g

Output: 6
*/

class Res {
  constructor() {
    this.val = 0;
  }
}

function Node(val, children) {
  this.val = val || null;;
  this.children = children || [];
}

function getLengthOfMaxPathTree(root, result) {
  let res = {val: 0};

  helper(root, res);
  return res.val;
}

function helper(root, res) {
  // Base cases
  if(!root) {
    return 0;
  }
  // Check if the it´s a leaf node
  if(!root.children.length) {
    return 1;
  }

  // Find maximum path in all subtrees. Also
  // find maximum root to leaf paths in all children
  let childrenPath = new Array(root.children.length).fill(0);
  for(let i = 0; i < root.children.length; i++) {
    childrenPath[i] = helper(root.children[i], res);
  }
  // Get the two maximum which is the path
  childrenPath.sort((a, b) => a - b);
  let firstGreater = childrenPath.pop();
  let secondGreater = childrenPath.pop();
  // If both left and right children exist
  if (firstGreater && secondGreater) {
    // Update result if needed
    res.val = Math.max(res.val, firstGreater + secondGreater + 1); // +1 counting root

    // Return maximum possible value for root being
    // on one side, this is needed for next computations
    return Math.max(firstGreater, secondGreater) + 1;
  }

  // If any of the greatest children paths is empty, return
  // root for root being on one side
  let tmp = firstGreater || secondGreater;
  res.val = Math.max(res.val, tmp + 1); // +1 counting root
  return  tmp + 1;
}

let node = new Node('a', [
  new Node('b', [
    new Node('d'),
    new Node('e'),
    new Node('f', [
      new Node('g')
    ]),
  ]),
  new Node('c', [new Node('h')]),
]) // Output 6

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