/*
Given an array A of integers, return the number of (contiguous, non-empty) subarrays
that have a sum divisible by K.

Example 1:
Input: A = [4,5,0,-2,-3,1], K = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by K = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

https://leetcode.com/problems/subarray-sums-divisible-by-k/
*/

var subarraysDivByK = function(A, K) {
  let result = 0;
  let total = 0;
  let hash = {};
  for(let num of A) {
      if(total in hash) {
          hash[total]++;
      } else {
          hash[total] = 1;
      }
      // Debemos hacer la suma y sacar el módulo, si ya lo vimos antes
      // tendremos la suma y eso nos seguirá dando el conteo
      total += num;
      total =  ((total%K)+K)%K; // Por los números negativos
      // Aquí se incrementaran los resultados
      if(total in hash) {
          result += hash[total];
      }
  }
  return result;
};

