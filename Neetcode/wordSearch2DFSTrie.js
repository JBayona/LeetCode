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
*/

// Time O(M * N * 4^L)
// Space O(M * N)
function Trie() {
  this.trie = { children: {}, count: 0, isWord: false };
}

var findWords = function (board, words) {
  let root = new Trie();

  // Add all words into the trie
  for (let word of words) {
    // We need to point to root everytime to traverse the trie
    let node = root.trie;
    addWord(node, word);
  }

  let ROW = board.length;
  let COL = board[0].length;
  let t = root.trie;

  let set = new Set();
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      dfs(t, board, i, j, set);
    }
  }

  return [...set];
};

function dfs(node, board, row, col, result) {
  // Out of boundaries
  if (!isSafe(board, row, col)) {
    return;
  }

  let c = board[row][col];
  board[row][col] = " ";

  let n = node.children[c];
  if (n) {
    // Check if a word is found
    if (n.word) {
      result.add(n.word);
    }

    // Check all 4 directions
    dfs(n, board, row + 1, col, result);
    dfs(n, board, row, col + 1, result);
    dfs(n, board, row - 1, col, result);
    dfs(n, board, row, col - 1, result);
  }
  // Revert the character to the normal
  board[row][col] = c;
}

function isSafe(board, row, col) {
  let ROW = board.length;
  let COL = board[0].length;
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}

function addWord(trie, word) {
  let node = trie;
  for (let i = 0; i < word.length; i++) {
    let c = word[i];
    node.children[c] = node.children[c] || {
      children: {},
      count: 0,
      isWord: true,
    };
    node = node.children[c];
    node.count++;
  }
  node.isWord = true;
  node.word = word;
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
