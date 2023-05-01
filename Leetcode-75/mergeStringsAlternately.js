/*
You are given two strings word1 and word2. Merge the strings by adding letters
in alternating order, starting with word1. If a string is longer than the other, append the additional
letters onto the end of the merged string.

Return the merged string.

Example 1:
Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: The merged string will be merged as so:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r

Example 2:
Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: Notice that as word2 is longer, "rs" is appended to the end.
word1:  a   b 
word2:    p   q   r   s
merged: a p b q   r   s

Example 3:
Input: word1 = "abcd", word2 = "pq"
Output: "apbqcd"
Explanation: Notice that as word1 is longer, "cd" is appended to the end.
word1:  a   b   c   d
word2:    p   q 
merged: a p b q c   d

https://leetcode.com/problems/merge-strings-alternately/description/?envType=study-plan-v2&id=leetcode-75
*/

var mergeAlternately = function (word1, word2) {
  let indexA = 0;
  let indexB = 0;
  let result = "";
  while (indexA < word1.length && indexB < word2.length) {
    result += word1[indexA++] + word2[indexB++];
  }

  if (indexA < word1.length) {
    result += word1.substring(indexA);
  }

  if (indexB < word2.length) {
    result += word2.substring(indexB);
  }
  return result;
};

// Option 2
var mergeAlternately = function (word1, word2) {
  let index = 0;
  let result = "";
  while (index < word1.length || index < word2.length) {
    if (index < word1.length) {
      result += word1[index];
    }
    if (index < word2.length) {
      result += word2[index];
    }
    index++;
  }
  return result;
};