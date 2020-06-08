/*
On a 2x3 board, there are 5 tiles represented by the integers 1 through 5, and an empty square represented by 0.
A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.
The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].

Given a puzzle board, return the least number of moves required so that the state of the board is solved.
If it is impossible for the state of the board to be solved, return -1.

Examples:

Input: board = [[1,2,3],[4,0,5]]
Output: 1
Explanation: Swap the 0 and the 5 in one move.

Input: board = [[1,2,3],[5,4,0]]
Output: -1

Explanation: No number of moves will make the board solved.
Input: board = [[4,1,2],[5,0,3]]
Output: 5
Explanation: 5 is the smallest number of moves that solves the board.
An example path:
After move 0: [[4,1,2],[5,0,3]]
After move 1: [[4,1,2],[0,5,3]]
After move 2: [[0,1,2],[4,5,3]]
After move 3: [[1,0,2],[4,5,3]]
After move 4: [[1,2,0],[4,5,3]]
After move 5: [[1,2,3],[4,5,0]]

Input: board = [[3,2,4],[1,5,0]]
Output: 14

https://leetcode.com/problems/sliding-puzzle/
*/

// Time O(M*N) where M is rows and N is cols
var slidingPuzzle = function(board) {
  // This is the final state we want to reach
  let target = '123450';
  let M = board.length;
  let N = board[0].length;
  
  let queue = [];
  let visited = new Set();
  
  // From the original board parse into a string
  let initialState = toString(board);
  // Check if the initial stat is already in the final state
  if(initialState === target) {
      return 0;
  }
  
  //  Directions
  let rowK = [-1,0,0,1];
  let colK = [0,-1,1,0];
  
  queue.push(initialState);
  let moves = 1;
  // BFS
  while(queue.length) {
    let size = queue.length;
    for(let i = 0; i < size; i++) {
      let node = queue.shift();
      let currentBoard = toBoard(node, M, N);
      let [row, col] = findZeroIndex(node, N);
      
      // Look 4 directions
      for(let j = 0; j < 4; j++) {
        let newRow = row + rowK[j];
        let newCol = col + colK[j];
        if(isSafe(currentBoard, newRow, newCol)) {
          // Once we confirm the move is valid, we can
          // swap the nodes
          let tmp = currentBoard[row][col];
          currentBoard[row][col] = currentBoard[newRow][newCol];
          currentBoard[newRow][newCol] = tmp;
          
          // Convert the board to string and find if the
          // valus is valid now
          // Check if we reach the final state
          let currentStr = toString(currentBoard);
          if(currentStr === target) {
              return moves;
          }
          // Check if we already visit the state, for this
          // we add the strings states to avoid fall in loops
          if(!visited.has(currentStr)) {
              visited.add(currentStr);
              queue.push(currentStr);
          }
          currentBoard = toBoard(node, M, N);
        }
      }
    }
    moves++;
  }
  return -1;
};

function toBoard(str, M, N) {
  let array = str.split('');

  // Create a board
  let board = new Array(M);
  for(let i = 0; i < board.length; i++) {
    board[i] = new Array(N).fill(0);
  }
  
  // Set the values
  let index = 0;
  for(let i = 0; i < M; i++) {
    for(let j = 0; j < N; j++) {
      board[i][j] = array[index++];
    }
  }
  return board;
}

function toString(board) {
  return board.toString().split(',').join('');
}

function findZeroIndex(str, N) {
  // In this case N = 3
  let pos = str.indexOf('0');
  return [pos/N | 0, pos%N];
}

function isSafe(board, row, col) {
  let ROW = board.length;
  let COL = board[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL
  );
}