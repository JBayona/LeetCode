/*
The Tribonacci sequence Tn is defined as follows: 

T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given n, return the value of Tn.

Example 1:
Input: n = 4
Output: 4
Explanation:
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4

Example 2:
Input: n = 25
Output: 1389537

https://leetcode.com/problems/n-th-tribonacci-number/description/?envType=daily-question&envId=2024-04-24
*/

// Recursion
let memo = {};
var tribonacci = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  if (n in memo) {
    return memo[n];
  }
  memo[n] = tribonacci(n - 3) + tribonacci(n - 2) + tribonacci(n - 1);
  return memo[n];
};

// Iterative
var tribonacci = function (n) {
  let n1 = 0;
  let n2 = 1;
  let n3 = 1;

  if (n === 0) {
    return n1;
  } else if (n === 1 || n === 2) {
    return n2;
  }
  let res = 0;
  for (let i = 3; i <= n; i++) {
    res = n1 + n2 + n3;
    n1 = n2;
    n2 = n3;
    n3 = res;
  }
  return res;
};
