/*
A company has tons of search queries with traffic. Based on the offline search log below:
chilli pepper, 1000
chilli pepper chicken, 500
fried
chilli pepper pork, 300
egg chilli pepper, 250
chilli pepper egg, 200
chilli pepper eggs, 100
chicken chilli pepper with beans, 70
chilli pepper chicken and beans, 50

Where the query is followed by the frequency of the query (comma separated)
It is helpful to understand the users' intentions before giving completion suggestions
when people are typing the query. Design a DS/algo to give suggestions for query completion.

Expected:
    Input: 'chilli pepper'
    Output: [
                ('chilli pepper', 1000)
                ('chilli pepper chicken', 500),
                ('chilli pepper pork', 300),
                ('chilli pepper egg', 200),
                ('chilli pepper eggs', 100),
                ('chilli pepper chicken and beans', 50),
    ]
    	
*/
// Time Complexity Adding a Word in Trie O(L) where L is the length of the word
// Space Complexity Iteration O(N) where N is the number of words in the trie
class Autocomplete {
  constructor(input) {
    this.trie = { children: {}, count: {}, isWord: false, value: null };
    // Initialize the trie
    this.init(input);
    this.prefix = '';
  }
  init(input) {
    for (let [word, frequency] of input) {
      this.addWord(word, frequency);
    }
  }
  addWord(word, frequency) {
    console.log(`Adding word: ${word} with frequency: ${frequency}`);
    let node = this.trie;
    // For each character in the word, add its children and the count with the entire word and
    // frequency so that way we can  get all words by each character typing
    for (let i = 0; i < word.length; i++) {
      let c = word[i];
      // find node or create new node
      node.children[c] = node.children[c] || { children: {}, count: {}, isWord: false, value: null };
      // Advance node
      node = node.children[c];
      // Count if exists, add it, otherwise set to zero and add the frequency
      // this wull help us get all the words at the char node if they are multiple words
      node.count[word] = (word in node.count) ? node.count[word] : frequency;
    }
    node.isWord = true;
    node.value = word;
  }
  getSuggestions(prefix) {
    // Find the prefix based on the pinput
    this.prefix += prefix;
    let node = this.trie;
    for (let i = 0; i < this.prefix.length; i++) {
      let c = this.prefix[i];
      // Check if the character exists in the trie
      if (!node.children[c]) {
        return [];
      }
      // Node found, we iterate over the node
      node = node.children[c];
    }
    // At this point, we should have found the node corresponding to the prefix. Now we can return the suggestions based on the counts.
    // Now to return the results we can do a sort based on the counts and return the results

    // Option 1 (N Log N): Sort the counts and return the results
    let suggestions = Object.entries(node.count).sort((a, b) => b[1] - a[1]).map(([word, frequency]) => [word, frequency]);
    return suggestions;
  }
}

input = [
  ['chilli pepper', 1000],
  ['chilli pepper chicken', 500],
  ['chilli pepper pork', 300],
  ['chilli pepper egg', 200],
  ['chilli pepper eggs', 100],
  ['chilli pepper chicken and beans', 50],
];

let obj = new Autocomplete(input);
console.log(obj.getSuggestions('chilli pepper')); // should return the suggestions for 'chilli pepper'
