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

/*
Dist(n1, n2) = Dist(root, n1) + Dist(root, n2) - (2 * Dist(root, lca))
'n1' and 'n2' are the two given keys
'root' is root of given Binary Tree.
'lca' is lowest common ancestor of n1 and n2
Dist(n1, n2) is the distance between n1 and n2.
*/

// Global variable
let d1 = -1;
let d2 = -1;
let dist = 0;

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

function findDistUtil(root, n1, n2, lvl) {
  // Base case
  if (!root) {
    return null;
  }

  // If either n1 or n2 matches with root's
  // key, report the presence by returning
  // root (Note that if a key is ancestor of
  // other, then the ancestor key becomes LCA
  if (root.val == n1) {
    d1 = lvl;
    return root;
  }
  if (root.val == n2) {
    d2 = lvl;
    return root;
  }

  // Look for n1 and n2 in left and right subtrees
  let leftLCA = findDistUtil(root.left, n1, n2, lvl + 1);
  let rightLCA = findDistUtil(root.right, n1, n2, lvl + 1);

  // If both of the above calls return Non-null,
  // then one key is present in once subtree and
  // other is present in other, So this node is the LCA
  if (leftLCA && rightLCA) {
    // Lvl is the level of the LCA
    dist = d1 + d2 - (2 * lvl);
    return root;
  }

  // Otherwise check if left subtree
  // or right subtree is LCA
  return leftLCA ? leftLCA : rightLCA;
}

function findDistance(root, n1, n2) {
  d1 = -1;
  d2 = -1;
  dist = 0;
  lca = findDistUtil(root, n1, n2, 1);

  // If both n1 and n2 were present
  // in Binary Tree, return dist
  if (d1 != -1 && d2 != -1) {
    return dist;
  }

  // If n1 is ancestor of n2, consider
  // n1 as root and find level
  // of n2 in subtree rooted with n1
  if (d1 != -1) {
    dist = findDistanceFromRoot(lca, n2, 0);
    return dist;
  }
  s;

  // If n2 is ancestor of n1, consider
  // n2 as root and find level
  // of n1 in subtree rooted with n2
  if (d2 != -1) {
    dist = findDistanceFromRoot(lca, n1, 0);
    return dist;
  }
  return -1;
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
console.log(findDistance(root, p, q));
