/*
Given two non-negative integers num1 and num2 represented as string, return the sum
of num1 and num2.

Note:
The length of both num1 and num2 is < 5100.
Both num1 and num2 contains only digits 0-9.
Both num1 and num2 does not contain any leading zero.
You must not use any built-in BigInteger library or convert the inputs to integer directly.

https://leetcode.com/problems/add-strings/
*/

var addStrings = function(num1, num2) {
    let tam1 = num1.length - 1;
    let tam2 = num2.length - 1;
    
    let carry = 0;
    let sum = 0;
    let result = '';
    while(tam1 >= 0 || tam2 >= 0) {
        let n1 = tam1 >= 0 ? num1[tam1] * 1 : 0;
        let n2 = tam2 >= 0 ? num2[tam2] * 1 : 0;
        let sum = n1 + n2 + carry;
        carry = sum / 10 | 0;
        result =  (sum >= 10 ? sum % 10 : sum) + result;
        
        tam1--;
        tam2--;
    }
    
    if(carry) {
        result = carry + result;
    }
    
    return result;
};
