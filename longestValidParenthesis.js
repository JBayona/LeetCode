/*
Given a string containing just the characters '(' and ')', find the length of the
longest valid (well-formed) parentheses substring.

Example 1:
Input: "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()"

Example 2:
Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"

https://leetcode.com/problems/longest-valid-parentheses/
*/
var longestValidParentheses = function(s) {
    if (!s || s.length === 0) {
        return 0;
    }
    let cL = 0;
    let cR = 0;
    let max = 0;
    // Left pass
    for (let i = 0; i < s.length; i++) {
        if (s[i] == '(') {
            cL++;
        } else {
            cR++;
        }
        if (cL == cR) {
            max = Math.max(max, cL + cR);
        } else if (cR > cL) {
            cL = 0;
            cR = 0;
        }
    }
    cL = 0;
    cR = 0;
    // Right pass
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] == ')') {
            cR++;
        } else {
            cL++;
        }
        if (cL == cR) {
            max = Math.max(max, cL +cR);
        } else if (cL > cR) {
            cL = 0;
            cR = 0;
        }
    }
    return max;
};
