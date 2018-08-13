/*

Given a binary tree, return all root-to-leaf paths

https://leetcode.com/problems/binary-tree-paths/description/

*/

// Opción 1
function Node(val, left, right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}


var binaryTreePaths = function(root) {
    let result = [];
    let tmp = [];
    dfs(root, tmp, result);
    return result;
};

function dfs(node, helper, result){
    if(node) {
        helper.push(node.val);
        if(!node.left && !node.right){
            result.push(helper.join('->'));
            helper = []
        }
        dfs(node.left, helper.concat(), result);
        dfs(node.right, helper.concat(), result);
    }
}

// Opción 2
function Node(val, left, right){
this.val = val;
this.left = left || null;
this.right = right || null;
}


var binaryTreePaths = function(root) {
    let result = [];
    let tmp = [];
    dfs(root, tmp, result);
    return result;
};

function dfs(node, helper, result){
    if(node) {
        helper.push(node.val);
        if(!node.left && !node.right){
            result.push(helper.join('->'));
        }
        dfs(node.left, [...helper], result);
        dfs(node.right,[...helper], result);
    }
}

tree = new Node(1, new Node(2, null, new Node(5)), new Node(3));
console.log(binaryTreePaths(tree));

// Opción 3

/*
         1
      2     3
    4  5   6  7

    Result = [1,2,3] [1,2,5] [1,3,6] [1,3,7]
*/

function Node(val, left=null, right=null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

var getTreePaths = (node, array) => {
  if(!node) {
    console.log(' ');
    return;
  }
  array.push(node.val);
  if(node.left || node.right) {
    if(node.left) {
      getTreePaths(node.left, array);
    }
    if(node.right) {
      getTreePaths(node.right, array)
    }
  } else {
    console.log(array.join('->'));
  }
  array.pop();
}

tree = new Node(1, new Node(2, new Node(4), new Node(5)), new Node(3, new Node(6), new Node(7)));
console.log(getTreePaths(tree, []));
