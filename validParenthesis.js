/*
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine
if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true

https://leetcode.com/problems/valid-parentheses/
*/

var isValid = function(s) {
    let stack = [];
    for(let i = 0; i < s.length; i++) {
        let character = s[i];
        if(character === '(' || character === '[' || character === '{') {
            stack.push(character);
        } else if(stack.length && character === ')' && stack[stack.length-1] === '(') {
            stack.pop();
        } else if(stack.length && character === ']' && stack[stack.length-1] === '[') {
            stack.pop();
        } else if(stack.length && character === '}' && stack[stack.length-1] === '{') {
            stack.pop();
        } else {
            return false;
        }
    }
    return stack.length === 0;      
};
