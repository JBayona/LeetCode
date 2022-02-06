// Dynamic Programming
// Reference: https://www.youtube.com/watch?v=NnD96abizww
// https://github.com/mission-peace/interview/blob/master/src/com/interview/dynamic/LongestCommonSubsequence.java
/*
Given two strings text1 and text2, return the length of their longest common subsequence.

A subsequence of a string is a new string generated from the original string with some characters(can be none)
deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence
of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.
 
If there is no common subsequence, return 0.

Example 1:
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Example 2:
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.

Example 3:
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 
https://leetcode.com/problems/longest-common-subsequence/
https://www.youtube.com/watch?v=NnD96abizww
*/

/*
      a c e
      0 0 0
  a 0 1 1 1 
  b 0 1 1 1
  c 0 1 2 2
  d 0 1 2 2
  e 0 1 2 3

*/
var longestCommonSubsequence = function (text1, text2) {
  // DP
  let max = 0;
  let table = new Array(text1.length + 1);
  for (let i = 0; i < table.length; i++) {
    table[i] = new Array(text2.length + 1).fill(0);
  }
  for (let i = 1; i < table.length; i++) {
    for (let j = 1; j < table[0].length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
      }
      max = Math.max(max, table[i][j]);
    }
  }
  return max;
};

str1 = "abcdaf";
str2 = "acbcf";
// Result abcf, length = 4
console.log(longestCommonSubsequence(str1, str2));
