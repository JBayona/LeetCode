/*
Given a sorted array. Write a function that creates a Balanced Binary Search Tree using array elements.

http://www.geeksforgeeks.org/sorted-array-to-balanced-bst/
*/

function Node(val,left,right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function inOrder(root){
  if(root){
    inOrder(root.left);
    console.log(root.val + " ");
    inOrder(root.right);
  }
}

function sortedArrayToBST(array,start,end){
  //Casos base
  if(start > end){
    return null;
  }
  //Get the middle of element and make it root
  let mid = Math.floor((start + end)/2);
  let node = new Node(array[mid]);

  /* Recursively construct the left subtree and make it
  left child of root */
  node.left = sortedArrayToBST(array, start, mid - 1);

  /* Recursively construct the right subtree and make it
   right child of root */
  node.right = sortedArrayToBST(array, mid + 1, end);
  return node;
}

function main(arr){
  let start = 0;
  let end = arr.length - 1;
  let tree = sortedArrayToBST(arr, start, end);
  return tree;
}

array = [1,2,3,4,5,6,7,8,9,10];
console.log(main(array));