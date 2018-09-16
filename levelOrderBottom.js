/*
Given a binary tree, return the bottom-up level order traversal of its nodes' values. 
(ie, from left to right, level by level from leaf to root).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its bottom-up level order traversal as:
[
  [15,7],
  [9,20],
  [3]
]

https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/

*/

function TreeNode(val, left, right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function printByLevel(tree){
  let levelCount = 1;
  let currentCount = 0;
  let result = [];
  let tmp = [];
  let queue = [];
  queue.push(tree);
  while(queue.length){
    while(levelCount > 0){
      let node = queue.shift();
      tmp.push(node.val);
      if(node.left){
        queue.push(node.left);
        currentCount++;
      }
      if(node.right){
        queue.push(node.right);
        currentCount++;
      }
      levelCount -=1;
    }
    result.unshift(tmp);
    tmp = [];
    levelCount = currentCount;
    currentCount = 0;
  }
  return result;
}

tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(printByLevel(tree));  
