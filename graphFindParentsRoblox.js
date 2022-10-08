/*
// Suppose we have some input data describing a graph of relationships between
// parents and children over multiple generations. The data is formatted as a list
// of (parent, child) pairs, where each individual is assigned a unique integer identifier.

// For example, in this diagram, 3 is a child of 1 and 2, and 5 is a child of 4

// 1   2    4 
//  \ /   / | \
//   3   5  8  9
//    \ / \     \
//     6   7     11

// parentChildPairs1 = [
//     (1, 3), (2, 3), (3, 6), (5, 6),
//     (5, 7), (4, 5), (4, 8), (4, 9), (9, 11)
// ]

// Write a function that takes this data as input and return two collections: one containing
// all individuals with zero know parents, and one containing
// all individuals with exactly one parent

// Sample input and output:
// Output may be in any order

// findNodesWithZeroAndOneParents(parentChildPairs) => [
// [1, 2, 4] // Individuals with zero parents
// [5, 7, 8, 9, 11] // Individuals with exactly one parent
//]

// n: number of pairs in the input   
*/

const parentChildPairs1 = [
    [1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5],
    [4, 8], [4, 9], [9, 11]
];

const findNodesWithZeroAndOneParents = function(parentChildPairs1) {
  // Parent with how many childrens do we have
  let parentsHash = {};
  // How many parents do we have
  let childrensHash = {};
  
  for(let i = 0; i < parentChildPairs1.length; i++) {
    let elem = parentChildPairs1[i];
    let parent = elem[0];
    if(parent in parentsHash) {
      parentsHash[parent]++;
    } else {
      parentsHash[parent] = 1;
    }
  }
  
  for(let i = 0; i < parentChildPairs1.length; i++) {
    let elem = parentChildPairs1[i];
    let child = elem[1];
    if(child in childrensHash) {
      childrensHash[child]++;
    } else {
      childrensHash[child] = 1;
    }
  }
  
  //console.log(parentsHash);
  //console.log(childrensHash);
  
  // Get the result
  let individualWithZeroParents = [];
  let individualWithOneParent = [];
  
  for(let prop in parentsHash) {
    if(!(prop in childrensHash)) {
      individualWithZeroParents.push(prop);
    }
  }
  
  for(let prop in childrensHash) {
    if(childrensHash[prop] === 1) {
      individualWithOneParent.push(prop);
    }
  }
  
  console.log(individualWithZeroParents);
  console.log(individualWithOneParent);
}

findNodesWithZeroAndOneParents(parentChildPairs1);
*/
