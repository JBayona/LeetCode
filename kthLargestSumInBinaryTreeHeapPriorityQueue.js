/*
You are given the root of a binary tree and a positive integer k.

The level sum in the tree is the sum of the values of the nodes that are on the same level.

Return the kth largest level sum in the tree (not necessarily distinct). If there are fewer
than k levels in the tree, return -1.

Note that two nodes are on the same level if they have the same distance from the root.

https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/description
*/

// Option 1
// Time O(V + E)
// Space O(N)
var kthLargestLevelSum = function (root, k) {
  if (!root) {
    return -1;
  }

  let maxHeap = new PriorityQueue({
    compare: (a, b) => a - b,
  });

  let queue = [];
  queue.push(root);
  while (queue.length) {
    let len = queue.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      sum += node.val;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    maxHeap.enqueue(sum);
    // Check if values are greater than the limit
    if (maxHeap.size() > k) {
      maxHeap.dequeue();
    }
  }

  // If the levels are less than K, return -1
  if (maxHeap.size() < k) {
    return -1;
  }
  return maxHeap.dequeue();
};
