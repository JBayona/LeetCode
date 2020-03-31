/*
Given a string containing only three types of characters: '(', ')' and '*', write a function to check whether this string is valid. We define the validity of a string by these rules:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string.

An empty string is also valid.

Example 1:
Input: "()"
Output: True

Example 2:
Input: "(*)"
Output: True

Example 3:
Input: "(*))"
Output: True

Note:
The string size will be in the range [1, 100].

https://leetcode.com/problems/valid-parenthesis-string/
*/

var checkValidString = function(s) {
    let stack = [];
    let stack2 = [];
    for(let i = 0; i < s.length; i++) {
        let current = s[i];
        if(current === '(') {
            stack.push(i);
        } else if(current === ')') {
            if(!stack.length && !stack2.length) {
                return false;
            } else if(stack.length) {
                stack.pop();
            } else {
                stack2.pop();
            }
        } else if(current === '*') {
            stack2.push(i);
        }
    }
    
    while(stack.length && stack2.length) {
        if(stack[stack.length-1] > stack2[stack2.length-1]) {
            return false;
        }
        stack.pop();
        stack2.pop();
    }
    return !stack.length ? true : false;
};