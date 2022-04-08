/*
You are given a nested list of integers nestedList. Each element is either an integer or a
list whose elements may also be integers or other lists.

The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1] has each
integer's value set to its depth. Let maxDepth be the maximum depth of any integer.

The weight of an integer is maxDepth - (the depth of the integer) + 1.
Return the sum of each integer in nestedList multiplied by its weight.

Example 1:
Input: nestedList = [[1,1],2,[1,1]]
Output: 8

Explanation: Four 1's with a weight of 1, one 2 with a weight of 2.
1*1 + 1*1 + 2*2 + 1*1 + 1*1 = 8
Example 2:
Input: nestedList = [1,[4,[6]]]
Output: 17
Explanation: One 1 at depth 3, one 4 at depth 2, and one 6 at depth 1.
1*3 + 4*2 + 6*1 = 17

https://leetcode.com/problems/nested-list-weight-sum-ii/
*/

// Option 1
// Time O(N)
/*function nestedListWeightLevel2(list) {
  let maxDepth = getMaxDepth(list);
  return weightedSum(list, 1, maxDepth);
}

// Get Maximum Level
function getMaxDepth(list){
  let level = 1;
  for(let elem of list) {
      if(Array.isArray(elem)) {
          level = Math.max(level, getMaxDepth(elem) + 1);
      }
  }
  return level;
}

function weightedSum(list, level, maxDepth) {
  let sum = 0;
  for(let elem of list) {
      if(Array.isArray(elem)) {
          sum += weightedSum(elem, level + 1, maxDepth);
      } else {
          sum += elem * (maxDepth - level + 1);
      }
  }
  return sum;
}*/

// Option 2
// BFS
// Time O(N)
function nestedListWeightLevel2(list) {
  let queue = [];
  let level = 1;
  let maxDepth = 0;
  let sumElem = 0;
  let prodElem = 0;

  queue.push(...list);
  while(queue.length) {
    let size = queue.length;
    for(let i = 0; i < size; i++) {
      let elem = queue.shift();
      if(Array.isArray(elem)) {
        queue.push(...elem);
      } else {
        sumElem += elem;
        prodElem += (level * elem);
      }
    }
    maxDepth = Math.max(level, maxDepth);
    level++;
  }
  return (maxDepth + 1) * sumElem - prodElem;
}

// let list = [[1,1],2,[1,1]]; // Answer 8
let list = [1,[4,[6]]]; // Answer 17
console.log(nestedListWeightLevel2(list));