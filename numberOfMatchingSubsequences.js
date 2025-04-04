/*
Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.

A subsequence of a string is a new string generated from the original string with some
characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
Example 1:
Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
Explanation: There are three strings in words that are a subsequence of s: "a", "acd", "ace".

Example 2:
Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
Output: 2

https://leetcode.com/problems/number-of-matching-subsequences/
*/

// Option 1
var numMatchingSubseq = function (s, words) {
  let result = 0;
  for (let i = 0; i < words.length; i++) {
    if (isSubsequence(words[i], s)) {
      result++;
    }
  }
  return result;
};

// Time O(N) Where N is the length of T
// Space O(1)
// Check if "s" is a subsequence of "t"
var isSubsequence = function (s, t) {
  let index = 0;
  for (let i = 0; i < t.length; i++) {
    if (index < s.length && t[i] === s[index]) {
      index++;
    }
  }
  if (index === s.length) {
    return true;
  }
  return false;
};

// Option 2
var numMatchingSubseq = function (s, words) {
  let map = {};
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (!(c in map)) {
      map[c] = [];
    }
  }

  for (let word of words) {
    let start = word[0];
    if (start in map) {
      map[start].push(word);
    }
  }

  let result = 0;
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    let arr = map[c];
    let len = arr.length;
    for (let j = 0; j < len; j++) {
      let str = arr.shift();
      // break down the word
      if (str.substring(1).length === 0) {
        result++;
      } else {
        if (str[1] in map) {
          map[str[1]].push(str.substring(1));
        }
      }
    }
  }
  return result;
};
