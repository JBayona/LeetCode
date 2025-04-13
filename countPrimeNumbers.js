/*
Given an integer n, return the number of prime numbers that are strictly less than n.

Example 1:
Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

Example 2:
Input: n = 0
Output: 0
Example 3:

Input: n = 1
Output: 0

https://leetcode.com/problems/count-primes/description/
*/

// Sieve of Eratosthenes algorithm
var countPrimes = function (n) {
  // We need the numbers less than n
  if (n <= 2) return 0;

  // init an array to track prime numbers
  // At the very beginning we set all numbers as primer numbers
  let primes = new Array(n);
  for (let i = 2; i < n; i++) {
    primes[i] = true;
  }

  // Just to avoid overflow
  for (let i = 2; (i <= Math.sqrt(n - 1)) | 0; i++) {
    // or for (int i = 2; i <= n-1; i++) {
    if (primes[i]) {
      // remove all from 2, 4, 6, 8, 10, 12, .... n
      // then all from 3, 6, 9, 12, 15, 18,....
      // then all from 4, 8, 12, 16, 20, ....
      // then all from 5, 10, 15, 25, 30, 35 ... n
      for (let j = i + i; j < n; j += i) primes[j] = false;
    }
  }

  // The remaining numbers will be the prime numbers

  // Check the numbers of prime numbers
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (primes[i]) {
      count++;
    }
  }

  return count;
};

// Option 2 (Time exceeded)
var countPrimes = function (n) {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      count++;
    }
  }
  return count;
};

function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
