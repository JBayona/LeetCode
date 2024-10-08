/*
Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:
[
  [3],
  [9,20],
  [15,7]
]

https://leetcode.com/problems/binary-tree-level-order-traversal/description/
*/

function Tree(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

// BFS
// Time O(N)
var levelOrder = function (root) {
  if (!root) {
    return [];
  }
  let queue = [root];
  let result = [];
  while (queue.length) {
    let tmp = [];
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      tmp.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    result.push(tmp);
  }
  return result;
};

// Option 2
var levelOrderTransversal = function (root) {
  // Base case
  if (!root) {
    return null;
  }

  let queue = [];
  let result = [];

  queue.push(root);
  while (queue.length) {
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      console.log(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    console.log("\n");
  }
};

var levelOrder = function (tree) {
  if (!tree) return null;
  let currentCount = 0; //Num de elementos del siguiente nivel
  let queue = [];
  let levelCount = 1;
  let result = [];
  let tmp = [];
  queue.push(tree);
  while (queue.length) {
    while (levelCount > 0) {
      //Saca el primer nodo del queue
      let node = queue.shift();
      tmp.push(node.val);
      if (node.left) {
        queue.push(node.left);
        currentCount += 1;
      }
      if (node.right) {
        queue.push(node.right);
        currentCount += 1;
      }
      levelCount -= 1;
    }
    /*Si ya metimos todos los hijos, metemos ese array
      en el arreglo resultante y nuestro nivel actual tiene
      el valor del nivel que analizamos*/
    result.push(tmp);
    tmp = []; //Limpiamos el valor de nuestro temporal
    levelCount = currentCount;
    currentCount = 0;
  }
  return result;
};

tree = new Tree(
  1,
  new Tree(2, new Tree(3), new Tree(4)),
  new Tree(2, new Tree(4), new Tree(3))
);
console.log(levelOrder(tree));
