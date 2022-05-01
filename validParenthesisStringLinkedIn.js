/*
Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "(*)"
Output: true
Example 3:

Input: s = "(*))"
Output: true

https://leetcode.com/problems/valid-parenthesis-string/
*/

var checkValidString = function(s) {
  return checkValidStringHelper(s, 0, 0);
};

function checkValidStringHelper(str, index, count)  {
  //Base case
  if(str.length === index) {
      if(count === 0) {
          return true;
      }
      return false;
  }
  
  if(count < 0) {
      return false;
  }
  
  let char = str[index];
  if(char === '(') {
      return checkValidStringHelper(str, index + 1, count + 1);
  } else if(char === ')') {
      return checkValidStringHelper(str, index + 1, count - 1);
  } else if(char === '*') {
      return checkValidStringHelper(str, index + 1, count + 1) ||
      checkValidStringHelper(str, index + 1, count - 1) ||
      checkValidStringHelper(str, index + 1, count);
  }
}