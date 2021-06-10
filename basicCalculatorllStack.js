/*
Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, +, -, *, / operators and empty spaces .
The integer division should truncate toward zero.

Example 1:
Input: "3+2*2"
Output: 7

Example 2:
Input: " 3/2 "
Output: 1

Example 3:
Input: " 3+5 / 2 "
Output: 5

Note:

You may assume that the given expression is always valid.
Do not use the eval built-in library function.

https://leetcode.com/problems/basic-calculator-ii/
*/

var calculate = function(s) {
    if(!s) {
        return 0;
    }
    // Remove spaces around string
    s = s.trim();
    let stack = [];
    let num = 0;
    let sign = '+';
    
    for(let i = 0; i < s.length; i++) {
        let elem = s[i];
        // No blank space needed
        if(elem === ' ') {
            continue;
        }
        // If it´s a digit
        if(!isNaN(elem)) {
            // For consecutive digits 98 => 9x10 + 8 = 98
            num = num * 10 + Number(elem);
        }
        if(isNaN(elem) || i === s.length - 1) {
            // Push the initial number into the stack
            switch(sign) {
                case '+':
                    stack.push(num);
                    break;
                case '-':
                    stack.push(-num);
                    break;
                case '*':
                    stack.push(stack.pop() * num);
                    break;
                case '/':
                    stack.push(parseInt(stack.pop() / num));
                    break;
            }
            sign = elem;
            num = 0;
        }
    }
    console.log(stack);
    let result = 0;
    result = stack.reduce((a, b) => a + b);
    return result;
};
