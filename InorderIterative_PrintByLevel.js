function TreeNode(val, left, right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function inorder(node){
  if(node){
    inorder(node.left);
    console.log(node.val);
    inorder(node.right);
  }
}

function inorderIterative(tree){
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

function printByLevel(tree){
  let currentLevel = 1;
  let currentCount = 0;
  let queue = [];
  queue.push(tree);
  while(queue.length){
    while(currentLevel > 0){
      let node = queue.shift();
      console.log(node.val);
      if(node.left){
        queue.push(node.left);
        currentCount++;
      }
      if(node.right){
        queue.push(node.right);
        currentCount++;
      }
      currentLevel -=1;
    }
    console.log('\n');
    currentLevel = currentCount;
    currentCount = 0;
  }
}

function BSTTree(tree){
  //return tree;
  //inorder(tree);
  console.log('Print Inorder Iterative');
  inorderIterative(tree);
  console.log('Print BST By Level');
  printByLevel(tree);
}

tree = new TreeNode(8, new TreeNode(3, new TreeNode(1), new TreeNode(6, new TreeNode(4), new TreeNode(7))), new TreeNode(10,null, new TreeNode(14, new TreeNode(13), new TreeNode(15))));
console.log(BSTTree(tree));