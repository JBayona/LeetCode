function TreeNode(val,left,right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function LCABST(root,n1,n2){
  if(root === null) return null;
  /*if n1 and n2 are smaller than root, LCA is in
  the left side*/
  if(root.val > n1 && root.val > n2){
    return LCABST(root.left,n1,n2);
  }
  /*If both n1 and n2 are greater than node, LCA is
  in the right side*/
  if(root.val < n1 && root.val < n2){
    return LCABST(root.right,n1,n2);
  }
  return root;
}


/*
       5
    3     7
  2   4  6  8
*/
tree = new TreeNode(5,new TreeNode(3, new TreeNode(2, new TreeNode(4))), new TreeNode(7, new TreeNode(6), new TreeNode(8)));
n1 = 2;
n2 = 4; //Output 3
console.log(LCABST(tree,n1,n2));