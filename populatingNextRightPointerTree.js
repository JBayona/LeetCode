/*
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

 

Follow up:

You may only use constant extra space.
Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.

https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
*/

var connect = function(root) {
    visited = {};
    inorder(root, 0);
    return root;
};

function inorder(node, level) {
    if(!node) {
        return;
    }
    
    inorder(node.left, level + 1);
    node.next = null;
    if(level in visited) {
        let prev = visited[level];
        prev.next = node;
    }
    visited[level] = node;
    
    inorder(node.right, level + 1);
}

// No space memory, assuming recursive stack does not count.

var connect = function(root) {
    dfs(root, null);
    return root;
};

// preorder
function dfs(node, parent) {
    if(!node) {
        return;
    }
    
    if(parent) {
        if(parent.left === node) {
            node.next = parent.right;
        } else {
            node.next = parent.next ? parent.next.left : null;
        }
    } else {
        node.next = null;
    }
    dfs(node.left, node);
    dfs(node.right, node);
}