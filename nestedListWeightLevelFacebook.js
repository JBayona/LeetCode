/*
Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

Each element is either an integer, or a list -- whose elements may also be integers or other lists.

Example 1:

Input: [[1,1],2,[1,1]]
Output: 10 
Explanation: Four 1's at depth 2, one 2 at depth 1.
Example 2:

Input: [1,[4,[6]]]
Output: 27 
Explanation: One 1 at depth 1, one 4 at depth 2, and one 6 at depth 3; 1 + 4*2 + 6*3 = 27.

https://www.programcreek.com/2014/05/leetcode-nested-list-weight-sum-java/
https://leetcode.com/problems/nested-list-weight-sum/
*/
function nestedListWeightLevel(list) {
  // Send the list and the first level
  return helper(list, 1);
}

function helper(nestedList, depth) {
  // Base case
  if(!nestedList) {
    return 0;
  }
  let sum = 0;
  for(let val of nestedList) {
    // If is an array, return the sum with the new depth
    if(Array.isArray(val)) {
      sum += helper(val, depth + 1);
    } else {
      sum += val * depth;
    }
  }
  // Return accumulate sum
  return sum;
}

// array = [[1,1],2,[1,1]];
array = [1,[4,[6]]];
console.log(nestedListWeightLevel(array));