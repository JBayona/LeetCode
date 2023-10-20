/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if
the input string is valid.

An input string is valid if:
- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Every close bracket has a corresponding open bracket of the same type.
 
Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

https://leetcode.com/problems/valid-parentheses/description/
*/

var isValid = function (s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c == "(" || c == "[" || c == "{") {
      stack.push(c);
    } else if (stack.length && c === ")" && stack[stack.length - 1] === "(") {
      stack.pop();
    } else if (stack.length && c === "]" && stack[stack.length - 1] === "[") {
      stack.pop();
    } else if (stack.length && c === "}" && stack[stack.length - 1] === "{") {
      stack.pop();
    } else {
      return false;
    }
  }
  return stack.length === 0 ? true : false;
};
