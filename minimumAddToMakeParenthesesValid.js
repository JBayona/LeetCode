/*
A parentheses string is valid if and only if:
It is the empty string,
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.
You are given a parentheses string s. In one move, you can insert a parenthesis at
any position of the string.

For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or
a closing parenthesis to be "())))".
Return the minimum number of moves required to make s valid.

Example 1:
Input: s = "())"
Output: 1

Example 2:
Input: s = "((("
Output: 3

https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/
*/
// Option 1
var minAddToMakeValid = function(s) {
    let stack = [];
    let count = 0;
    for(let i = 0; i < s.length; i++) {
        let item = s[i];
        if(item === '(') {
            stack.push(i);
        } else if(item === ')') {
            if (!stack.length) {
                count++;
            } else {
                stack.pop();
            }
        }
    }
    // The stack already might have invalid parenthesis.
    return count + stack.length;
};

// Option 2
var minAddToMakeValid = function(s) {
    let count = 0;
    let bal = 0;
    let n = s.length();
    for(int i = 0; i < n; i++) {
        bal += s.charAt(i) == '('? 1: -1;
        if(bal == -1) {
            count++;
            bal++;
        }
    }    
    return count + bal;
};

let s = "())";
console.log(minAddToMakeValid(s));
