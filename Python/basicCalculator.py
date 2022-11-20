"""
Given a string s representing a valid expression, implement a basic calculator to evaluate it, and
return the result of the evaluation.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical
expressions, such as eval().

Example 1:
Input: s = "1 + 1"
Output: 2

Example 2:
Input: s = " 2-1 + 2 "
Output: 3

Example 3:
Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23

https://leetcode.com/problems/basic-calculator/description/
"""


class Solution:
    def calculate(self, s: str) -> int:
        result = 0
        stack = []
        sign = 1
        result_stack = []

        idx = 0
        while idx < len(s):
            c = s[idx]
            # Skip the white spaces
            if c == ' ':
                idx += 1
                continue
            elif c == '-':
                sign = -1
            elif c == '+':
                sign = 1
            elif c >= '0' and c <= '9':
                num = c
                # iterate here till you find all the digits together
                while idx + 1 < len(s) and s[idx+1] >= '0' and s[idx+1] <= '9':
                    num += s[idx+1]
                    idx += 1
                result += sign * int(num)
            elif c == '(':
                # found a new expression to evaluate
                # push current result and sign to stacks
                # reset values
                result_stack.append(result)
                stack.append(sign)
                sign = 1
                result = 0
            elif c == ')':
                # get the last value before new expression
                # plus last sign from sign stack and add to current
                # expression result
                result = result_stack.pop() + (result * stack.pop())
            idx += 1
        return result
