/**
 * 
 * 
 * 
* Serialize and deserialize a general (n-ary) Tree
*           A
*      /    |   \
*    B      C    D
*   / \        / | \ \
*  E   F      I  G  H  J
*        |
*        K
*/

/*
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network
connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize an N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. There is no
restriction on how your serialization/deserialization algorithm should work. You just need to ensure that an N-ary tree can be serialized to a string and
this string can be deserialized to the original tree structure.

For example, you may serialize the following 3-ary tree as [1 [3[5 6] 2 4]]. Note that this is just an example, you do not necessarily need to follow this format.

Or you can follow LeetCode's level order traversal serialization format, where each group of children is separated by the null value.

https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree/
*/

function TreeNode(val, children){
  this.val = val;
  this.children = children || null;
}

// Encodes a tree to a single string
function serialize(root) {
  let res = '';
  serializeHelper(root, res);
  return res;
}

function serializeHelper(node, res) {
  if(!node) {
    return '';
  }
  res += '' + node.val + '';
  let children = node.children;
  res += node.children;
  for(let child of children) {
    res += ',' + serializeHelper(child);
  }
}

// Decodes your encoded data to tree
function deserialize(data) {
  if(!data) {
    return null;
  }
  let nodes = data.split(',');
  let queue = nodes;
  return deserializeHelper(queue);
}

function deserializeHelper(queue) {
  let node = new Node();
  node.val = queue.shift();
  let size = queue.length;
  node.children = new Array(size);
  for(let i = 0; i < size; i++) {
    node.children.push(deserializeHelper(queue));
  }
  return node;
}