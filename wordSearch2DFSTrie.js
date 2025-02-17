/*
Given a 2D board and a list of words from the dictionary, find all words in the board.

Each word must be constructed from letters of sequentially adjacent cell, where
"adjacent" cells are those horizontally or vertically neighboring. The same letter cell
may not be used more than once in a word.

Example:
Input: 
board = [
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
]
words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]

https://leetcode.com/problems/word-search-ii/description/
*/

// Time O(M∗N∗4^L)
// Space O(M * N)
// function trieNode() {
//   this.children = {};
// }

// var findWords = function (board, words) {
//   const root = new trieNode();

//   //Create trie search tree
//   for (const word of words) {
//     let node = root;
//     for (let i = 0; i < word.length; i++) {
//       // If the node is not there, create it
//       if (!node.children[word[i]]) {
//         node.children[word[i]] = new trieNode();
//       }
//       // Iterate the node
//       node = node.children[word[i]];
//     }
//     node.word = word;
//   }

//   //Iterate board
//   let res = new Set();
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       dfs(board, root, i, j, res);
//     }
//   }
//   return [...res];
// };

// //DFS
// function dfs(board, node, row, col, res) {
//   //Validate position
//   if (!board[row] || !board[row][col]) return;

//   //Set char and reset it (so we don't revisit chars)
//   const char = board[row][col];
//   board[row][col] = "";

//   node = node.children[char];
//   if (node) {
//     //Word found
//     if (node.word) {
//       res.add(node.word);
//     }

//     //Add neighbors
//     dfs(board, node, row - 1, col, res);
//     dfs(board, node, row + 1, col, res);
//     dfs(board, node, row, col - 1, res);
//     dfs(board, node, row, col + 1, res);
//   }

//   //Reset "visited" after traversal finishes
//   board[row][col] = char;
// }

function Trie() {
  this.trie = {children: {}, isWord: false, count: {}, value: null};
}

var findWords = function(board, words) {
  const root = new Trie();
  for (const word of words) {
    let node = root.trie
      for (let i = 0; i < word.length; i++) {
          let c = word[i];
          node.children[c] = node.children[c] || {children: {}, isWord: false, count: {}, value: null};
          // Move the node
          node = node.children[c];
          node.count++;
      }
      node.word = word;
      node.isWord = true;
  }

  //Iterate board
  let res = new Set();
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
          dfs(board, root.trie, i, j, res);
      }
  }
  return [...res];
};

//DFS 
function dfs(board, node, row, col, res){ 
  //Validate position
  if (!board[row] || !board[row][col]) return;
  
  //Set char and reset it (so we don't revisit chars)
  const char = board[row][col];
  board[row][col] = "";
  
  node = node.children[char];
  if (node) {
      //Word found
      if (node.word) {
          res.add(node.word);
      }
      
      //Add neighbors
      dfs(board, node, row - 1, col, res);
      dfs(board, node, row + 1, col, res);
      dfs(board, node, row, col - 1, res);
      dfs(board, node, row, col + 1, res);
  }
  
  //Reset "visited" after traversal finishes
  board[row][col] = char;
}

let board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
let words = ["oath", "pea", "eat", "rain"];
// let board = [["a","b"]];
// let words = ["ab"];
console.log(findWords(board, words));
