function TreeNode(val,left,right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function getMin(node){
  if(node === null) return;
  if(node.left === null) return node.val;
  let min = getMin(node.left);
  return min;
}

function getMax(node){
  if(node === null) return;
  if(node.right === null) return node.val;
  let max = getMax(node.right);
  return max;
}


/*
       3
    6     8
  2   11    13
     9  5  7
*/
tree = new TreeNode(3, new TreeNode(6, new TreeNode(2), new TreeNode(11, new TreeNode(9), new TreeNode(5))), new TreeNode(8,null,new TreeNode(13, new TreeNode(7))));
console.log(getMin(tree));
console.log(getMax(tree));