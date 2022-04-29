/*
Numbers can be regarded as the product of their factors.

For example, 8 = 2 x 2 x 2 = 2 x 4.
Given an integer n, return all possible combinations of its factors. You may return the answer in any order.
Note that the factors should be in the range [2, n - 1].

Example 1:
Input: n = 1
Output: []

Example 2:
Input: n = 12
Output: [[2,6],[3,4],[2,2,3]]

Example 3:
Input: n = 37
Output: []

https://leetcode.com/problems/factor-combinations/
*/

// Backtracking
var getFactors = function (n) {
  if (n === 1) {
    return [];
  }
  let result = [];
  backtrack(Math.floor(n / 2), n, [], result);
  return result;
};

function backtrack(start, n, tmp, result) {
  if (n === 1) {
    result.push([...tmp]);
    return;
  }
  for (let i = start; i >= 2; i--) {
    const rem = n % i;
    if (rem === 0) {
      tmp.push(i);
      backtrack(i, n / i, tmp, result);
      tmp.pop();
    }
  }
}
