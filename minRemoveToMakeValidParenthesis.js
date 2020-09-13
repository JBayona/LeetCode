/*
Given a string s of '(' , ')' and lowercase English characters. 

Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so
that the resulting parentheses string is valid and return any valid string.

Formally, a parentheses string is valid if and only if:

It is the empty string, contains only lowercase characters, or
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.
 

Example 1:

Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
Example 2:

Input: s = "a)b(c)d"
Output: "ab(c)d"
Example 3:

Input: s = "))(("
Output: ""
Explanation: An empty string is also valid.
Example 4:

Input: s = "(a(b(c)d)"
Output: "a(b(c)d)"

https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/
*/

var minRemoveToMakeValid = function(s) {
    if(!s) {
        return null;
    }
    
    let stack = [];
    let ilegalIndex = [];
    for(let i = 0; i < s.length; i++) {
        let elem = s[i];
        if(elem === '(') {
            stack.push(i);
        } else if(elem === ')') {
            if(stack.length === 0) {
                ilegalIndex.push(i);
            } else {
                stack.pop();
            }
        }
    }
    
    // Add to the stack invalid open elements as well
    for(item of stack) {
        ilegalIndex.push(item);
    }
    
    let result = '';
    // Ignore the index of the invalid indexes so we can just form
    // a valid string
    for(let i = 0; i < s.length; i++) {
        if(ilegalIndex.includes(i)) {
            continue;
        }
        result += s[i];
    }
    return result;
};
