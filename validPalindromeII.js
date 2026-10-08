/*

Given a string s, return true if the s can be palindrome after deleting at most one character from it.

Example 1:
Input: s = "aba"
Output: true

Example 2:
Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.

Example 3:
Input: s = "abc"
Output: false

https://leetcode.com/problems/valid-palindrome-ii/
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
  let start = 0;
  let end = s.length - 1;

  return helper(s, start, end, false);
};

function helper(s, start, end, remove) {
  // We have checked the string
  if(start >= end) {
    return true;
  }
  // Keep moving forward and reduce the scope of the string
  if(s[start] === s[end]) {
    return helper(s, start + 1, end - 1, remove);
  } else if(!remove) {
    // Check which of the letters can be removed and we have not remove one letter
    return helper(s, start + 1, end, true) || helper(s, start, end - 1, true);
  } else {
    // We have removed one letter and we need to remove a new one which is not allowed
    return false;
  }
}
