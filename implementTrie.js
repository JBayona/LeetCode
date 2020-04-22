/*
Implement a trie with insert, search, and startsWith methods.

Example:

Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true
Note:

You may assume that all inputs are consist of lowercase letters a-z.
All inputs are guaranteed to be non-empty strings.

https://leetcode.com/problems/implement-trie-prefix-tree/
*/

/*
Time:
- Insert: O(m)
- Search: O(m)
- StartsWith: O(m)

Space:
- O(m * n)

n is the number of words and m is the length of the words
*/
var Trie = function() {
    this.trie = {children:{}, count: 0, isWord: false};
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this.trie;
    for(let i = 0; i < word.length; i++) {
        let letter = word[i];
        //Asigna el nodo si lo encuentra o agrega un elemento para agregarlo al trie
        // Assign the node if we find it, otherwise insert new element
        node.children[letter] = node.children[letter] || {children:{}, count: 0, isWord: false};
        // Traverse node
        node = node.children[letter];
        // Count the numbers of times we have seen this node
        node.count++;
    }
    // Mark as word completed
    node.isWord = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let node = this.trie;
    for(let i = 0; i < word.length; i++) {
        let letter = word[i];
        // Check if the letter is not part of the node
        if(!node.children[letter]) {
            return false;
        }
        // If yes, traverse node
        node = node.children[letter];
    }
    return node.isWord;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let node = this.trie;
    for(let i = 0; i < prefix.length; i++) {
        let letter = prefix[i];
        // Check if the letter is not part of the node
        if(!node.children[letter]) {
            return false;
        }
        // If yes, traverse node
        node = node.children[letter];
    }
    return node.count > 0;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */