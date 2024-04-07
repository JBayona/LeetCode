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

// Counter approach
// Time O(N)
var checkValidString = function (s) {
  // Minim value of open parenthesis
  let low = 0;
  // Maximum value of open parenthesis
  let high = 0;
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c === "(") {
      low++;
      high++;
    } else if (c === ")") {
      // Non-negative, difference is on the star
      // It can be empty string as well, that´s why 0
      low = Math.max(0, --low);
      high--;
    } else if (c === "*") {
      // It can be empty string as well, that´s why 0
      low = Math.max(0, --low);
      high++;
    }
    // Check if we have more close parenthesis
    if (high < 0) {
      return false;
    }
  }
  // Check if the string is valif
  return low === 0;
};

// Iterative two stacks approach
var checkValidString = function (s) {
  // Stack use for open and close parenthesis
  let stack = [];
  // Stack for stars
  let stack2 = [];
  for (let i = 0; i < s.length; i++) {
    let current = s[i];
    if (current === "(") {
      stack.push(i);
    } else if (current === ")") {
      if (!stack.length && !stack2.length) {
        return false;
      } else if (stack.length) {
        stack.pop();
      } else {
        stack2.pop();
      }
    } else if (current === "*") {
      stack2.push(i);
    }
  }

  while (stack.length && stack2.length) {
    if (stack[stack.length - 1] > stack2[stack2.length - 1]) {
      return false;
    }
    stack.pop();
    stack2.pop();
  }
  return !stack.length ? true : false;
};

// Recursion approach
var checkValidString = function (s) {
  return checkValidStringHelper(s, 0, 0);
};

function checkValidStringHelper(str, index, count) {
  //Base case
  if (str.length === index) {
    if (count === 0) {
      return true;
    }
    return false;
  }

  if (count < 0) {
    return false;
  }

  let char = str[index];
  if (char === "(") {
    return checkValidStringHelper(str, index + 1, count + 1);
  } else if (char === ")") {
    return checkValidStringHelper(str, index + 1, count - 1);
  } else if (char === "*") {
    return (
      checkValidStringHelper(str, index + 1, count + 1) ||
      checkValidStringHelper(str, index + 1, count - 1) ||
      checkValidStringHelper(str, index + 1, count)
    );
  }
}

var checkValidString = function (s) {
  return checkValidStringHelper(s, 0, 0);
};

function checkValidStringHelper(str, index, count) {
  //Base case
  if (str.length === index) {
    if (count === 0) {
      return true;
    }
    return false;
  }

  if (count < 0) {
    return false;
  }

  let char = str[index];
  if (char === "(") {
    return checkValidStringHelper(str, index + 1, count + 1);
  } else if (char === ")") {
    return checkValidStringHelper(str, index + 1, count - 1);
  } else if (char === "*") {
    return (
      checkValidStringHelper(str, index + 1, count + 1) ||
      checkValidStringHelper(str, index + 1, count - 1) ||
      checkValidStringHelper(str, index + 1, count)
    );
  }
}
