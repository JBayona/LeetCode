/*
Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.

You have the following 3 operations permitted on a word:

Insert a character
Delete a character
Replace a character
Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')

https://leetcode.com/problems/edit-distance/description/
*/

/*
   X   h    o.    r.     s.     e

X  0.  1.   2.    3.     4.     5  = 5 operations from null to the string above

r  1   1.   2.    2.     3.     4

o  2   2.   1.    2      3.     4

s  3   3.   2.    2.     2.     3

*/
var minDistance = function(word1, word2) {
    // create dp table
    let dp = new Array(word1.length + 1);
    for(let i = 0; i < dp.length; i++) {
        dp[i] = new Array(word2.length + 1);
    }
    
    // Fill the first row with 0...word.length as we consoder the null value
    for(let i = 0; i < dp[0].length; i++) {
        dp[0][i] = i;
    }
    
    // Do the same for the column, fill from 0... word2.length
    for(let i = 0; i < dp.length; i++) {
        dp[i][0] = i;
    }
    
    for(let i = 1; i <= word1.length; i++) {
        for(let j = 1; j <= word2.length; j++) {
            // If we have the same character, we take it from the diagonal which holds the
            // minimum value to get that caracter
            if(word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                // Otherwise, get the minimum from the left, diagonal and top + 1
                dp[i][j] = Math.min(dp[i][j-1], dp[i-1][j-1], dp[i-1][j]) + 1
            }
        }
    }
    
    // the minimum is the final element of our matrix
    return dp[word1.length][word2.length];
};

word1 = "horse";
word2 = "ros";
console.log(minDistance(word1, word2));