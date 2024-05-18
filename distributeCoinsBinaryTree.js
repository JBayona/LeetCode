/*
You are given the root of a binary tree with n nodes where each node in the tree has node.val coins. There are n coins in total throughout the whole tree.

In one move, we may choose two adjacent nodes and move one coin from one node to another. A move may be from parent to child, or from child to parent.

Return the minimum number of moves required to make every node have exactly one coin.

https://leetcode.com/problems/distribute-coins-in-binary-tree/description/?envType=daily-question&envId=2024-05-18
*/
// Node X can cover its subtrees if node.val - 1 == sum(node.left) + sum(node.right)
var distributeCoins = function (root) {
  let result = { val: 0 };
  postorder(root, result);
  return result.val;
};

function postorder(node, result) {
  if (!node) {
    return 0;
  }
  let leftCoins = postorder(node.left, result);
  let rightCoins = postorder(node.right, result);
  // If the current node has more coins than its tree, a possitive number
  // will result, otherwise a negative number
  let tmp = node.val - 1 + leftCoins + rightCoins;
  result.val += Math.abs(tmp);
  return tmp;
}
