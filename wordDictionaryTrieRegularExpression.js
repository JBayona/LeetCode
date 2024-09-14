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
var WordDictionary = function() {
    this.trie = {children: {}, count: 0, isWord: false};
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let node = this.trie;
    for (let i = 0; i < word.length; i++) {
        let c = word[i];
        // Find the node or create a new node
        node.children[c] = node.children[c] || {children: {}, count: 0, isWord: false};
        // Move the node
        node = node.children[c];
        // Increment the node count
        node.count++;
    }
    // Set the variable if a node is found
    node.isWord = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    let node = this.trie;
    // Run a DFS to find the nodes
    return this.dfs(word, node, 0);
};

WordDictionary.prototype.dfs = function(word, node, index) {
    // If the node has reached the index, check if it's
    // a word or not
    if (word.length === index && node) {
        return node.isWord;
    }

    let letter = word[index];
    // If we have a "." we need to check all possible chars to see if we can find any response
    // on any of those
    if (word[index] === '.') {
        // Check all possible letters in the alphabet to find is there is a word
		for(let i = 0; i < 26;  i++) {
			let letter = String.fromCharCode('a'.charCodeAt(0) + i); 
			if(node && node.children[letter] && this.dfs(word, node.children[letter], index + 1)) {
				return true;
			}
		}
    } else {
        // Check if the letter is found and if it's an answer
        if (node && (letter in node.children)) {
            return this.dfs(word, node.children[letter], index + 1);
        }
    }
    return false;
};

var obj = new WordDictionary(); // Object.create(WordDictionary); //.createNew();
obj.addWord("bad")
obj.addWord("dad")
obj.addWord("mad")
console.log(obj);
console.log(obj.search("pad")) // -> false
console.log(obj.search("bad")) // -> true
console.log(obj.search(".ad")) // -> true
console.log(obj.search("b..")) // -> true
