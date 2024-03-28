/*
Given a positive integer n, find the pivot integer x such that:

The sum of all elements between 1 and x inclusively equals the sum of all elements between x and n inclusively.
Return the pivot integer x. If no such integer exists, return -1. It is guaranteed that there will be at most one pivot index for the given input.

Example 1:
Input: n = 8
Output: 6
Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.

Example 2:
Input: n = 1
Output: 1
Explanation: 1 is the pivot integer since: 1 = 1.

Example 3:
Input: n = 4
Output: -1
Explanation: It can be proved that no such integer exist.

https://leetcode.com/problems/find-the-pivot-integer/description/?envType=daily-question&envId=2024-03-13
*/

// Two pointers
// Time O(N)
// Space O(1)
var pivotInteger = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  let second = n;
  let pivot = n;

  while (pivot > 0) {
    if (sum === second) {
      return pivot;
    }
    sum -= pivot;
    second += pivot - 1;
    pivot--;
  }
  return -1;
};

// Option 2
var pivotInteger = function (n) {
  let i = 1;
  while (i <= n) {
    if (sum(1, i) === sum(i, n)) {
      return i;
    }
    i++;
  }
  return -1;
};

function sum(from, to) {
  let sum = 0;
  for (let i = from; i <= to; i++) {
    sum += i;
  }
  return sum;
}
