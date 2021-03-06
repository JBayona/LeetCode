/*
Given two integers representing the numerator and
denominator of a fraction, return the fraction in string format.

If the fractional part is repeating, enclose the repeating part in parentheses.

If multiple answers are possible, return any of them.

It is guaranteed that the length of the answer string is less than 104 for all the given inputs.

Example 1:
Input: numerator = 1, denominator = 2
Output: "0.5"

Example 2:
Input: numerator = 2, denominator = 1
Output: "2"

Example 3:
Input: numerator = 2, denominator = 3
Output: "0.(6)"

Example 4:
Input: numerator = 4, denominator = 333
Output: "0.(012)"

Example 5:
Input: numerator = 1, denominator = 5
Output: "0.2"

https://leetcode.com/problems/fraction-to-recurring-decimal/
*/

var fractionToDecimal = function(num, den) {
    if(!num) {
        return "0";
    }
    
    let result = '';
    if(Math.sign(num) != Math.sign(den)) {
        result += '-';
    }
    
    // Convert both to possitive numbers
    const numerator = Math.abs(num);
    const denominator = Math.abs(den);
    
    result += Math.floor(numerator/denominator);
    let reminder = numerator%denominator;
    
    // Exact number
    if(!reminder) {
        return result;
    }
    
    result += '.';
    let hash = {};
    while(reminder !== 0) {
        hash[reminder] = result.length;
        
        // For every digit in the decimal, we need to add a "0"
        // this means we need to multiply * 10
        reminder *= 10;
        result += Math.floor(reminder/denominator);
        reminder = reminder%denominator;
        
        // Repeated pattern usinng the reminder
        if(hash[reminder]) {
            let index = hash[reminder];
            return result.slice(0, index) + `(${result.slice(index)})`;
        }
    }
    return result;
};
