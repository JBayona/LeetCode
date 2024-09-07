/*
Design a search autocomplete system for a search engine. Users may input a sentence (at least one word
and end with a special character '#').

You are given a string array sentences and an integer array times both of length n where
sentences[i] is a previously typed sentence and times[i] is the corresponding number of times
the sentence was typed. For each input character except '#', return the top 3 historical hot
sentences that have the same prefix as the part of the sentence already typed.

Here are the specific rules:

The hot degree for a sentence is defined as the number of times a user typed the exactly same sentence before.
The returned top 3 hot sentences should be sorted by hot degree (The first is the hottest one).
If several sentences have the same hot degree, use ASCII-code order (smaller one appears first).
If less than 3 hot sentences exist, return as many as you can.
When the input is a special character, it means the sentence ends, and in this case, you need to return an empty list.
Implement the AutocompleteSystem class:

AutocompleteSystem(String[] sentences, int[] times) Initializes the object with the sentences and times arrays.
List<String> input(char c) This indicates that the user typed the character c.
Returns an empty array [] if c == '#' and stores the inputted sentence in the system.
Returns the top 3 historical hot sentences that have the same prefix as the part of the sentence
already typed. If there are fewer than 3 matches, return them all.
 

Example 1:
Input
["AutocompleteSystem", "input", "input", "input", "input"]
[[["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]], ["i"], [" "], ["a"], ["#"]]
Output
[null, ["i love you", "island", "i love leetcode"], ["i love you", "i love leetcode"], [], []]

Explanation
AutocompleteSystem obj = new AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
obj.input("i"); // return ["i love you", "island", "i love leetcode"]. There are four sentences that have prefix "i". Among them, "ironman" and "i love leetcode" have same hot degree. Since ' ' has ASCII code 32 and 'r' has ASCII code 114, "i love leetcode" should be in front of "ironman". Also we only need to output top 3 hot sentences, so "ironman" will be ignored.
obj.input(" "); // return ["i love you", "i love leetcode"]. There are only two sentences that have prefix "i ".
obj.input("a"); // return []. There are no sentences that have prefix "i a".
obj.input("#"); // return []. The user finished the input, the sentence "i a" should be
saved as a historical sentence in system. And the following input will be counted as a new search.

https://leetcode.com/problems/design-search-autocomplete-system/
*/

// Approach:
// 1. Add all words into the trie and for each char/node in the trie, create
// a "count" map with the word it was used to inser this word with its frequency
// that will help us to use all the words available at that given node/char with its
// frequencies and it will help us to add them into the heap to get it by frequency and 
// ASCII order.
// 2. Every time a new char is inserted, we append that char to the existing prefix and
// we iterate through the trie to find the last node found for the trie and it will have
// already all eligible words with its frequency and counts, the heap will help us to get
// the top 3 elements based on the desired order
// 3. If input is "#" we need to insert the existing prefix in the trie
// Time O(N Log N + k) => N words to be added + Log N to insert in the heap and K trie height.
// Space O(K) K is the deepest node.
var AutocompleteSystem = function(sentences, times) {
    this.trie = {children: {}, isWord: false, count: {}, value: null};
    // Prefix to track the input
    this.prefix = '';
    // Add words and degree
    for (let i = 0; i < sentences.length; i++) {
        let word = sentences[i];
        this.addWord(word, times[i])
    }
};

AutocompleteSystem.prototype.addWord = function(word, times) {
    let node = this.trie;
    for (let i = 0; i < word.length; i++) {
        let c = word[i];
        // Find node or create node
        node.children[c] = node.children[c] || {children: {}, isWord: false, count: {}, value: null};
        // Advance node
        node = node.children[c];
        // Count, if exists, use it, otwewise set zero and add the times
        // This will help us to persist all the words at the char node if they are
        // multiple words
        /*
        {
            i: {
                isWord: false
                count: {
                    "i love you": 5
                }
            },
            l: {
                isWord: false,
                ...
            } 
        }
        */
        // Add the words for each node elegible in the prefix
        // If the node does not exist, add it and set zero
        node.count[word] = (word in node.count) ? node.count[word] : 0;
        // Icrement one
        node.count[word] += times;
    }
    node.isWord = true;
    node.value = word;
};

/** 
 * @param {character} c
 * @return {string[]}
 */
AutocompleteSystem.prototype.input = function(c) {
    // If c === "#" persiste the new sentence in the system and return
    // an empty array
    if (c === '#') {
        // Save it with one occurence
        this.addWord(this.prefix, 1);
        // Clean the prefix
        this.prefix = '';
        return [];
    }
    // Find the prefix based on updated input
    this.prefix += c;
    let node = this.trie;
    for (let i = 0; i < this.prefix.length; i++) {
        let c = this.prefix[i];
        // Check if there are no such words in the trie
        if (!(c in node.children)) {
            return [];
        }
        // If we find the node, we iterate the node
        node = node.children[c];
    }
    // We find to find to get the elements with higher frequency and if the frequency
    // is the same, we then get based on ASCII code
    let heap = new PriorityQueue({
        compare: (a, b) => a.count === b.count ? a.str.localeCompare(b.str) : b.count - a.count
    });

    // node.count has the strings with count
    // Add all words eligible for that node, these were the words
    // used then the char/node was created
    for (let s in node.count) {
        heap.enqueue({str: s, count: node.count[s]});
    }

    let result = [];
    let count = 0;
    while (count < 3 && !heap.isEmpty()) {
        result.push(heap.dequeue().str);
        count++;
    }
    return result;
};