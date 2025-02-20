/*
There is a binary tree rooted at 0 consisting of n nodes. The nodes are labeled from 0 to n - 1.
You are given a 0-indexed integer array parents representing the tree, where parents[i] is the parent of node i.
Since node 0 is the root, parents[0] == -1.

Each node has a score. To find the score of a node, consider if the node and
the edges connected to it were removed. The tree would become one or more non-empty subtrees.
The size of a subtree is the number of the nodes in it. The score of the node is the product of the sizes
of all those subtrees.

Return the number of nodes that have the highest score.

https://leetcode.com/problems/count-nodes-with-the-highest-score/
*/
// Approach, create the tree and get compute on a DFS
// all the results and maintain a max
// Time O(N)
// Space O(N)
class Node {
  constructor(val = null, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

var countHighestScoreNodes = function (parents) {
  let n = parents.length;
  const nodes = Array(n)
    .fill("")
    .map((_, index) => new Node(index));
  const scoreMap = {};
  let maxScore = { n: 0 };

  // Create the tree
  for (let index = 1; index < n; index++) {
    const node = nodes[index];
    // From the array, get the index
    const parent = nodes[parents[index]];

    if (parent.left) {
      parent.right = node;
    } else {
      parent.left = node;
    }
  }

  // Start with first node
  dfs(nodes[0], scoreMap, maxScore, n);
  return scoreMap[maxScore.n];
};

function dfs(node, scoreMap, maxScore, n) {
  if (!node) {
    return 0;
  }
  const left = dfs(node.left, scoreMap, maxScore, n);
  const right = dfs(node.right, scoreMap, maxScore, n);
  const count = left + right + 1;
  const restCount = n - count;

  const score = (left || 1) * (right || 1) * (restCount || 1);

  scoreMap[score] = (scoreMap[score] || 0) + 1;
  maxScore.n = Math.max(score, maxScore.n);
  return count;
}
