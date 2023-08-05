/*
Given an integer n, generate all structurally unique BST's (binary search trees) that store values 1...n.

For example,
Given n = 3, your program should return all 5 unique BST's shown below.

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
https://leetcode.com/problems/unique-binary-search-trees-ii/description/
*/

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

var generateTrees = function (n) {
  if (n === 0) {
    return [];
  }
  let memo = new Map();
  return constructTrees(1, n, memo);
};

function constructTrees(start, end, memo) {
  // Result has TreeNode
  let result = [];
  if (start > end) {
    return [null];
  }

  if (memo.has(new TreeNode(start, end))) {
    return memo.get(new TreeNoode(start, end));
  }

  /*Recorremos todos los valores de 1 a N construyendo recursivamente
    left y right subtrees*/
  for (let i = start; i <= end; i++) {
    //left subtree
    let left = constructTrees(start, i - 1, memo);
    //right subtree
    let right = constructTrees(i + 1, end, memo);
    for (let j = 0; j < left.length; j++) {
      for (let k = 0; k < right.length; k++) {
        let node = new TreeNode(i);
        node.left = left[j];
        node.right = right[k];
        result.push(node);
      }
    }
  }
  memo.set(new TreeNode(start, end), result);
  return result;
}

n = 3;
console.log(generateTrees(n));
