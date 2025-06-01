/*
A string can be abbreviated by replacing any number of non-adjacent, non-empty substrings
with their lengths. The lengths should not have leading zeros.

For example, a string such as "substitution" could be abbreviated as (but not limited to):
"s10n" ("s ubstitutio n")
"sub4u4" ("sub stit u tion")
"12" ("substitution")
"su3i1u2on" ("su bst i t u ti on")
"substitution" (no substrings replaced)
The following are not valid abbreviations:

"s55n" ("s ubsti tutio n", the replaced substrings are adjacent)
"s010n" (has leading zeros)
"s0ubstitution" (replaces an empty substring)
Given a string word and an abbreviation abbr, return whether the string matches the given abbreviation.

A substring is a contiguous non-empty sequence of characters within a string.

Example 1:
Input: word = "internationalization", abbr = "i12iz4n"
Output: true
Explanation: The word "internationalization" can be abbreviated as "i12iz4n" ("i nternational iz atio n").

Example 2:
Input: word = "apple", abbr = "a2e"
Output: false
Explanation: The word "apple" cannot be abbreviated as "a2e".

https://leetcode.com/problems/valid-word-abbreviation/description
*/

// Approach
/*
Try and match the strings and the characters in the order in which they appear.
However, if you encounter a mismatch, check if that could be a number in the abbreviation.
If it is number, move forward in the main string (word) by that many characters and continue matching.
If we have reached the end of the strings and all the characters till now are matching, then the abbreviation is valid.
But in case a character doesn't match, or the number starts with 0, return false
*/
var validWordAbbreviation = function (word, abbr) {
  let i = 0;
  let j = 0;
  while (i < word.length && j < abbr.length) {
    // If there's a match move both chars
    if (word[i] === abbr[j]) {
      i++;
      j++;
    } else {
      // Not matching, we can try to match them
      // Is Num
      if (!isNaN(abbr[j])) {
        // Not leading zeroes
        if (abbr[j] === "0") {
          return false;
        }
        let start = j;
        while (!isNaN(abbr[j])) {
          j++;
        }
        // Get the number that was retrieved
        let n = Number(abbr.substring(start, j));
        // Advance "n" places from the word
        i += n;
      } else {
        // It's not a number and it didn't match so it's false
        return false;
      }
    }
  }
  return i === word.length && j === abbr.length;
};
