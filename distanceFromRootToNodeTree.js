// Calculate distance from root to node
/*
           1
        2       3
      4   5   6   7
               8
*/

function Node(val, left, right) {
  this.val = val || 0;
  this.left = left || null;
  this.right = right || null;
}

function findDistanceFromRoot(node, n, level) {
  if (!node) {
      return 0;
  }

  if (node.val === n) {
      return level;
  }

  let left = findDistanceFromRoot(node.left, n, level + 1);
  return left !== 0 ? left : findDistanceFromRoot(node.right, n, level + 1);
}

let root = new Node(1);
  root.left = new Node(2);
  root.right = new Node(3);
  root.left.left = new Node(4);
  root.left.right = new Node(5);
  root.right.left = new Node(6);
  root.right.right = new Node(7);
  root.right.left.right = new Node(8);
let p = 4;
let q = 8;
console.log(findDistanceFromRoot(root, p, 0));
console.log(findDistanceFromRoot(root, q, 0));