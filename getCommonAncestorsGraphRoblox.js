// Suppose we have some input data describing a graph of relationships between parents and children over multiple generations. The data is formatted as a list of (parent, child) pairs, where each individual is assigned a unique integer identifier.

// For example, in this diagram, 6 and 8 have common ancestors of 4 and 14.

//          14  13
//          |   |
// 1   2    4   12
//  \ /   / | \ /
//   3   5  8  9
//    \ / \     \
//     6   7     11

// parentChildPairs1 = [
//     (1, 3), (2, 3), (3, 6), (5, 6), (5, 7), (4, 5),
//     (4, 8), (4, 9), (9, 11), (14, 4), (13, 12), (12, 9)
// ]

// Write a function that takes the graph, as well as two of the individuals in our dataset, as its inputs and returns true if and only if they share at least one ancestor.

// Sample input and output:

// hasCommonAncestor(parentChildPairs1, 3, 8) => false
// hasCommonAncestor(parentChildPairs1, 5, 8) => true
// hasCommonAncestor(parentChildPairs1, 6, 8) => true
// hasCommonAncestor(parentChildPairs1, 6, 9) => true
// hasCommonAncestor(parentChildPairs1, 1, 3) => false
// hasCommonAncestor(parentChildPairs1, 3, 1) => false
// hasCommonAncestor(parentChildPairs1, 7, 11) => true
// hasCommonAncestor(parentChildPairs1, 6, 5) => true
// hasCommonAncestor(parentChildPairs1, 5, 6) => true

// Additional example: In this diagram, 4 and 12 have a common ancestor of 11.

//         11
//        /  \
//       10   12
//      /  \
// 1   2    5
//  \ /    / \
//   3    6   7
//    \        \
//     4        8

// parentChildPairs2 = [
//     (11, 10), (11, 12), (2, 3), (10, 2), (10, 5),
//     (1, 3), (3, 4), (5, 6), (5, 7), (7, 8),
// ]

// hasCommonAncestor(parentChildPairs2, 4, 12) => true
// hasCommonAncestor(parentChildPairs2, 1, 6) => false
// hasCommonAncestor(parentChildPairs2, 1, 12) => false

// n: number of pairs in the input


const parentChildPairs1 = [
    [1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5],
    [4, 8], [4, 9], [9, 11], [14, 4], [13, 12], [12, 9]
];

const parentChildPairs2 = [
    [11, 10], [11, 12], [2, 3], [10, 2], [10, 5],
    [1, 3], [3, 4], [5, 6], [5, 7], [7, 8]
];


function hasCommonAncestor(parentChildPairs, p, q) {
  // hash tiene como keys los hijos y una propiedad de parents
  let hash = {};
  for(let i = 0; i < parentChildPairs.length; i++) {
    let elem = parentChildPairs[i];
    let parent = elem[0];
    let child = elem[1];
    if(child in hash) {
      hash[child].count++;
      hash[child].parents.push(parent);
    } else {
      hash[child] = {count: 1, parents: [parent]}
    }
  }

  // Hash with childrens with node as parents
  console.log(hash);

  // Parents all both nodes (p and q)
  let ancestorP = getNodeAncestors(p, hash);
  let ancestorQ = getNodeAncestors(q, hash);

  // Convert those into arrays
  let arrayP = Array.from(ancestorP);
  let arrayQ = Array.from(ancestorQ);

  // Get the common ancestors
  let intersection = arrayP.filter((item) => arrayQ.includes(item));
  // These are the common ancestor they have
  console.log(intersection);
  return intersection.length > 0;
  
}

// BFS
function getNodeAncestors(p, hash) {
  let set = new Set();
  let queue = [];
  queue.push(p);
  while(queue.length) {
    let size = queue.length;
    for(let i = 0; i < size; i++) {
      let node = queue.shift();
      // Add node as parent of the node we are looking for
      if(!set.has(node) && node !== p) {
        set.add(node);
      }
      // Check for the parents of all nodes
      if(node in hash) {
        let parents = hash[node].parents;
        for(let i = 0; i < parents.length; i++) {
          queue.push(parents[i]);
        }
      }
    }
  }
  return set;
}
// Correct al section
console.log(hasCommonAncestor(parentChildPairs1, 3, 8));
// console.log(hasCommonAncestor(parentChildPairs1, 5, 8));
// console.log(hasCommonAncestor(parentChildPairs1, 6, 8));
// console.log(hasCommonAncestor(parentChildPairs1, 6, 9));
// console.log(hasCommonAncestor(parentChildPairs1, 1, 3));
// console.log(hasCommonAncestor(parentChildPairs1, 3, 1));
// console.log(hasCommonAncestor(parentChildPairs1, 7, 11));
// console.log(hasCommonAncestor(parentChildPairs1, 6, 5));
// console.log(hasCommonAncestor(parentChildPairs1, 5, 6));

// console.log(hasCommonAncestor(parentChildPairs2, 4, 12));
// console.log(hasCommonAncestor(parentChildPairs2, 1, 6));
// console.log(hasCommonAncestor(parentChildPairs2, 1, 12));