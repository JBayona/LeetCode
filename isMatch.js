/*
Implement regular expression matching with support for '.' and '*'.

'.' Matches any single character.
'*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

The function prototype should be:
bool isMatch(const char *s, const char *p)

Some examples:

isMatch("aa","a") → false
isMatch("aa","aa") → true
isMatch("aaa","aa") → false
isMatch("aa", "a*") → true
isMatch("aa", ".*") → true
isMatch("ab", ".*") → true
isMatch("aab", "c*a*b") → true

https://leetcode.com/problems/regular-expression-matching/#/description
*/

// Time O(2^N)
var isMatch = function(s, p) {
    // Base case: if pattern is empty, the string must also be empty to match
    if (p.length === 0){
        return s.length === 0;
    }

    // Check if the first character matches (considering '.' as a wildcard)
    let firstMatch = s.length > 0 && (s[0] === p[0] || p[0] === '.');

    // Handle '*' in the pattern
    if (p.length >= 2 && p[1] === '*') {
        // Case 1: '*' means we skip the "x*" part in the pattern
        // Case 2: '*' means we keep the first character if there's a match and continue matching
        return (isMatch(s, p.substring(2)) || (firstMatch && isMatch(s.substring(1), p)));
    } else {
        // Normal case: match one character and move to the next
        return firstMatch && isMatch(s.substring(1), p.substring(1));
    }
};

/*
https://www.youtube.com/watch?v=l3hda49XcDE
*/

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    // s = string, p = pattern
    let dp = new Array(s.length+1);
    for(let i = 0; i < dp.length; i++) {
        dp[i] = new Array(p.length+1).fill(false);
    }
    
    // In case there's empty string for s and p
    dp[0][0] = true;
    
    //Deal with column 0 cases for patterns like a*, a*b* or a*b*c*
    // To set true or false for the first column
    for(let i = 1; i < dp[0].length; i++){
        if(p[i-1] === '*') {
            dp[0][i] = dp[0][i-2];
        }
    }
    
    for(let i = 1; i < dp.length; i++) {
        for(let j = 1; j < dp[0].length; j++) {
            if(p[j-1] === '.' || p[j-1] === s[i-1]) {
                dp[i][j] = dp[i-1][j-1];
            }else if(p[j-1] === '*') {
                dp[i][j] = dp[i][j-2];
                if(p[j-2] === '.' || p[j-2] === s[i-1]){
                    dp[i][j] = dp[i][j] || dp[i-1][j];
                }
            }else {
                dp[i][j] = false;
            }
        }
    }
    
    return dp[s.length][p.length]
};

s = "aab";
p = "c*a*b";
console.log(isMatch(s,p));
