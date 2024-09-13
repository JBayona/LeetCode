/*
Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

Note: 
You may assume k is always valid, 1 ≤ k ≤ BST's total elements.

Follow up:
What if the BST is modified (insert/delete operations) often and you 
need to find the kth smallest frequently? How would you optimize the kthSmallest routine?

https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/

https://leetcode.com/problems/kth-smallest-element-in-a-bst/discuss/63783/Two-Easiest-In-Order-Traverse-(Java)
*/

var kthSmallest = function (root, k) {
  let node = root;
  let stack = [];

  // Smallest elements come from left branches
  while (node) {
    stack.push(node);
    node = node.left;
  }

  let count = 0;
  while (stack.length) {
    let node = stack.pop();
    count++;
    if (count === k) {
      return node.val;
    }
    let right = node.right;
    while (right) {
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
