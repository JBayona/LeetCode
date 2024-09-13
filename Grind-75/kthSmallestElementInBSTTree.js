/*
Given the root of a binary search tree, and an integer k, return the kth smallest
value (1-indexed) of all the values of the nodes in the tree.

Example 1:
Input: root = [3,1,4,null,2], k = 1
Output: 1

Example 2:
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
https://leetcode.com/problems/kth-smallest-element-in-a-bst/
*/

var kthSmallest = function(root, k) {
  let node = root;
  let stack = [];
  
  // Smallest elements come from left branches
  while(node) {
      stack.push(node);
      node = node.left;
  }

  let count = 0;
  while(stack.length) {
      let node = stack.pop();
      count++;
      if(count === k) {
          return node.val;
      }
      let right = node.right;
      while(right) {
          stack.push(right);
          right = right.left;
      }
  }
  return -1;
};

/*
// Option 2
// DFS
var kthSmallest = function(root, k) {
  count = k;
  result = null;
  inorder(root);
  return result;
};

function inorder(node) {
  if(!node) return;
  inorder(node.left);
  
  count--;
  if(count===0) {
      result = node.val;
      return;
  }
  
  inorder(node.right);
}
*/

// Option 3 = Heap
/*
class Solution {
  public int kthSmallest(TreeNode root, int k) {
      Queue<Integer> heap = new PriorityQueue<>((a,b) -> b-a);
      preorder(root, heap, k);
      return heap.poll();
  }
  
  public void preorder(TreeNode node, Queue<Integer> heap, int k) {
      if(node == null) {
          return;
      }
      heap.add(node.val);
      if(heap.size() > k) {
          heap.poll();
      }
      preorder(node.left, heap, k);
      preorder(node.right, heap, k);
  }
}
*/