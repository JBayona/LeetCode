/*
You are given a perfect binary tree where all leaves are on the same level, and every parent
has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next
pointer should be set to NULL.
Initially, all next pointers are set to NULL.

Follow up:
You may only use constant extra space.
Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.

https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
*/

//  BFS
/*
        1
   2          3
4    5      6   7
*/

function TreeNode(val, left, right, next) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
    this.next = next || null;
}

var connect = function(root) {
    if(!root) {
        return null;
    }
    let queue = [];
    queue.push(root);
    while(queue.length) {
        let size = queue.length;
        let prev = null;
        for(let i = 0; i < size; i++) {
            let node = queue.shift();
            if(!prev) {
                prev = node;
            } else {
                prev.next = node;
                prev = node;
            }
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            }
        }
    }
    return root;
};

tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), new TreeNode(7)));
console.log(connect(tree));

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