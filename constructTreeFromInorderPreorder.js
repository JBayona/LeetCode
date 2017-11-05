/*
Given preorder and inorder traversal of a tree, construct the binary tree.

Note:
You may assume that duplicates do not exist in the tree.
https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
http://www.geeksforgeeks.org/construct-tree-from-given-inorder-and-preorder-traversal/
*/

function TreeNode(val, left, right){
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

function constructTreeInorderPreorder(inorder,preoder,inStart, inEnd, preIndex){
    //Base Case
    if(inStart > inEnd){
        return null;
    }
    /*Toma el primer nodo de preoder, sabems que ese sera root*/
    let node = new TreeNode(preoder[preIndex.index]);
    preIndex.index++;

    /*Si no tiene hijos retornamos*/
    if(inStart === inEnd) return node;

    //Buscamos el index del node en el array de inorder
    let index = inorder.indexOf(node.val);

    /*Usamos el index en inorder para construir el left y right subtree*/
    node.left = constructTreeInorderPreorder(inorder,preoder,inStart, index-1, preIndex);
    node.right = constructTreeInorderPreorder(inorder,preoder,index+1,inEnd,preIndex);
    return node;
}

function main(inorder,preoder){
    let n = inorder.length;
    let preIndex = {index: 0}
    return constructTreeInorderPreorder(inorder,preoder,0,n-1, preIndex);
}

//inorder = [2, 1, 3]
//post = [2, 3, 1];
inorder = ['D', 'B', 'E', 'A', 'F', 'C'];
preoder = ['A', 'B', 'D', 'E', 'C', 'F'];
console.log(main(inorder,preoder));