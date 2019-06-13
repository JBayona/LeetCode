/*
Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

Example:

Input: 38
Output: 2 
Explanation: The process is like: 3 + 8 = 11, 1 + 1 = 2. 
             Since 2 has only one digit, return it.
Follow up:
Could you do it without any loop/recursion in O(1) runtime?

https://leetcode.com/problems/add-digits/
*/

var addDigits = function(num) {
    while(num >= 10) {
        num = (num % 10) + (num / 10 | 0);
    }
    return num;
};



var addDigits = function(num) {
    if(num <= 9) {
        return num;
    }
    if(num%9 === 0) {
        return 9;
    }
    return num%9;
};