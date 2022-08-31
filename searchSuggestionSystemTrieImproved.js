/*
You are given an array of strings products and a string searchWord.
Design a system that suggests at most three product names from products after each character
of searchWord is typed. Suggested products should have common prefix with searchWord.
If there are more than three products with a common prefix return the three lexicographically
minimums products.

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
