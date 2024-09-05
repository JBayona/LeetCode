/*
Given a list of strings words representing an English Dictionary, find the longest word in words that can be built one character at a time by other words in words. If there is more than one possible answer, return the longest word with the smallest lexicographical order.
If there is no answer, return the empty string.

Example 1:
Input: 
words = ["w","wo","wor","worl", "world"]
Output: "world"

Explanation: 
The word "world" can be built one character at a time by "w", "wo", "wor", and "worl".

Example 2:
Input: 
words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
Output: "apple"

Explanation: 
Both "apply" and "apple" can be built from other words in the dictionary. However, "apple" is lexicographically smaller than "apply".

Note:

All the strings in the input will only contain lowercase letters.
The length of words will be in the range [1, 1000].
The length of words[i] will be in the range [1, 30].

https://leetcode.com/problems/longest-word-in-dictionary/description/
*/

// Time O(26N) = O(N)
// Space O(H)
var longestWord = function (words) {
  let trie = { children: {}, count: 0, isEndWord: false };

  // Create trie
  for (let word of words) {
    let node = trie;
    for (let i = 0; i < word.length; i++) {
      let c = word[i];
      // Assign the node or create a node for the given char
      node.children[c] = node.children[c] || {
        children: {},
        count: 0,
        isEndWord: false,
      };
      node.children[c].count++;
      // Iterate the node
      node = node.children[c];
    }
    // Mark the end word
    node.isEndWord = true;
    // Add the word
    node.word = word;
  }

  // Find the maximum word
  let node = trie;
  let result = { max: "" };
  dfs(node, result);
  return result.max;
};

function dfs(node, result) {
  // Base case (no children in the node)
  if (!Object.keys(node.children).length) {
    return;
  }

  // Iterate for all the alphabet
  for (let i = 0; i < 26; i++) {
    // Generate letters from a - z
    let letter = String.fromCharCode("a".charCodeAt(0) + i);
    // Check valid nodes and letters from that node, we need to check
    // for the end word for each char as we need to get the longest
    // created by all single elements in the array
    if (node.children[letter] && node.children[letter].isEndWord) {
      // Length should be greater and smaller lexicographical smaller
      // as we are iterating in order, from a to z.
      if (result.max.length < node.children[letter].word.length) {
        result.max = node.children[letter].word;
      }
      // Iterate over all possible nodes
      dfs(node.children[letter], result);
    }
  }
}

words = ["w", "wo", "wor", "worl", "world"];
// words = ["a", "banana", "app", "appl", "ap", "apply", "apple"];
console.log(longestWord(words));
