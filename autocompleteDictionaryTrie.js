/*
Given a trie, return a list of words that matches with a given prefix
*/

let trie = {children: {}, count: 0, string: null};
const addWord = function(word) {
  let node = trie;
  for(let c of word) {
    //Asigna el nodo si lo encuentra o agrega un elemento para agregarlo al trie
    node.children[c] = node.children[c] || {children: {}, count: 0, isWord: null};
    // Recorre el nodo
    node = node.children[c];
    // Cuenta las veces que se ha visto
    node.count++;
  }
  // Marca el end de la palabra
  node.isWord = word;
}

function findWords(prefix) {
  let node = trie;
  let result = [];
  dfs(prefix, 0, node, result);
  return result;
}

function dfs(prefix, index, node, result) {
  if(index < prefix.length) {
    let letter = prefix[index];
    if(node.children[letter]) {
      dfs(prefix, index + 1, node.children[letter], result);
    } else {
      return;
    }
  } else {
    if(node.isWord) {
      result.push(node.isWord);
    } else {
      // Try to find everything
      for(let c in node.children) {
        dfs(prefix, index, node.children[c], result);
      }
    }
  }
}

// Add words to the tree
addWord('google');
addWord('good');
addWord('gooooogle');
addWord('great');
// console.log(trie);

let prefix = 'goog';
console.log(findWords(prefix));