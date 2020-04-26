// Dynamic Programming
// Reference: https://www.youtube.com/watch?v=NnD96abizww
// https://github.com/mission-peace/interview/blob/master/src/com/interview/dynamic/LongestCommonSubsequence.java
/*
Given two strings text1 and text2, return the length of their longest common subsequence.

A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.

 

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
 

Constraints:

1 <= text1.length <= 1000
1 <= text2.length <= 1000
The input strings consist of lowercase English characters only.

https://leetcode.com/problems/longest-common-subsequence/
https://www.youtube.com/watch?v=NnD96abizww
*/
  var longestCommonSubsequence = function(str1, str2) {
  let dp = new Array(str1.length + 1);
  let max = 0;

  // Create our dp table
  for(let i = 0; i < dp.length; i++) {
    dp[i] = new Array(str2.length + 1).fill(0);
  }

  for(let i = 1; i < dp.length; i++) {
    for(let j = 1; j < dp[i].length; j++) {
      if(str1[i-1] === str2[j-1]) {
          dp[i][j] = dp[i-1][j-1] + 1;
      } else {
          dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
      if(dp[i][j] > max) {
          max = dp[i][j];
      }
    }
  }
  console.log(dp);
  return max;
}

str1 = "abcdaf";
str2 = "acbcf";
// Result abcf, length = 4
console.log(longestCommonSubsequence(str1, str2));