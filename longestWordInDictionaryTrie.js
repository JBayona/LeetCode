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

var longestWord = function(words) {
  let trie = {children: {}, count: 0, isEndWord: false};
  let result = {max: ''};

  // Create trie
  for(let i = 0; i < words.length; i++) {
   let node = trie;
   let singleWord = words[i];
   for(let j = 0; j < singleWord.length; j++) {
    let c = singleWord[j];
    // If we don´t have the char in the trie, add it in the trie
    if(!(c in node.children)) {
     node.children[c] = {children: {}, count: 0, isEndWord: false};
     node.children[c].count++;
    }
    // Move the move
    node = node.children[c];
   }
   node.isEndWord = true;
   // Add the complete word also in the final
   node.word = singleWord;
  }
  console.log(trie);

  // Find the maximum word
  let node = trie;
  dfs(node, result);
  return result.max;

};

function dfs(node, result) {
  // Base case (no children in the node)
  if(!Object.keys(node.children).length) {
    return;
  }

  // Iterate for all the alphabet
  for(let i = 0; i < 26; i++) {
    // Generate letters from a - z
    let letter = String.fromCharCode('a'.charCodeAt(0) + i);
    // Check if we have a children and is the ending word (verify all childrens from a - z)
    // node.children[letter].isEndWord will make sure that we analyze only those who have a
    // letter in all the words in the array, that's the function of isEndWord
    if(node.children[letter] && node.children[letter].isEndWord) {
      // If yes, check if the word is greter than our current result
      // We make sure will be in lexicographical order as we iterate
      // in alphabetical order
      if(node.children[letter].word.length > result.max.length) {
        result.max = node.children[letter].word;
      }
      dfs(node.children[letter], result);
    }
  }
}

words = ["w","wo","wor","worl", "world"];
// words = ["a", "banana", "app", "appl", "ap", "apply", "apple"];
console.log(longestWord(words));