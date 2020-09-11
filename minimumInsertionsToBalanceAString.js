/*
Given a parentheses string s containing only the characters '(' and ')'. A parentheses string is balanced if:

Any left parenthesis '(' must have a corresponding two consecutive right parenthesis '))'.
Left parenthesis '(' must go before the corresponding two consecutive right parenthesis '))'.
In other words, we treat '(' as openning parenthesis and '))' as closing parenthesis.

For example, "())", "())(())))" and "(())())))" are balanced, ")()", "()))" and "(()))" are
not balanced.

You can insert the characters '(' and ')' at any position of the string to balance it if needed.

Return the minimum number of insertions needed to make s balanced.

https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string/
*/

// Option 1
// Time O(N)
// Space O(N)

var minInsertions = function(s) {
    let result = 0;
    let i = 0;
    let stack = [];
    while(i < s.length) {
        if(s[i] === '(') {
            stack.push('(');
            i++;
        } else if(s[i] === ')') {
            if(i === s.length || s[i + 1] !== ')') { // no double closing brackets
                result++;
            } else {
                i++; // next char is ok
            }
            // If stack is empty means we don´t have open bracket '('
            if(!stack.length) {
                result++;
            } else {
                stack.pop();
            }
            i++;
        }
    }
    return result + (stack.length * 2);
};

// Option 2
// Time O(N)
// Space O(1)

var minInsertions = function(s) {
    let result = 0;
    let open = 0; // Count of open brackets
    for(let i = 0; i < s.length; i++) {
        if(s[i] === '(') {
            open++;
        } else if(s[i] === ')') {
            // The next one is not closing or we reach the end of the string
            if(s[i + 1] !== ')' || s[i + 1] === s.length) {
                result++;
            } else {
                // Move to the next char as we found we are good closing brackets
                i++;
            }
            // At this point we already check the open parenthesis, so let´s remove
            if(open > 0) {
                open--;
            } else {
                // We only have one open parenthesis and we need another one, so let´s
                // count
                result++;
            }
        }
    }
    return (open * 2) + result;
};
