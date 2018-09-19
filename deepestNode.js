/*
Find the deepest node
*/

function Node(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function deepestNode(node) {
  let result = {node: node, maxlvl: 0}
  findDeepestNode(node, 0, result);
  return result.node;
}

function findDeepestNode(node, level, obj) {
  if(node) {
    level++;
    if(level > obj.maxlvl) {
    obj.maxlvl = level;
      obj.node = node;
    }
    findDeepestNode(node.left, level, obj);
    findDeepestNode(node.right, level, obj);
  }
}

/*
       1
      2 .4
    6  7   5
  9
10
*/

tree = new Node(1, new Node(2, new Node(6, new Node(9, new Node(10))), new Node(7)), new Node(4, new Node(7), new Node(5)));
/* tree = new Node(1, new Node(2, new Node(4), new Node(5)), new Node(3, new Node(6, new Node(8)), new Node(7))) */
console.log(deepestNode(tree));
