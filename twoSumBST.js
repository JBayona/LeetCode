/*
Given a Binary Search Tree and a target number, return true if there exist two elements in the
BST such that their sum is equal to the given target.

Example 1:

Input: 
    5
   / \
  3   6
 / \   \
2   4   7

Target = 9

Output: True
Example 2:
Input: 
    5
   / \
  3   6
 / \   \
2   4   7

Target = 28

Output: False

https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/
*/

//Op 1
// Time Complexity: O(n), Space Complexity: O(n).
var findTarget = function(root, k) {
    let hash = {};
    return dfs(root, k, hash);
};

function dfs(root, k, hash) {
    if(!root) return false;
    let tmp = k - root.val;
    if(tmp in hash) {
        return true;
    }
    hash[root.val] = root;
    return dfs(root.left, k, hash) || dfs(root.right, k, hash);
}


// Op2
// Time Complexity: O(n), Space Complexity: O(n).
var findTarget = function(root, k) {
    let array = [];
    // Walk inorder
    inorder(root, array);
    
    let i = 0;
    let j = array.length-1;
    let tmp = 0;
    
    while(i < j) {
        tmp = array[i] + array[j];
        if(tmp === k) {
            return true;
        }else if(tmp > k) {
            j--;
        } else {
            i++;
        }
    }
    
    return false;
};

function inorder(root, array) {
    if(root) {
        inorder(root.left, array);
        array.push(root.val);
        inorder(root.right, array);
    }
}