/*
Given a binary tree, return the zigzag level order traversal of its nodes' values. 
(ie, from left to right, then right to left for the next level and alternate between).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
*/

function TreeNode(val, left, right){
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function printByLevel(tree){
  let levelCount = 1;
  let currentCount = 0;
  let queue = [];
  let flip = true;
  queue.push(tree);
  while(queue.length){
    while(levelCount > 0){
      if(flip){
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
      }else{
        let node = queue.pop();
        console.log(node.val);
        if(node.right){
          queue.unshift(node.right);
          currentCount++;
        }
        if(node.left){
          queue.unshift(node.left);
          currentCount++;
        }
      }  
      levelCount -=1;
    }
    console.log('\n');
    levelCount = currentCount;
    flip = !flip;
    currentCount = 0;
  }
}

tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(printByLevel(tree));  