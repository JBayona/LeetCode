/*
Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, /. Each operand may be an integer or another expression.

Note:

Division between two integers should truncate toward zero.
The given RPN expression is always valid. That means the expression would
always evaluate to a result and there won't be any divide by zero operation.

Example 1:
Input: ["2", "1", "+", "3", "*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9

Example 2:
Input: ["4", "13", "5", "/", "+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6

Example 3:
Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
Output: 22
Explanation: 
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22

https://leetcode.com/problems/evaluate-reverse-polish-notation/
*/

var evalRPN = function(tokens) {
    let stack = [];
    for(let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        // Insert into the stack if the token is a number
        if(!isNaN(token)) {
            stack.push(token);
        } else {
            let b = Number(stack.pop());
            let a = Number(stack.pop());
            let result = 0;
            switch(token) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/': result = a / b | 0; break;
            }
            // Insert the result into the stack
            stack.push(result);
        }
    }
    return stack.pop();
};
