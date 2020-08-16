/*
Find all words from A-Z in a dictionary that are subset (in any order) of the
chars in the input parameter

Example:
Input : Dict - {"go","bat","me","eat","goal", 
                                "boy", "run"} 
        arr[] = {'e','o','b', 'a','m','g', 'l'} 

Output : go, me, goal. 
*/

let trie = {children: {}, count: 0, isWord: false, word: null};

function insertIntoTrie(word) {
  let node = trie;
  for(let i = 0; i < word.length; i++) {
    let letter = word[i];
    // Assign the node if we find it
    node.children[letter] = node.children[letter] || {children: {}, count: 0, isWord: false, word: null};
    // Traverse node
    node = node.children[letter];
    // Check how many times we have seen this char
    node.count++;
  }
  node.isWord = true;
  node.word = word;
}

function searchWords(letters, words) {
  // Add words into a trie
  for(let word of words) {
    insertIntoTrie(word);
  }

  // Create a hash that will store the character present
  // in the array
  let hash = {};
  for(let c of letters) {
    hash[c] = true;
  }
  
  // Traverse all the 26 chars options and look if we
  // can find the candidates
  result = [];
  for(let i = 0; i < 26; i++) {
    let c = String.fromCharCode(97 + i) // a = 0, b = 1, c = 2, ... z = 26
    // Check if we have that char in our hash
    if(hash[c] && trie.children[c]) {
      search(trie.children[c], hash);
    }
  }
  return result;
}

function search(trie, hash) {
  // If we have find a result, add it into our array
  if(trie.isWord) {
    result.push(trie.word);
  }

  // Traverse for all of current trie nodes
  for(let i = 0; i < 26; i++) {
    let c = String.fromCharCode(97 + i) // a = 0, b = 1, c = 2, ... z = 26
    if(hash[c] && trie.children[c]) {
      // Recursion
      search(trie.children[c], hash)
    }
  }
}

letters = ['e', 'o', 'b', 'a', 'm', 'g', 'l'];
words = ["go", "bat", "me", "eat", "goal", "boy", "run"]; // go goal me
console.log(searchWords(letters, words));
