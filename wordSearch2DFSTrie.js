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

trie = {children:{}, count: 0, isWord: false};
var findWords = function(board, words) {
    // Create trie
    createTrie(words);
    
    let result = new Set();
    let ROW = board.length;
    let COL = board[0].length;
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COL; j++) {
            dfs(trie, board, i, j, result);
        }
    }
    return [...result];
};

function dfs(node, board, row, col, result) {
    // Validate position
    if(!isSafe(board, row, col)) {
        return;
    }
    
    //Set char and reset it (so we don't revisit chars)
    const char = board[row][col];
    board[row][col] = "";
    
    // Check the trie
    node = node.children[char];
    if(node) {
        // Word found
        if(node.isWord) {
            result.add(node.word);
        }
        // Visit neighbors
        dfs(node, board, row - 1, col, result);
        dfs(node, board, row + 1, col, result);
        dfs(node, board, row, col - 1, result);
        dfs(node, board, row, col + 1, result);
    }
    
    //Reset "visited" after traversal finishes
    board[row][col] = char;
}

function createTrie(words) {
    for(let word of words) {
        let node = trie;
        // Add words to trie
        for(let i = 0; i < word.length; i++) {
            let c = word[i];
            node.children[c] = node.children[i] || {children:{}, count: 0, isWord: false};
            // Traverse the node
            node = node.children[c];
            node.count++;
        }
        node.isWord = true;
        node.word = word;
    }
}

function isSafe(board, row, col) {
    let ROW = board.length;
    let COL = board[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL
    );
}

// let board = [
//     ['o','a','a','n'],
//     ['e','t','a','e'],
//     ['i','h','k','r'],
//     ['i','f','l','v']
// ];
// let words = ["oath","pea","eat","rain"];
let board = [["a","b"]];
let words = ["ab"];
console.log(findWords(board,words));