/*
You need to find the largest value in each row of a binary tree.

Example:
Input: 

          1
         / \
        3   2
       / \   \  
      5   3   9 

Output: [1, 3, 9]

https://leetcode.com/problems/find-largest-value-in-each-tree-row/
*/

var largestValues = function(root) {
    if(!root) {
        return [];
    }
    let queue = [];
    let result = [];
    let max = Number.MIN_SAFE_INTEGER;
    queue.push(root);
    while(queue.length) {
        let size = queue.length;
        for(let i = 0; i < size; i++) {
            let node = queue.shift();
            max = Math.max(node.val, max);
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            }
        }
        result.push(max);
        max = Number.MIN_SAFE_INTEGER;
    }
    return result;
};

function Node(val, left, right) {
    this.left = left || null;
    this.right = right || null;
    this.val = val;
}

var largestValues = function(root) {
    // Base case
    if(!root) {
        return null;
    }
    
    let queue = [];
    let result = [];
    
    queue.push(root);
    while(queue.length) {
        let n = queue.length;
        let max = Number.MIN_SAFE_INTEGER;
        
        for(let i = 0; i < n; i++) {
            let node = queue.shift();
            max = Math.max(max, node.val);
            if(node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            }
        }
        result.push(max);
    }
    return result;
};

tree = new Node(1, new Node(3, new Node(5), new Node(3)), new Node(2, null, new Node(9)));
console.log(largestValues(tree));