/*
Determine if a Sudoku is valid, according to: Sudoku Puzzles - The Rules.
The Sudoku board could be partially filled, where empty cells are filled with the character '.'.

https://leetcode.com/problems/valid-sudoku/description/
*/

// Option 1
var isValidSudoku = function (board) {
  let set = new Set();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let number = board[i][j];
      if (number !== ".") {
        // Check if the number was saw in the row
        if (!set.has(`${number} in row ${i}`)) {
          set.add(`${number} in row ${i}`);
        } else {
          return false;
        }
        // Check if the number was saw in the col
        if (!set.has(`${number} in col ${j}`)) {
          set.add(`${number} in col ${j}`);
        } else {
          return false;
        }
        // Check if the number was saw in the block
        if (
          !set.has(
            `${number} in block ${Math.floor(i / 3)}-${Math.floor(j / 3)}`
          )
        ) {
          set.add(
            `${number} in block ${Math.floor(i / 3)}-${Math.floor(j / 3)}`
          );
        } else {
          return false;
        }
      }
    }
  }
  return true;
};

// Option 2
var isValidSudoku = function (board) {
  //Casos base de error
  if (board === null && board.length !== 9 && board[0].length !== 9) {
    return false;
  }
  //Checar que los elementos sean únicos por row
  /*En el arreglo ponemos en el index el true si ya lo encontramos*/
  for (let i = 0; i < 9; i++) {
    m = new Array(9);
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== ".") {
        if (m[board[i][j] - "1"]) {
          return false;
        }
        m[board[i][j] - "1"] = true;
      }
    }
  }

  //Checar que los elementos sean unicos por columnas
  for (let i = 0; i < 9; i++) {
    m = new Array(9);
    for (let j = 0; j < 9; j++) {
      if (board[j][i] !== ".") {
        if (m[board[j][i] - "1"]) {
          return false;
        }
        m[board[j][i] - "1"] = true;
      }
    }
  }

  //Checar en cada bloque de 3x3 que los elementos sean únicos
  //Son 9 bloques
  let iSquare = 0;
  let jSquare = 0;
  let count = 0;
  for (let block = 0; block < 9; block++) {
    m = new Array(9);
    for (let i = iSquare; i < iSquare + 3; i++) {
      for (j = jSquare; j < jSquare + 3; j++) {
        if (board[i][j] !== ".") {
          if (m[board[i][j] - "1"]) {
            return false;
          }
          m[board[i][j] - "1"] = true;
        }
      }
    }
    count++;
    if (count > 2) {
      iSquare += 3;
      jSquare = 0;
      count = 0;
    } else {
      jSquare += 3;
    }
  }
  return true;
};

board = [
  [".", "8", "7", "6", "5", "4", "3", "2", "1"],
  ["2", ".", ".", ".", ".", ".", ".", ".", "."],
  ["3", ".", ".", ".", ".", ".", ".", ".", "."],
  ["4", ".", ".", ".", ".", ".", ".", ".", "."],
  ["5", ".", ".", ".", ".", ".", ".", ".", "."],
  ["6", ".", ".", ".", ".", ".", ".", ".", "."],
  ["7", ".", ".", ".", ".", ".", ".", ".", "."],
  ["8", ".", ".", ".", ".", ".", ".", ".", "."],
  ["9", ".", ".", ".", ".", ".", ".", ".", "."],
];
console.log(isValidSudoku(board));
