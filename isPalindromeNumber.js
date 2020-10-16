/*
Determine whether an integer is a palindrome. An integer is a palindrome
when it reads the same backward as forward.

Follow up: Could you solve it without converting the integer to a string?

Example 1:

Input: x = 121
Output: true
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
Example 4:

Input: x = -101
Output: false

https://leetcode.com/problems/palindrome-number/
*/

// Convert to string
var isPalindrome = function(x) {
    return x.toString() === x.toString().split('').reverse().join('');
};

// No convert to string
var isPalindrome = function(x) {
    if(x < 0) {
        return false;
    }
    
    let tmp = 0;
    let sum = 0;
    let n = x;
    
    while(n > 0) {
        tmp = n % 10;
        sum = (sum * 10) + tmp;
        n = Math.floor(n / 10);
    }
    
    if(sum === x) {
        return true;
    } else {
        return false;
    }
};