/*
A valid encoding of an array of words is any reference string s and array of indices indices such that:

words.length == indices.length
The reference string s ends with the '#' character.
For each index indices[i], the substring of s starting from indices[i] and up to (but not including) the next '#' character is equal to words[i].
Given an array of words, return the length of the shortest reference string s possible of any valid encoding of words.

Example 1:
Input: words = ["time", "me", "bell"]
Output: 10
Explanation: A valid encoding would be s = "time#bell#" and indices = [0, 2, 5].
words[0] = "time", the substring of s starting from indices[0] = 0 to the next '#' is underlined in "time#bell#"
words[1] = "me", the substring of s starting from indices[1] = 2 to the next '#' is underlined in "time#bell#"
words[2] = "bell", the substring of s starting from indices[2] = 5 to the next '#' is underlined in "time#bell#"

Example 2:
Input: words = ["t"]
Output: 2
Explanation: A valid encoding would be s = "t#" and indices = [0].

https://leetcode.com/problems/short-encoding-of-words/
*/

var minimumLengthEncoding = function (words) {
  // Remove duplicates
  let words2 = new Set(words);
  for (let word of words) {
    for (let i = 1; i < word.length; i++) {
      // If the suffix is equal to any other element
      // then remove from the set
      // suffix(time) -> ime , me , e
      let tmp = word.substring(i);
      if (words2.has(tmp)) {
        words2.delete(tmp);
      }
    }
  }
  let result = 0;
  for (let word of words2) {
    result += word.length + 1;
  }
  return result;
};
