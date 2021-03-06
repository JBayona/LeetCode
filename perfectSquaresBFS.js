/*
Given a positive integer n, find the least number of perfect square
numbers (for example, 1, 4, 9, 16, ...) which sum to n.

Example 1:

Input: n = 12
Output: 3 
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.

https://leetcode.com/problems/perfect-squares/
*/

// BFS
// Time O(N)
// Space O(N/2)
var numSquares = function(n) {
  let squares = [];
  // Get the squares from 1 to n as we need to reach the sum from
  // the squares
  for(let i = 1; i <= n; i++) {
    squares.push(i*i);
  }
  let queue = [];
  let visited = new Set();
  visited.add(n);
  // As we are running a BFS we ensure that we´ll get the minimum number
  // of elements to get the number
  let level = 0;
  
  queue.push(n);
  while(queue.length) {
    let size = queue.length;
    for(let i = 0; i < size; i++) {
      let currentSum = queue.shift();
      if(currentSum === 0) {
        return level;
      }
      for(let j = 0; j < squares.length; j++) {
        if(currentSum - squares[j] >= 0) {
          if(!visited.has(currentSum - squares[j])) {
            queue.push(currentSum - squares[j]);
          }
        } else {
          // We don`t want negative numbers
          break;
        }
        visited.add(currentSum - squares[j]);
      }
    }
    level++;
  }
  return -1;
};