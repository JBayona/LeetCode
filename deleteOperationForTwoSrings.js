/*
Given two strings word1 and word2, return the minimum number of steps required to make
word1 and word2 the same.
In one step, you can delete exactly one character in either string.

Example 1:
Input: word1 = "sea", word2 = "eat"
Output: 2

Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".

Example 2:
Input: word1 = "leetcode", word2 = "etco"
Output: 4

https://leetcode.com/problems/delete-operation-for-two-strings/
*/

// Time O(N^2)
// Get the Longest Common Subsequence and then substract the
// LCS from the length of the string
var minDistance = function (word1, word2) {
  // DP
  let max = 0;
  let table = new Array(word1.length + 1);
  for (let i = 0; i < table.length; i++) {
    table[i] = new Array(word2.length + 1).fill(0);
  }
  for (let i = 1; i < table.length; i++) {
    for (let j = 1; j < table[0].length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
      }
    }
  }
  let lcs = table[word1.length][word2.length];
  return word1.length + word2.length - (2 * lcs);
};
