/*
Given a binary tree, imagine yourself standing on the right side of it, return the
values of the nodes you can see ordered from top to bottom.

Example:
Input: [1,2,3,null,5,null,4]
Output: [1, 3, 4]
Explanation:
   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---

https://leetcode.com/problems/binary-tree-right-side-view/
*/
// Time O(N)
var rightSideView = function(root) {
    if(!root) {
        return [];
    }
    
    let result = [];
    let queue = [];
    queue.push(root);
    while(queue.length) {
        let size = queue.length;
        for(let i = 0; i < size; i++) {
            let node = queue.shift();
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            }
	    // Right Side View.
            if(i === size - 1) {
                result.push(node.val);
            }
        }
    }
    return result;
};

/*
       1
     /   \
    2     3
     \     \
      5     4

Level 0 → Node 1 → result = [1]
Level 1 → Node 3 (right first) → result = [1, 3]
Level 2 → Node 4 (right child of 3) → result = [1, 3, 4]
*/

// DFS Postorder
// Time O(N)
// Space O(1)
let lastLevel = -1;
var rightSideView = function (root) {
  let result = [];
  if (!root) {
    return [];
  }
  dfs(root, 0, result);
  return result;
};

function dfs(root, level, result) {
  if (!root) {
    return;
  }
  // If this is the first node we're visiting at this level,
  // it's the rightmost node at that level (because we go right first!)
  if (level === result.length) {
    result.push(root.val);
  }
  // First go right, then left
  dfs(root.right, level + 1, result);
  dfs(root.left, level + 1, result);
}

// DFS Postorder
// Time O(N)
// Space O(1)
var rightSideView = function (root) {
  let hash = {};
  let result = [];

  if (!root) {
    return [];
  }
  dfs(root, 0, hash, result);
  return result;
};

function dfs(root, depth, hash, result) {
  if (!root) {
    return;
  }
  if (!(depth in hash)) {
    result.push(root.val);
    hash[depth] += 1;
  }
  dfs(root.right, depth + 1, hash, result);
  dfs(root.left, depth + 1, hash, result);
}
