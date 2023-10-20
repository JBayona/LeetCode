/*
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters
and removing all non-alphanumeric characters, it reads the same forward and backward.
Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.
Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Example 3:
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
 
https://leetcode.com/problems/valid-palindrome/description/
*/

var isPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;
  let alphanumeric = /^[a-z0-9]+$/i;

  while (left < right) {
    // Skip not valid characters
    while (left < right && !alphanumeric.test(s[left])) {
      left++;
    }

    // Skip not valid characters
    while (left < right && !alphanumeric.test(s[right])) {
      right--;
    }

    if (s[left++].toLowerCase() !== s[right--].toLowerCase()) {
      return false;
    }
  }
  return true;
};
