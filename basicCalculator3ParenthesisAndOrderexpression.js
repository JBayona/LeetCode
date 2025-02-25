/*
Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, '+', '-', '*', '/' operators
and open '(' and closing parentheses ')'. The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of [-231, 231 - 1].

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().
 
Example 1:
Input: s = "1+1"
Output: 2

Example 2:
Input: s = "6-4/2"
Output: 4

Example 3:

Input: s = "2*(5+5*2)/3+(6/2+8)"
Output: 21

https://leetcode.com/problems/basic-calculator-iii/description/
*/
// Time O(2^N)
// Space O(N)
var calculate = function (s) {
  return helper(s.split(""));
};

var helper = function (tokens) {
  if (tokens.length === 0) {
    return 0;
  }
  // Remove spaces around string
  let stack = [];
  let num = 0;
  // Having + initially will have us to always perform the
  // operations once the elements are added into the stack
  // i.e 3*14/7 -> [3] num = 14, sign = * then ..
  // stack [42] and sign is updated to /
  let sign = "+";

  while (tokens.length) {
    let elem = tokens.shift();
    // No blank space needed
    if (elem === " ") {
      continue;
    }
    // If it´s a digit
    if (!isNaN(elem)) {
      // For consecutive digits 98 => 9x10 + 8 = 98
      num = num * 10 + Number(elem);
    }

    if (elem === "(") {
      // Remove the open parenthesis
      num = helper(tokens);
    }

    if (isNaN(elem) || tokens.length === 0) {
      // Push the initial number into the stack
      switch (sign) {
        case "+":
          stack.push(num);
          break;
        case "-":
          stack.push(-num);
          break;
        case "*":
          stack.push(stack.pop() * num);
          break;
        case "/":
          stack.push(Math.trunc(stack.pop() / num));
          break;
      }
      sign = elem;
      num = 0;
    }

    // Break for as we already computed the element
    if (elem === ")") {
      break;
    }
  }
  console.log(stack);
  let result = 0;
  result = stack.reduce((a, b) => a + b);
  return result;
};

// let s = "1 + 1"; // 2
// let s = "6-4/2"; // 4
// let s = "2*(5+5*2)/3+(6/2+8)"; // 21
let s = "(2+6*3+5-(3*14/7+2)*5)+3";
console.log(calculate(s));
