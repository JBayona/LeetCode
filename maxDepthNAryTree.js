/*
Given a n-ary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Nary-Tree input serialization is represented in their level order traversal, each group of children
is separated by the null value (See examples).

https://leetcode.com/problems/maximum-depth-of-n-ary-tree/description/
*/

var maxDepth = function(root) {
  if(!root) {
      return 0;
  }
  let result = 0;
  for(let node of root.children) {
      let tmp = maxDepth(node)
      result = Math.max(result, tmp);
  }
  return result + 1;
};