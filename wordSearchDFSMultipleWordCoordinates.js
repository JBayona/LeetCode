/**
After catching your classroom students cheating before, you realize your students are getting craftier and hiding words in 2D grids of letters. The word may start anywhere in the grid, and consecutive letters can be either immediately below or immediately to the right of the previous letter.

Given a grid and a word, write a function that returns the location of the word in the grid as a list of coordinates. If there are multiple matches, return any one.

grid1 = [
	['c', 'c', 'x', 't', 'i', 'b'],
	['c', 'c', 'a', 't', 'n', 'i'],
	['a', 'c', 'n', 'n', 't', 't'],
	['t', 'c', 's', 'i', 'p', 't'],
	['a', 'o', 'o', 'o', 'a', 'a'],
	['o', 'a', 'a', 'a', 'o', 'o'],
	['k', 'a', 'i', 'c', 'k', 'i'],
]
word1 = "catnip"
word2 = "cccc"
word3 = "s"
word4 = "bit"
word5 = "aoi"
word6 = "ki"
word7 = "aaa"
word8 = "ooo"

grid2 = [['a']]
word9 = "a"

find_word_location(grid1, word1) => [ (1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 4) ]
find_word_location(grid1, word2) =>
       [(0, 1), (1, 1), (2, 1), (3, 1)]
    OR [(0, 0), (1, 0), (1, 1), (2, 1)]
    OR [(0, 0), (0, 1), (1, 1), (2, 1)]
    OR [(1, 0), (1, 1), (2, 1), (3, 1)]
find_word_location(grid1, word3) => [(3, 2)]
find_word_location(grid1, word4) => [(0, 5), (1, 5), (2, 5)]
find_word_location(grid1, word5) => [(4, 5), (5, 5), (6, 5)]
find_word_location(grid1, word6) => [(6, 4), (6, 5)]
find_word_location(grid1, word7) => [(5, 1), (5, 2), (5, 3)]
find_word_location(grid1, word8) => [(4, 1), (4, 2), (4, 3)]
find_word_location(grid2, word9) => [(0, 0)]

Complexity analysis variables:

r = number of rows
c = number of columns
w = length of the word
*/

const searchWord = (grid, word) => {
  let result = [];
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      // Find first ocurrence
      if(grid[i][j] === word[0]) {
        let tmpArr = [];
        let responses = new Set();
        dfs(grid, word, i, j, 0, tmpArr, result, responses);
      }
    }
  }
  return result;
}

function dfs(grid, word, row, col, count, tmpArr, result, responses) {
  if(count === word.length && !responses.has([...tmpArr].toString())) {
    responses.add([...tmpArr].toString())
    result.push([...tmpArr]);
    return;
  }

  // Validate boundaries and charater matching
  if(!isSafe(grid, word, row, col, count)) {
    return;
  }
  
  tmpArr.push([row, col]);
  let tmp = grid[row][col];
  grid[row][col] = '';

  // Only left and right, to support multiple location we need to change this
  dfs(grid, word, row + 1, col, count + 1, tmpArr.concat(), result, responses);
  dfs(grid, word, row, col + 1, count + 1, tmpArr.concat(), result, responses);

  grid[row][col] = tmp;
}

function isSafe(grid, word, row, col, count) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 && row < ROW &&
    col >= 0 && col < COL &&
    grid[row][col] === word[count]
  );
}
grid1 = [
	['c', 'c', 'x', 't', 'i', 'b'],
	['c', 'c', 'a', 't', 'n', 'i'],
	['a', 'c', 'n', 'n', 't', 't'],
	['t', 'c', 's', 'i', 'p', 't'],
	['a', 'o', 'o', 'o', 'a', 'a'],
	['o', 'a', 'a', 'a', 'o', 'o'],
	['k', 'a', 'i', 'c', 'k', 'i'],
]
const word1 = "catnip";
const word2 = "cccc";
const word3 = "s";
const word4 = "bit";
const word5 = "aoi";
const word6 = "ki";
const word7 = "aaa";
const word8 = "ooo"; 

const grid2 = [['a']];
const word9 = "a";

console.log(searchWord(grid1, word1));
console.log(searchWord(grid1, word2));
console.log(searchWord(grid1, word3));
console.log(searchWord(grid1, word4));
console.log(searchWord(grid1, word5));
console.log(searchWord(grid1, word6));
console.log(searchWord(grid1, word7));
console.log(searchWord(grid1, word8));
console.log(searchWord(grid2, word9));