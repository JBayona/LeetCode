/*
Get Tree Diamater

http://www.geeksforgeeks.org/diameter-of-a-binary-tree/
*/

 function TreeNode(val, left, right){
    this.val = val;
    this.left = left || null;
    this.right = right || null;
  }
 
 function height(node){
  if(node === null){
    return 0;
  }
  let left = height(node.left);
  let right = height(node.right);
  return Math.max(left,right) + 1;
 }

 function getDiameter(root){
  //Base case
  if(root === null) return 0;
  //Get the length of the left and right subtree
  let lheight = height(root.left);
  let rheight = height(root.right);

  let ldiameter = getDiameter(root.left);
  let rdiameter = getDiameter(root.right);

  /*Return the max of the following tree
  1) Diameter of the left subtree
  2) Diameter of the right subtree
  3) Height of left subtree + height right subtree + 1*/
  return Math.max((lheight + rheight + 1), Math.max(ldiameter, rdiameter)); 
 }

 tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
 console.log(getDiameter(tree));

