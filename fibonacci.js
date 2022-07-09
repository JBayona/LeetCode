/*
The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is
the sum of the two preceding ones, starting from 0 and 1. That is,

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), for N > 1.
Given N, calculate F(N).

Example 1:

Input: 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
Example 2:

Input: 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
Example 3:

Input: 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
https://leetcode.com/problems/fibonacci-number/
*/

// DP
var fib = function (n) {
  let dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

let memo = {};
var fib = function (N) {
  // Base case
  if (N < 1) {
    return 0;
  }

  if (N === 1) {
    return 1;
  }

  if (memo[N]) {
    return memo[N];
  }

  memo[N] = fib(N - 1) + fib(N - 2);
  return memo[N];
};

// Iterative
var fib = function (N) {
  let first = 1;
  let second = 0;
  let tmp = 0;

  while (N >= 0) {
    tmp = first;
    first = first + second;
    second = tmp;
    N--;
  }
  return second;
};
