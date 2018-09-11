/*

Traverse Tree Iterative

*/

function TreeNode(val,left,right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function inorder(tree){
  let stack = [];
  let current = tree;
  while(stack.length > 0 || current !== null){
    if(current !== null){
      stack.push(current);
      current = current.left;
    }else{
      current = stack.pop();
      console.log(current.val);
      current = current.right;
    }
  }
}

function preorder(tree){
  let stack = [];
  stack.push(tree);
  while(stack.length){
    let node = stack.shift();
    console.log(node.val);
    if(node.right){
      stack.unshift(node.right);
    }
    if(node.left){
      stack.unshift(node.left);
    }
  }
}

function postorder(tree){
  let stack = [];
  let prev = null;
  stack.push(tree);
  while(stack.length){
    let current = stack[stack.length-1];
    if(prev === null || prev.left === current || prev.right === current){
      if(current.left){
        stack.push(current.left);
      }else if(current.right){
        stack.push(current.right);
      }else{
        stack.pop();
        console.log(current.val);
      }
    }else if(current.left === prev){
      if(current.right){
        stack.push(current.right);
      }else{
        stack.pop();
        console.log(current.val);
      }
    }else if(current.right === prev){
      stack.pop();
      console.log(current.val);
    }
    prev = current;
  }
}

tree = new TreeNode(27, new TreeNode(14, new TreeNode(10), new TreeNode(19)), new TreeNode(35, new TreeNode(31), new TreeNode(42)));
console.log('Inorder');
console.log(inorder(tree));
console.log('Preorder')
console.log(preorder(tree));
console.log('Postorder');
console.log(postorder(tree));
