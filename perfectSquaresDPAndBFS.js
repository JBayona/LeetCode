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

// DP
// Time O(N)
/*The idea behind is to store on each "i" the min squares
needed to get that element, those elements are used to get
the current element

n = 5
squares = [1, 4]

dp = [max, max, max, max, max, max]
, dp = [0, max, max, max, max, max]
i = 1, dp = [0, 1, max, max, max, max]
i = 2, dp = [0, 1, 2, max, max, max]
i = 3, dp = [0, 1, 2, 3, max, max]
i = 4, dp = [0, 1, 2, 3, 1, max]
i = 5, dp = [0, 1, 2, 3, 1, 2]
*/
var numSquares = function (n) {
  let squares = [];
  let number = 1;
  // Only add potential candidates to add up
  // They cannot be greater than "n"
  while (number * number <= n) {
    squares.push(number * number);
    number++;
  }

  let dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let square of squares) {
      if (i >= square) {
        dp[i] = Math.min(dp[i - square] + 1, dp[i]);
      }
    }
  }
  return dp[n];
};

// BFS
var numSquares = function (n) {
  let squares = [];
  let number = 1;
  // Only add potential candidates to add up
  // They cannot be greater than "n"
  while (number * number <= n) {
    squares.push(number * number);
    number++;
  }

  let visited = new Set();
  visited.add(n);
  let queue = [n];

  let level = 0;
  // Run BFS to get the least numbers
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let n = queue.shift();
      // We reach the goal
      if (n === 0) {
        return level;
      }
      // Try to usee any of the factors
      for (let j = 0; j < squares.length; j++) {
        let sum = n - squares[j];
        // Only possible candidates, if it´s less than 0
        // it means that's not a result
        if (sum >= 0 && !visited.has(sum)) {
          queue.push(sum);
        }
        visited.add(sum);
      }
    }
    level++;
  }
  return -1;
};

// BFS
// Time O(N)
// Space O(N/2)
var numSquares = function (n) {
  let squares = [];
  // Get the squares from 1 to n as we need to reach the sum from
  // the squares
  for (let i = 1; i <= n; i++) {
    squares.push(i * i);
  }
  let queue = [];
  let visited = new Set();
  visited.add(n);
  // As we are running a BFS we ensure that we´ll get the minimum number
  // of elements to get the number
  let level = 0;

  queue.push(n);
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let currentSum = queue.shift();
      if (currentSum === 0) {
        return level;
      }
      for (let j = 0; j < squares.length; j++) {
        if (currentSum - squares[j] >= 0) {
          if (!visited.has(currentSum - squares[j])) {
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
