/*
The set [1,2,3,...,n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get
the following sequence for n = 3:

"123"
"132"
"213"
"231"
"312"
"321"
Given n and k, return the kth permutation sequence.

Note:

Given n will be between 1 and 9 inclusive.
Given k will be between 1 and n! inclusive.
Example 1:

Input: n = 3, k = 3
Output: "213"
Example 2:

Input: n = 4, k = 9
Output: "2314"

https://leetcode.com/problems/permutation-sequence/
*/

/*
You need to know that for n numbers the permutations can be divided to (n-1)!
groups, for n-1 numbers can be divided to (n-2)! groups, etc. That being said, k/(n-1)!
would be the index of current number, and k%(n-1)! is the index for the remaining n-1
numbers. Loop until n reaches 0 to get n numbers permutations that is kth.

https://www.youtube.com/watch?v=W9SIlE2jhBQ
*/
var getPermutation = function(n, k) {
  let numList = [];
  
  // Create array of ints between 1 and n
  for(let i = 1; i <= n; i++) {
    numList.push(i);
  }
  
  // Calculate the factorial
  let factorial = new Array(n);
  factorial[0] = 1;
  for(let i = 1; i < factorial.length; i++) {
    factorial[i] = factorial[i-1] * i;
  }
  
  // Find the permutation
  k = k-1;
  let permutation = "";
  for (let i = n; i > 0; i--){
    let index = Math.floor(k / factorial[i-1]);
    k = k % factorial[i-1];
    permutation += numList[index];
    numList.splice(index, 1);
  }
  return permutation;
};