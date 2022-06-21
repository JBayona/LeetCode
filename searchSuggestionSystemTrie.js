/*
You are given an array of strings products and a string searchWord.
Design a system that suggests at most three product names from products after each character
of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more
than three products with a common prefix return the three lexicographically minimums products.

Return a list of lists of the suggested products after each character of searchWord is typed.

Example 1:
Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [
["mobile","moneypot","monitor"],
["mobile","moneypot","monitor"],
["mouse","mousepad"],
["mouse","mousepad"],
["mouse","mousepad"]
]
Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"]
After typing m and mo all products match and we show user ["mobile","moneypot","monitor"]
After typing mou, mous and mouse the system suggests ["mouse","mousepad"]

Example 2:
Input: products = ["havana"], searchWord = "havana"
Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]

Example 3:
Input: products = ["bags","baggage","banner","box","cloths"], searchWord = "bags"
Output: [["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]

https://leetcode.com/problems/search-suggestions-system/
*/

var suggestedProducts = function (products, searchWord) {
  let trie = { children: {}, count: 0, isWord: false };
  // Add words to trie
  for (let word of products) {
    insert(trie, word);
  }

  let prefix = "";
  let result = [];
  let buffer = [];
  for (let i = 0; i < searchWord.length; i++) {
    prefix += searchWord[i];
    result.push(getWordWithStringPrefix(trie, prefix, buffer));
  }
  return result;
};

function insert(trie, word) {
  let node = trie;
  for (let i = 0; i < word.length; i++) {
    let c = word[i];
    node.children[c] = node.children[c] || {
      children: {},
      count: 0,
      isWord: false,
    };
    node = node.children[c];
    node.count++;
  }
  // Mark as completed word
  node.isWord = true;
}

function getWordWithStringPrefix(trie, prefix, buffer) {
  let node = trie;
  let result = [];
  for (let i = 0; i < prefix.length; i++) {
    let c = prefix[i];
    if (!node.children[c]) {
      return buffer;
    }
    // Move to the next node of the trie
    node = node.children[c];
  }
  dfsWithPrefix(node, prefix, buffer);
  return buffer;
}

// Runs a DFS on trie starting with given prefix and adds all
// the words in the resultBuffer, limiting result size to 3
function dfsWithPrefix(current, word, buffer) {
  if (buffer.length === 3) {
    return;
  }
  if (current.isWord) {
    buffer.push(word);
  }
  for (let i = 0; i < 26; i++) {
    let c = String.fromCharCode(i + 97); // 97 = a
    if (c in current.children) {
      dfsWithPrefix(current.children[c], word + c, buffer);
    }
  }
}

var suggestedProducts = function (products, searchWord) {
  products.sort();
  let list = [];
  let prefix = "";
  for (let i = 0; i < searchWord.length; i++) {
    let sublist = [];
    let count = 0;
    prefix += searchWord[i];
    for (let prod of products) {
      if (
        prod.length >= prefix.length &&
        prod.slice(0, i + 1) === prefix &&
        count < 3
      ) {
        sublist.push(prod);
        count++;
      }
    }
    list.push(sublist);
  }
  return list;
};
