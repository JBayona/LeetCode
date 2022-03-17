/**
The conflict with your students escalates, and now they are hiding multiple words
in a single word grid. Return the location of each word as a list of coordinates.
Letters cannot be reused across words.

grid1 = [
    ['b', 'a', 'b'],
    ['y', 't', 'a'],
    ['x', 'x', 't'],
]
words1_1 = ["by","bat"]

find_word_locations(grid1, words1_1) => 
([(0, 0), (1, 0)],
 [(0, 2), (1, 2), (2, 2)])
grid2 =[
    ['A', 'B', 'A', 'B'],
    ['B', 'A', 'B', 'A'],
    ['A', 'B', 'Y', 'B'],
    ['B', 'Y', 'A', 'A'],
    ['A', 'B', 'B', 'A'],
]
words2_1 = ['ABABY', 'ABY', 'AAA', 'ABAB', 'BABB']

([(0, 0), (1, 0), (2, 0), (2, 1), (3, 1)],
 [(1, 1), (1, 2), (2, 2)],
 [(3, 2), (3, 3), (4, 3)],
 [(0, 2), (0, 3), (1, 3), (2, 3)],
 [(3, 0), (4, 0), (4, 1), (4, 2)])

or

([(0, 0), (1, 0), (1, 1), (1, 2), (2, 2)],
 [(2, 0), (2, 1), (3, 1)],
 [(3, 2), (3, 3), (4, 3)],
 [(0, 2), (0, 3), (1, 3), (2, 3)],
 [(3, 0), (4, 0), (4, 1), (4, 2)])

or

([(0, 0), (0, 1), (1, 1), (1, 2), (2, 2)],
 [(2, 0), (2, 1), (3, 1)],
 [(3, 2), (3, 3), (4, 3)],
 [(0, 2), (0, 3), (1, 3), (2, 3)],
 [(3, 0), (4, 0), (4, 1), (4, 2)])

words2_2 = ['ABABA', 'ABA', 'BAB', 'BABA', 'ABYB']

([(0, 0), (1, 0), (2, 0), (3, 0), (4, 0)],
 [(3, 2), (4, 2), (4, 3)],
 [(0, 1), (0, 2), (1, 2)],
 [(0, 3), (1, 3), (2, 3), (3, 3)],
 [(1, 1), (2, 1), (3, 1), (4, 1)])

or

([(0, 0), (1, 0), (2, 0), (3, 0), (4, 0)],
 [(3, 2), (4, 2), (4, 3)],
 [(0, 1), (0, 2), (0, 3)],
 [(1, 2), (1, 3), (2, 3), (3, 3)],
 [(1, 1), (2, 1), (3, 1), (4, 1)])


Complexity analysis variables:

r = number of rows
c = number of columns
w = length of the word

*/

// Time complexity: O(2^(RC)) 
// Space complexity: O(RC)
const searchWord = (grid, words) => {
  let result = [];
  let set = new Set();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      for (let word of words) {
        // Find first ocurrence
        if (grid[i][j] === word[0]) {
          let tmpArr = [];
          dfs(grid, word, i, j, 0, tmpArr, result, set);
        }
      }
    }
  }
  return result;
};

function dfs(grid, word, row, col, count, tmpArr, result, set) {
  if (count === word.length && !set.has(word)) {
    result.push([...tmpArr]);
    set.add(word);
    return true;
  }

  // Validate boundaries and charater matching
  if (!isSafe(grid, word, row, col, count)) {
    return false;
  }

  tmpArr.push([row, col]);
  let tmp = grid[row][col];
  grid[row][col] = "";

  let found =
    dfs(grid, word, row + 1, col, count + 1, tmpArr.concat(), result, set) ||
    dfs(grid, word, row, col + 1, count + 1, tmpArr.concat(), result, set);

  grid[row][col] = tmp;
  return found;
}

function isSafe(grid, word, row, col, count) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
    row >= 0 &&
    row < ROW &&
    col >= 0 &&
    col < COL &&
    grid[row][col] === word[count]
  );
}

grid1 = [
  ["b", "a", "b"],
  ["y", "t", "a"],
  ["x", "x", "t"],
];
const words1 = ["by", "bat"];

grid2 =[
  ['A', 'B', 'A', 'B'],
  ['B', 'A', 'B', 'A'],
  ['A', 'B', 'Y', 'B'],
  ['B', 'Y', 'A', 'A'],
  ['A', 'B', 'B', 'A'],
]
words2 = ['ABABY', 'ABY', 'AAA', 'ABAB', 'BABB']

console.log(searchWord(grid1, words1));
console.log(searchWord(grid2, words2));
