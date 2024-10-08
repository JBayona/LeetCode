/*
You are given a 0-indexed string s of even length n. The string consists of exactly n / 2 opening brackets '[' and n / 2 closing brackets ']'.

A string is called balanced if and only if:

It is the empty string, or
It can be written as AB, where both A and B are balanced strings, or
It can be written as [C], where C is a balanced string.
You may swap the brackets at any two indices any number of times.

Return the minimum number of swaps to make s balanced.

 

Example 1:

Input: s = "][]["
Output: 1
Explanation: You can make the string balanced by swapping index 0 with index 3.
The resulting string is "[[]]".
Example 2:

Input: s = "]]][[["
Output: 2
Explanation: You can do the following to make the string balanced:
- Swap index 0 with index 4. s = "[]][][".
- Swap index 1 with index 5. s = "[[][]]".
The resulting string is "[[][]]".
Example 3:

Input: s = "[]"
Output: 0
Explanation: The string is already balanced.

https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/description
*/

// Time O(N)
var minSwaps = function (s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (stack.length && c === "]") {
      stack.pop();
    } else {
      stack.push(c);
    }
  }
  // The stack has the number of unbalanced parenthesis, so the minimum swaps we need to do
  // is the length of the stack / 2
  return stack.length / 2;
};

// Improved
// Time O(N)
var minSwaps = function (s) {
  let open = 0;
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c === "[") {
      open++;
    } else if (c === "]" && open > 0) {
      open--;
    }
  }
  // Equivalent to the stack but with constant
  // is the length of the stack / 2
  return Math.floor((open + 1) / 2);
};
