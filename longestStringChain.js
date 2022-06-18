/*
You are given an array of words where each word consists of lowercase English letters.

wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere
in wordA without changing the order of the other characters to make it equal to wordB.

For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is
a predecessor of word2, word2 is a predecessor of word3, and so on.
A single word is trivially a word chain with k == 1.
Return the length of the longest possible word chain with words chosen from the given list of words.

Example 1:
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chains is ["a","ba","bda","bdca"].

Example 2:
Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].

Example 3:
Input: words = ["abcd","dbqca"]
Output: 1
Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.

https://leetcode.com/problems/longest-string-chain/
*/

// Time O(N^2)
var longestStrChain = function (words) {
  if (!words.length) {
    return 0;
  }
  // Sort the array based on the length
  // This will help us to compute easier if we can
  // form a string by removing one char
  words.sort((a, b) => a.length - b.length);
  let hash = {};
  let result = 0;
  for (let word of words) {
    hash[word] = 1;

    // Iterate for each word and remove one char and see if we
    // have seen that before, if yes and the count is greater
    // that means that we can increase the chain
    for (let i = 0; i < word.length; i++) {
      let tmp = word;
      let nextStr = tmp.replace(tmp[i], "");

      if (nextStr in hash && hash[nextStr] + 1 > hash[word]) {
        hash[word] = hash[nextStr] + 1;
      }
    }
    result = Math.max(result, hash[word]);
  }
  return result;
};

words = ["a", "b", "ba", "bca", "bda", "bdca"];
console.log(longestStrChain(words));
