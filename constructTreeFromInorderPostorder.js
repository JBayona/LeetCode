/*
Given inorder and postorder traversal of a tree, construct the binary tree.

Note:
You may assume that duplicates do not exist in the tree.
https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
http://www.geeksforgeeks.org/construct-a-binary-tree-from-postorder-and-inorder/
*/

function TreeNode(val, left, right){
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

function constructTreeInorderPostorder(inorder,post,inStart, inEnd, pIndex){
    //Base Case
    if(inStart > inEnd){
        return null;
    }
    /*Toma el ultimo nodo de postorder, sabems que ese sera root*/
    let node = new TreeNode(post[pIndex.index]);
    pIndex.index--;

    /*Si no tiene hijos retornamos*/
    if(inStart === inEnd) return node;

    //Buscamos el index del node en el array de inorder
    let index = inorder.indexOf(node.val);

    /*Usamos el index en inorder para construir el left y right subtree*/
    node.right = constructTreeInorderPostorder(inorder,post,index+1,inEnd,pIndex);
    node.left = constructTreeInorderPostorder(inorder,post,inStart, index-1, pIndex);
    return node;
}

function main(inorder,post){
    let n = inorder.length;
    let pIndex ={ index: n-1};
    return constructTreeInorderPostorder(inorder,post,0,n-1, pIndex);
}

//inorder = [2, 1, 3]
//post = [2, 3, 1];
inorder = [4, 8, 2, 5, 1, 6, 3, 7];
post = [8, 4, 5, 2, 6, 7, 3, 1];
console.log(main(inorder,post));