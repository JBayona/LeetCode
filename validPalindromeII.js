/*
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Note: For the purpose of this problem, we define empty string as valid palindrome.

Example 1:

Input: "A man, a plan, a canal: Panama"
Output: true
Example 2:

Input: "race a car"
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
  if(start > s.length / 2) {
    return true;
  }
  // Keep moving forward and reduce the scope of the string
  if(s[start] === s[end]) {
    return helper(s, start + 1, end - 1, remove);
  } else if(!remove) {
    // Check which of the letters can be removed and we have not remove one letter
    return helper(s, start + 1, end, !remove) || helper(s, start, end - 1, !remove);
  } else {
    // We have removed one letter and we need to remove a new one which is not allowed
    return false;
  }
}