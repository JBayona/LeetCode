/*
Implement a basic calculator to evaluate a simple expression string.

The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

Example 1:
Input: "1 + 1"
Output: 2

Example 2:
Input: " 2-1 + 2 "
Output: 3

Example 3:
Input: "(1+(4+5+2)-3)+(6+8)"
Output: 23

https://leetcode.com/problems/basic-calculator/
*/

// Option 1
var calculate = function (s) {
  let resultStack = [];
  let signStack = [];
  let result = 0;
  let sign = 1;

  let index = 0;
  // Iterate over all string
  // The white space is already ignored as we increment
  // the index at the end
  while (index < s.length) {
    let c = s[index];
    // Track the signs
    if (c === "+") {
      sign = 1;
    } else if (c === "-") {
      sign = -1;
    } else if (c >= "0" && c <= "9") {
      let num = c;
      // Iterate here until we get the entire number
      while (
        index + 1 < s.length &&
        s[index + 1] >= "0" &&
        s[index + 1] <= "9"
      ) {
        num += s[index + 1];
        index++;
      }
      // Update the number
      result += sign * Number(num);
    } else if (c === "(") {
      // Found a new expression, we need to push the current
      // state we have in our computation and reset the values
      resultStack.push(result);
      signStack.push(sign);
      result = 0;
      sign = 1;
    } else if (c === ")") {
      // We close the expression so we need to get the result
      result = resultStack.pop() + result * signStack.pop();
    }
    // Increment always the sign
    index++;
  }
  return result;
};

// Option 2
var calculate = function (s) {
  let result = 0;
  let stack = [];
  let sign = 1;
  let resultStack = [];
  for (let i = 0; i < s.length; i++) {
    // skip the spaces
    if (s[i] === " ") {
      continue;
    } else if (s[i] === "-") {
      sign = -1;
    } else if (s[i] === "+") {
      sign = 1;
    } else if (s[i] >= "0" && s[i] <= "9") {
      let num = s[i];
      // iterate here till you find all the digits together
      while (i + 1 < s.length && s[i + 1] >= "0" && s[i + 1] <= "9") {
        num += s[i + 1];
        i++;
      }
      result += sign * parseInt(num);
    } else if (s[i] === "(") {
      // found a new expression to evaluate
      // push current result and sign to stacks
      // reset values
      resultStack.push(result);
      stack.push(sign);
      sign = 1;
      result = 0;
    } else if (s[i] === ")") {
      // get the last value before new expression
      // plus last sign from sign stack and add to current
      // expression result
      result = resultStack.pop() + result * stack.pop();
    }
  }
  return result;
};
