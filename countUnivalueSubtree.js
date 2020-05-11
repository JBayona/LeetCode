/*
Given a binary tree, count the number of uni-value subtrees.

A Uni-value subtree means all nodes of the subtree have the same value.

For example:
Given binary tree,
              5
             / \
            1   5
           / \   \
          5   5   5

return 4
*/

/*
DFS - Bottom-up approach, from bottom to up
BFS - Top down approach

https://leetcode.com/articles/count-univalue-subtrees/
*/

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function countUnivalueSubtree(tree) {
  count = 0;
  helper(tree);
  return count;
}

function helper(node) {
  if(node === null) {
    return true;
  }
  let left = helper(node.left);
  let right = helper(node.right);
  if(left && right) {
    if((node.left !== null && node.left.val !== node.val) || ((node.right !== null && node.right.val !== node.val))) {
      return false;
    }
    /* We meet the requirements, the root node is equal to the left and right children */
    count++;
    return true;
  }
  return false;
}

tree = new TreeNode(5, new TreeNode(1, new TreeNode(5), new TreeNode(5)), new TreeNode(5, null, new TreeNode(5)));
console.log(countUnivalueSubtree(tree));