"""
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:
Input: x = 123
Output: 321

Example 2:
Input: x = -123
Output: -321

Example 3:
Input: x = 120
Output: 21

Example 4:
Input: x = 0
Output: 0

https://leetcode.com/problems/reverse-integer/
"""

import math
class Solution(object):
    def reverse(self, x):
        """
        :type x: int
        :rtype: int
        """
        factor = -1 if x < 0 else 1
        reversed_number = 0
        while x != 0:
            reversed_number = (reversed_number * 10) + math.floor(x % 10)
            x = math.floor(x//10)
            
        if reversed_number >= 2147483648:
            return 0
        
        return int(factor * reversed_number)