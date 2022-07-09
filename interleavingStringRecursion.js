/*
Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where they are divided
into non-empty substrings such that:

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1

The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

https://leetcode.com/problems/interleaving-string/
*/

// Option 1. Recursion + Memoization
// Time complexity: O(m*n), where m is the length of s1 and n is the length of s2. That's a consequence of the fact that each (i, j) combination is computed only once.
// Space: O(m*n)
var isInterleave = function (s1, s2, s3) {
  if (s3.length === 0) {
    return true;
  }
  if (
    s1.length + s2.length < s3.length ||
    (s1.length === 0 && s2.length === 0)
  ) {
    return false;
  }
  let memo = {};
  return helper(s1, s2, s3, 0, 0, 0, memo);
};

function helper(s1, s2, s3, indexS1, indexS2, indexS3, memo) {
  // Base case
  if (indexS3 === s3.length) {
    return indexS1 === s1.length && indexS2 === s2.length;
  }

  const key = [indexS1, indexS2, indexS3].join(":");
  if (key in memo) {
    return memo[key];
  }

  let firstCall = false;
  let secondCall = false;
  // Both strings has the character
  if (
    indexS1 < s1.length &&
    indexS3 < s3.length &&
    s1[indexS1] === s3[indexS3]
  ) {
    firstCall = helper(s1, s2, s3, indexS1 + 1, indexS2, indexS3 + 1, memo);
  }
  if (
    indexS2 < s2.length &&
    indexS3 < s3.length &&
    s2[indexS2] === s3[indexS3]
  ) {
    secondCall = helper(s1, s2, s3, indexS1, indexS2 + 1, indexS3 + 1, memo);
  }
  memo[key] = firstCall || secondCall;
  return firstCall || secondCall;
}

// Option 2. Recursion
// Time complexity: O(2^n)
// Space complexity : O(m+n). The size of stack for recursive calls can go upto m+nm+n.
var isInterleave = function (s1, s2, s3) {
  if (s3.length === 0) {
    return true;
  }
  if (
    s1.length + s2.length < s3.length ||
    (s1.length === 0 && s2.length === 0)
  ) {
    return false;
  }
  return helper(s1, s2, s3, 0, 0, 0);
};

function helper(s1, s2, s3, indexS1, indexS2, indexS3) {
  // Base case
  if (indexS1 === s1.length && indexS2 === s2.length) {
    return true;
  }
  if (indexS3 >= s3.length) {
    return false;
  }
  // Both strings has the character
  if (
    indexS1 < s1.length &&
    indexS2 < s2.length &&
    s1[indexS1] === s3[indexS3] &&
    s2[indexS2] === s3[indexS3]
  ) {
    return (
      helper(s1, s2, s3, indexS1 + 1, indexS2, indexS3 + 1) ||
      helper(s1, s2, s3, indexS1, indexS2 + 1, indexS3 + 1)
    );
  } else if (
    indexS1 < s1.length &&
    indexS3 < s3.length &&
    s1[indexS1] === s3[indexS3]
  ) {
    return helper(s1, s2, s3, indexS1 + 1, indexS2, indexS3 + 1);
  } else if (
    indexS2 < s2.length &&
    indexS3 < s3.length &&
    s2[indexS2] === s3[indexS3]
  ) {
    return helper(s1, s2, s3, indexS1, indexS2 + 1, indexS3 + 1);
  } else {
    return false;
  }
}
