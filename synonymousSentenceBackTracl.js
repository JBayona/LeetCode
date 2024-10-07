/*
You are given a list of equivalent string pairs synonyms where synonyms[i] = [si, ti] indicates that si
and ti are equivalent strings. You are also given a sentence text.

Return all possible synonymous sentences sorted lexicographically.

Example 1:
Input: synonyms = [["happy","joy"],["sad","sorrow"],["joy","cheerful"]], text = "I am happy today but was sad yesterday"
Output: ["I am cheerful today but was sad yesterday","I am cheerful today but was sorrow yesterday","I am happy today but was sad yesterday","I am happy today but was sorrow yesterday","I am joy today but was sad yesterday","I am joy today but was sorrow yesterday"]

Example 2:
Input: synonyms = [["happy","joy"],["cheerful","glad"]], text = "I am happy today but was sad yesterday"
Output: ["I am happy today but was sad yesterday","I am joy today but was sad yesterday"]

https://leetcode.com/problems/synonymous-sentences/description
*/

// Approach, get all the tokens
// Crate mappings for both sides
// Use backtracking to generate all epxressions
// Sort the result
// Time O(syns^text words)
// Space O(syns + words);
var generateSentences = function (synonyms, text) {
  let sentences = [];
  // Everything is based on the tokens
  const tokens = text.trim().split(" ");
  let map = {};

  // Create all the mappings
  for (let [word1, word2] of synonyms) {
    if (!(word1 in map)) {
      map[word1] = [];
    }
    if (!(word2 in map)) {
      map[word2] = [];
    }
    map[word1].push(word2);
    map[word2].push(word1);
  }
  let tmp = [];
  // Generate all variations
  generate(0, sentences, tmp, tokens, map);
  // Sort
  return sentences.sort((a, b) => (a < b ? -1 : 1));
};

function generate(index, sentences, tmp, tokens, map) {
  // If we are done ceating the variations, insert into the
  // sentences
  if (index === tokens.length) {
    sentences.push(tmp.join(" "));
    return;
  }

  let token = tokens[index];
  const words = [];
  getWords(token, words, new Set(), map);
  // When there's no mapping, we will have only the word in "words"
  // This will be executed only when there are no mappings
  if (words.length === 0) {
    words.push(token);
  }
  // When there are mappings, we will get all mappings in words like
  // words = [happy, joy, cheerful] and here we will go over all the different
  // variations until we get at the end and we backtrack
  for (const word of words) {
    tmp.push(word);
    generate(index + 1, sentences, tmp, tokens, map);
    // Backtrack
    tmp.pop();
  }
}

// Get all the words from both sides of the mappings
// Get all mappings with all the variations
function getWords(syn, words, visited, map) {
  // Validate that the word has not been seen before and it
  // has a mapping
  if (!map[syn] || visited.has(syn)) {
    return;
  }
  // Mark the word and the synonym
  visited.add(syn);
  words.push(syn);
  for (const word of map[syn]) {
    getWords(word, words, visited, map);
  }
}
