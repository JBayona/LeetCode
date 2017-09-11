/*
function Tree(val, left, right){
  this.val = val;
  this.left = left ? left : null;
  this.right = right ? right : null;
}

function findHeight(t){
  return getHeight(t);
}

https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

/*Recursion para obtener el height*/
function Tree(val, left, right){
  this.val = val;
  this.left = left ? left : null;
  this.right = right ? right : null;
}


function getHeight(t){
  if(t === null){
    return -1;
  }
  let leftHeigth = getHeight(t.left);
  let rightHeigth = getHeight(t.right);
  return Math.max(leftHeigth, rightHeigth) + 1;
}

/*
       1
      /\
     2   3
    /\  / \
   4  5 6 7
      /\
      8 9
*/

tree = new Tree(1, new Tree(2, new Tree(4), new Tree(5, new Tree(8), new Tree(9))), new Tree(3, new Tree(6), new Tree(7)));
console.log(getHeight(tree));