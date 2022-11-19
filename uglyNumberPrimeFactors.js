/*
An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.
Given an integer n, return true if n is an ugly number.

https://leetcode.com/problems/ugly-number/description/
*/

var isUgly = function (n) {
  if (n <= 0) {
    return false;
  }

  // These aree the factors available to use
  let factors = new Set([2, 3, 5]);
  // Use them until wee can either have 1 or not
  // That way we´ll know if those are the only
  // factors available
  for (let factor of factors) {
    while (n % factor === 0) {
      n /= factor;
    }
  }

  return n === 1;
};
