/*
You are given an array of strings products and a string searchWord.
Design a system that suggests at most three product names from products after each character
of searchWord is typed. Suggested products should have common prefix with searchWord. If there are morethan three products with a common prefix return the three lexicographically minimums products.

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

// Trie + sort
// Sort = NLogN
// Build Tree
// O(N)
// Space O(NKM), k = 3, M = number of longest product
// Total
// Space O(s) s is the number of characters to search
// Space O(sk)
class Trie {
  constructor() {
    this.trie = this.createNode();
  }

  createNode(value = undefined) {
    return {
      value,
      children: {},
      isWord: false,
      count: 0,
    };
  }

  addWord(word) {
    let node = this.trie;
    for (let c of word) {
      node.children[c] = node.children[c] || this.createNode();
      node = node.children[c];
      node.count++;
    }
    node.value = word;
    node.isWord = true;
  }

  searchInTrie(word) {
    let result = [];
    let node = this.trie;
    for (let c of word) {
      let vals = [];
      if (node && node.children) {
        this.dfs(vals, node.children[c]);
        node = node.children[c];
      }
      result.push(vals);
    }
    return result;
  }

  dfs(vals, node) {
    // Char not found
    if (!node) return;
    // Already got the 3 results, return
    if (vals.length >= 3) {
      return;
    }
    // Find
    if (node.isWord) {
      vals.push(node.value);
    }
    // Traverse over the children.
    for (let i in node.children) {
      this.dfs(vals, node.children[i]);
    }
  }
}

var suggestedProducts = function (products, searchWord) {
  // Sorting will help us to get the products sorted based on lexicographical order
  products.sort();
  let t = new Trie();
  products.forEach((e) => t.addWord(e));
  return t.searchInTrie(searchWord);
};

// Option 1
var suggestedProducts = function (products, searchWord) {
  let trie = { children: {}, count: 0, isWord: false };
  // Add words to trie
  for (let word of products) {
    insert(trie, word);
  }

  let prefix = "";
  let result = [];
  let buffer = [];
  // For each type, we need to get the string prefix
  for (let i = 0; i < searchWord.length; i++) {
    prefix += searchWord[i];
    result.push(getWordWithStringPrefix(trie, prefix, buffer));
  }
  return result;
};

// Insert word in the trie
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
    // No other char is found, return the current result
    if (!node.children[c]) {
      return buffer;
    }
    // Move to the next node of the trie
    node = node.children[c];
  }
  // Run DFS based on the prefix we found in the tree and get all the children
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

// Option 2
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
