/*
Design a data structure that supports the following two operations:
void addWord(word)
bool search(word)
search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.

Example:
addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search("bad") -> true
search(".ad") -> true
search("b..") -> true
Note: You may assume that all words are consist of lowercase letters a-z.

https://leetcode.com/problems/add-and-search-word-data-structure-design/description/
*/

/**
 * Initialize your data structure here.
 */

var WordDictionary = function () {
  this.trie = { children: {}, isWord: 0, count: 0 };
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let node = this.trie;
  for (let i = 0; i < word.length; i++) {
    let c = word[i];
    // Assign either the existing node or the new node
    node.children[c] = node.children[c] || {
      children: {},
      isWord: false,
      count: 0,
    };
    // Advance the node
    node = node.children[c];
    // Increment the node
    node.count++;
  }
  // Mark the end of the node
  node.isWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  let node = this.trie;
  return this.dfs(node, word, 0);
};

WordDictionary.prototype.dfs = function (node, word, index) {
  // We need to verify the existence of the node cause the node
  // might or might not be a final word
  if (index === word.length) {
    return node.isWord;
  }

  let c = word[index];
  // If the character is in the trie, it must be able to resolve a result
  if (c in node.children) {
    let newNode = node.children[c];
    return this.dfs(newNode, word, index + 1);
  } else if (c === ".") {
    // If there's a ".", try to match any existent character we should be able
    // to resolve, exhaust all the possibilities, a,b, c, ...., z.
    for (let i = 0; i < 26; i++) {
      // Try to match any letter from a, b, ..., z
      let char = String.fromCharCode(i + "a".charCodeAt(0));
      // We only want to resolve if it's true so we can exhaust all different options
      if (char in node.children && this.dfs(node.children[char], word, index + 1)) {
        return true;
      }
    }
  }
  // None of them matched, so it's not possible
  return false;
};

var obj = new WordDictionary(); // Object.create(WordDictionary); //.createNew();
obj.addWord("bad");
obj.addWord("dad");
obj.addWord("mad");
console.log(obj);
console.log(obj.search("pad")); // -> false
console.log(obj.search("bad")); // -> true
console.log(obj.search(".ad")); // -> true
console.log(obj.search("b..")); // -> true
