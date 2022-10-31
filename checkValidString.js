/*
Valid string
Given a string containing only three types of characters: '(', ')' and '*', write a function to check whether this string is valid. We define the validity of a string by these rules:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string.

An empty string is also valid.
Example 1:
Input: "()"
Output: True

Example 2:
Input: "(*)"
Output: True

Example 3:
Input: "(*))"
Output: True

Note:
The string size will be in the range [1, 100].

https://leetcode.com/problems/valid-parenthesis-string/
*/

// Time O(N)
// Space O(N)
var checkValidString = function(s) {
    let stack = [];
    let stack2 = [];
    for(let i = 0; i < s.length; i++) {
        let current = s[i];
        if(current === '(') {
            stack.push(i);
        } else if(current === ')') {
            if(!stack.length && !stack2.length) {
                return false;
            } else if(stack.length) {
                stack.pop();
            } else {
                stack2.pop();
            }
        } else if(current === '*') {
            stack2.push(i);
        }
    }
    
    while(stack.length && stack2.length) {
        // If the index of stack > than index on stack 2 it means we can not use it to close the parenthesis
        if(stack[stack.length-1] > stack2[stack2.length-1]) {
            return false;
        }
        stack.pop();
        stack2.pop();
    }
    return !stack.length ? true : false;
};

// Time O(N)
// Space O(1)
var checkValidString = function(s) {
    let cmax = 0;
    let cmin = 0;
    for(let i = 0; i < s.length; i++) {
        let current = s[i];
        if(current === '(') {
            cmax++;
            cmin++;
        } else if(current === ')'){
            cmax--;
            cmin--;
        } else {
            cmax++; // if `*` become `(` then openCount++
            cmin--; // if `*` become `)` then openCount--
                    // if `*` become `` then nothing happens
                    // So openCount will be in new range [cmin-1, cmax+1]
        }
        if (cmax < 0) return false; // Don't have enough openCount -> Invalid
        cmin = Math.max(cmin, 0); // Keep openCount >= 0
    }
    return cmin == 0; // Return true if can found `openCount == 0` in range [cmin, cmax]
};

// Recursion
var checkValidString = function(s) {
    return checkValidStringHelper(s, 0, 0);
};

function checkValidStringHelper(str, index, count)  {
    //Base case
    if(str.length === index) {
        if(count === 0) {
            return true;
        }
        return false;
    }
    
    if(count < 0) {
        return false;
    }
    
    let char = str[index];
    if(char === '(') {
        return checkValidStringHelper(str, index + 1, count + 1);
    } else if(char === ')') {
        return checkValidStringHelper(str, index + 1, count - 1);
    } else if(char === '*') {
        return checkValidStringHelper(str, index + 1, count + 1) || // ( case
        checkValidStringHelper(str, index + 1, count - 1) || // ) case
        checkValidStringHelper(str, index + 1, count); // * case
    }
}
