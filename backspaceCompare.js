/*
Given two strings S and T, return if they are equal when both are typed into empty text editors. # means a backspace character.

Example 1:

Input: S = "ab#c", T = "ad#c"
Output: true
Explanation: Both S and T become "ac".
Example 2:

Input: S = "ab##", T = "c#d#"
Output: true
Explanation: Both S and T become "".
Example 3:

Input: S = "a##c", T = "#a#c"
Output: true
Explanation: Both S and T become "c".
Example 4:

Input: S = "a#c", T = "b"
Output: false
Explanation: S becomes "c" while T becomes "b".
Note:

1 <= S.length <= 200
1 <= T.length <= 200
S and T only contain lowercase letters and '#' characters.
Follow up:

Can you solve it in O(N) time and O(1) space?

https://leetcode.com/problems/backspace-string-compare/
*/

// Stack
var backspaceCompare = function(S, T) {
    let stack1 = createStrack(S);
    let stack2 = createStrack(T);
    
    console.log(stack1);
    console.log(stack2);
    
    while(stack1.length) {
        let elementStack1 = stack1.pop();
        while(!stack2.length || stack2.pop() !== elementStack1) {
            return false;
        }
    }
    
    return !stack1.length && !stack2.length;
};

function createStrack(str) {
    let stack = [];
    for(let i = 0; i < str.length; i++) {
        if(str[i] !== '#') {
            stack.push(str[i]);
        } else if(str[i] === '#') {
            stack.pop();
        }
    }
    return stack;
}

// Option str
var backspaceCompare = function(S, T) {
    let str1 = checkSpaces(S);
    let str2 = checkSpaces(T);
    
    return str1 === str2;
};

function checkSpaces(str) {
    let formatted = '';
    for(let i = 0; i < str.length; i++) {
        if(i === 0 && str[i] !== '#' ) {
            formatted += str[i];
        } else if(str[i] === '#') {
            formatted = formatted.substring(0,  formatted.length - 1);
        } else {
            formatted += str[i];
        }
    }
    return formatted;
}