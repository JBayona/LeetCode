/*
Given a 32-bit signed integer, reverse digits of an integer.

Note:
Assume we are dealing with an environment that could only store integers within the
32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your
function returns 0 when the reversed integer overflows.

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
*/

var reverse = function(x) {
    let isNegative = x < 0 ? true: false;
    let result = 0;
    
    if (isNegative) {
        x = x * (-1);
    }
    
    while (x !== 0) {
        result = result * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    if (result >= 2147483648) {
        return 0;
    }
    
    return isNegative ? result * (-1) : result;
};