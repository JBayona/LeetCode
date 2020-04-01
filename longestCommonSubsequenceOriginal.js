/*
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

var longestCommonSubsequence = function(text1, text2) {
    // DP
    let max = 0;
    let table = new Array(text1.length + 1);
    for(let i = 0; i < table.length; i++) {
        table[i] = new Array(text2.length + 1).fill(0);
    }
    
    for(let i = 1; i < table.length; i++) {
        for(let j = 1; j < table[0].length; j++) {
            if(text1[i-1] === text2[j-1]) {
                table[i][j] = table[i-1][j-1] + 1;
            } else {
                table[i][j] = Math.max(table[i-1][j], table[i][j-1])
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