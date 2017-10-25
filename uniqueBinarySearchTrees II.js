/*
Given an integer n, generate all structurally unique BST's (binary search trees) that store values 1...n.

For example,
Given n = 3, your program should return all 5 unique BST's shown below.

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
https://leetcode.com/problems/unique-binary-search-trees-ii/description/
*/

function TreeNode(val, left, right){
    this.val = val;
    this.left = left || null;
    this.right = right || null;
  }
 
 function constructTrees(start,end){
  let result = [];
  if(start > end){
    return [null];
  }
  /*Recorremos todos los valores de 1 a N construyendo recursivamente
  left y right subtrees*/
  for(let i = start; i <=end; i++){
    //left subtree
    let left = constructTrees(start, i - 1);
    //right subtree
    let right = constructTrees(i+1, end)
    for(let j = 0; j < left.length; j++){
      for (let k = 0; k < right.length; k++) {
        let node = new TreeNode(i);
        node.left = left[j];
        node.right = right[k];
        result.push(node);
      }
    }
  }
  return result
 }

 function generateTrees(n){
  if(n === 0){
    return [];
  }
  return constructTrees(1,n);
 }

 n = 3;
 console.log(generateTrees(n));