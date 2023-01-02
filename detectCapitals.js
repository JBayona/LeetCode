/*
We define the usage of capitals in a word to be right when one of the following cases holds:

All letters in this word are capitals, like "USA".
All letters in this word are not capitals, like "leetcode".
Only the first letter in this word is capital, like "Google".
Given a string word, return true if the usage of capitals in it is right.

Example 1:
Input: word = "USA"
Output: true

Example 2:
Input: word = "FlaG"
Output: false

https://leetcode.com/problems/detect-capital/description/
*/

var detectCapitalUse = function (word) {
  let capitalCount = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === word[i].toUpperCase()) {
      capitalCount++;
    }
  }

  // Only first letter
  if (capitalCount === 1) {
    return word[0] === word[0].toUpperCase();
  } else if (capitalCount === word.length) {
    // All are capitals letters
    return true;
  } else if (capitalCount > 1) {
    //More than one capital is not a right use.
    return false;
  }
  // No capital letters
  return true;
};
