"""
Implement atoi which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first
non-whitespace character is found. Then, starting from this character takes an optional
initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are
ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no
such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

Note:

Only the space character ' ' is considered a whitespace character.
Assume we are dealing with an environment that could only store integers within the 32-bit signed
integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values
INT_MAX (231 − 1) or INT_MIN (−231) is returned.

https://leetcode.com/problems/string-to-integer-atoi/
"""

from math import pow

class Solution:
    def myAtoi(self, s: str) -> int:
        MAX = pow(2, 31) - 1
        
        sign = 1
        result = 0
        index = 0
        
        if len(s) == 0:
            return 0
        
        # Remove whitespaces, just move until we find a different character
        while index < len(s) and s[index] == ' ':
            index += 1

        # Check if we have a sign
        if index < len(s) and s[index] == '+':
            sign = 1
            index += 1
        elif index < len(s) and s[index] == '-':
            sign = -1
            index += 1
        
        # Try to convert the string into a number
        while index < len(s):
            # Get the number if found, ignore other and break
            # 0 - 48
            tmp = ord(s[index]) - 48
            # If we get a number between 0 and 9 means we are under the boundaries so it's
            # a number and we should consider it, otherwise we need to break the while and return
            # the result
            if tmp > 9 or tmp < 0:  # Break loop if it´s not valid
                break
            result = (result * 10) + tmp
            index += 1
        
        if result > MAX:
            result = MAX
            if sign == -1:
                result += 1
        
        return int(result) * sign
