/*
Given a non-negative integer num represented as a string, remove k digits from the number so that
the new number is the smallest possible.

Note:
The length of num is less than 10002 and will be ≥ k.
The given num does not contain any leading zero.
Example 1:

Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
Example 2:

Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
Example 3:

Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.

https://leetcode.com/problems/remove-k-digits/
*/
// Time O(N)
var removeKdigits = function(num, k) {
    let stack = [];
    for(item of num) {
        // Pop element from the stack if the current element is smaller than the last added in the stack
        while(k && stack.length && stack[stack.length-1] > item) {
            stack.pop();
            k--;
        }
        stack.push(item);
    }
    
    // If there are still k elements to remove, then remove it
    // from the stack
    while(k > 0) {
        stack.pop();
        k--;
    }
    
    // Remove leading zeroes
    let str = stack.join('');
    let result = strip(str);
    
    // If we remove all k chars, example: nums = 10, k = 2
    return result ? result : '0';
};

// Remove leading zeroes
function strip(str, remove) {
    // Remove from the left
    while(str.length && str[0] === '0') {
        str = str.substring(1);
    }
    return str;
}