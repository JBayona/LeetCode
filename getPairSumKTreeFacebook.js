/*
Given a tree and integer k, write a function int[] twoSum(Node root, int k) which will
return two values (a,b) such that (1) a + b = k and (2) a & b are in different levels.
*/

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// BFS
function getPairK(root, k) {
  if(!root) {
    return [];
  }
  let hash = {};
  let queue = [];
  queue.push(root);
  let level = 0;
  while(queue.length) {
    let size = queue.length;
    level++;
    for(let i = 0; i < size; i++) {
      let node = queue.shift();
      if(k - node.val in hash && hash[k - node.val] !== level) {
        return [node.val, k - node.val];
      }
      // Add the element into the hash to store value and level
      hash[node.val] = level;
      // console.log(node.val);
      if(node.left) {
        queue.push(node.left);
      }
      if(node.right) {
        queue.push(node.right);
      }
    }
  }
  console.log(hash);
  return null;
}

// BFS Option 2
// BFS
function getPairK(root, k) {
  if(!root) {
    return [];
  }
  let set = new Set();
  let queue = [];
  queue.push(root);
  let level = 0;
  while(queue.length) {
    let size = queue.length;
    let values = [];
    for(let i = 0; i < size; i++) {
      let node = queue.shift();
      if(set.has(k - node.val)) {
        return [node.val, k - node.val];
      }
      // console.log(node.val);
      if(node.left) {
        queue.push(node.left);
      }
      if(node.right) {
        queue.push(node.right);
      }
      values.push(node.val);
    }

    // For of levels
    for(let item of values) {
      if(!set.has(item)) {
        set.add(item);
      }
    }
  }
  return null;
}

/*
            11
     2             8
  3      0       4      9
0       3  6
*/
tree = new TreeNode(11, new TreeNode(2, new TreeNode(3, new TreeNode(0)), new TreeNode(0, new TreeNode(3), new TreeNode(6))), new TreeNode(8, new TreeNode(4), new TreeNode(9)));
k = 12;
console.log(getPairK(tree, k));