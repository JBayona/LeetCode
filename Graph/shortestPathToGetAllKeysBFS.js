/*
You are given an m x n grid grid where:

'.' is an empty cell.
'#' is a wall.
'@' is the starting point.
Lowercase letters represent keys.
Uppercase letters represent locks.
You start at the starting point and one move consists of walking one space in one of the four cardinal directions. You cannot walk outside the grid, or walk into a wall.

If you walk over a key, you can pick it up and you cannot walk over a lock unless you have its corresponding key.

For some 1 <= k <= 6, there is exactly one lowercase and one uppercase letter of the first k letters of the English alphabet in the grid. This means that there is
exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

Return the lowest number of moves to acquire all keys. If it is impossible, return -1.

https://leetcode.com/problems/shortest-path-to-get-all-keys/description/?envType=study-plan-v2&envId=graph-theory
*/

var shortestPathAllKeys = function(grid) {

  let m = grid.length
  let n = grid[0].length
  let k = 0
  let start
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          let c = grid[i][j]
          if ("abcdef".includes(c)) k++
          if (c == '@') start = [i, j]
      }
  }

  let hasAllKeys = keys => {
      return keys.toString(2).split('').filter(bit => bit === '1').length == k
  }

  let hasKey = (keys, lock) => {
      let shift = lock.toLowerCase().charCodeAt(0) - 97
      return (keys & (1 << shift)) != 0
  }

  let addKey = (keys, key) => {
      let shift = key.charCodeAt(0) - 97
      return keys | (1 << shift)
  }

  let next_moves = function(coords) {
      let [x,y] = coords
      let next = [[x+1, y], [x-1, y], [x, y+1], [x, y-1]]
      return next.filter(([x0, y0]) => {
          return x0 >= 0
              && y0 >= 0
              && x0 < m
              && y0 < n
              && grid[x0][y0] != '#'
      })
  }

  let serializeState = state => {
      return `${state[0][0]}%${state[0][1]}|${state[1]}`
  }
  
  let init = [start, 0, 0]  // [position, keys, counter]
  let queue = [init]
  let visited = new Set()
  visited.add(serializeState(init))

  while (queue.length) {
      let [[x,y], keys, counter] = queue.shift()
      let cell = grid[x][y]
      if ("ABCDEF".includes(cell) && !hasKey(keys, cell)) continue
      if ("abcdef".includes(cell)) {
          keys = addKey(keys, cell)
      }
      if (hasAllKeys(keys)) return counter
      for (let next of next_moves([x,y])) {
          let nextState = [next, keys]
          if (!visited.has(serializeState(nextState))) {
              visited.add(serializeState(nextState));
              queue.push([next, keys, counter + 1])
          }
      }
  }
  return -1
};

// Option 2
/*
var shortestPathAllKeys = function(grid) {
  let ROW = grid.length;
  let COL = grid[0].length;
  let visited = new Array(ROW);

  for (let i = 0; i < ROW; i++) {
      visited[i] = new Array(COL).fill(false);
  }

  let queue = [];
  // Only look for interesting places, which is the starting point and
  // the keys
  let keyCount = 0;
  for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
          // Starting point
          if (grid[i][j] === '@') {
              queue.push({r: i, c: j, d: 0, keys: 0});
              visited[i][j] = true;
          } else if (isKey(grid[i][j])) {
              keyCount++;
          }
      }
  }

  let rowK = [0, -1, 0, 1];
  let colK = [-1, 0, 1, 0];

  let visitedKeys = new Set();

  while (queue.length) {
      let len = queue.length;
      for (let i = 0; i < len; i++) {
          let {r, c, d, keys} = queue.shift();
          if (keys === keyCount) {
              return d;
          }
          for (let j = 0; j < 4; j++) {
              let nextRow = r + rowK[j];
              let nextCol = c + colK[j];
              if (isSafe(nextRow, nextCol, grid, visited, visitedKeys)) {
                  let next = grid[nextRow][nextCol];
                  // If it's lock and it can open
                  if (isLock(next) && visitedKeys.has(next.toLowerCase())) {
                      visitedKeys.delete(next.toLowerCase());
                  } else if (isKey(next)) { // Else it's a key
                      visitedKeys.add(next);
                      keys++;
                  }
                  visited[nextRow][nextCol] = true;
                  queue.push({r: nextRow, c: nextCol, d: d + 1, keys: keys});
              }
          }
      }
  }
  return -1;
};

const isKey = char => /[abcdef]/.test(char);
const isLock = char => /[ABCDEF]/.test(char);

function isSafe(row, col, grid, visited, visitedKeys) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
      (row >= 0 && row < ROW) &&
      (col >= 0 && col < COL) &&
      visited[row][col] === false &&
      (
          grid[row][col] === '.' || // is empty
          isKey(grid[row][col]) || // is key
          (isLock(grid[row][col]) && visitedKeys.has(grid[row][col].toLowerCase())) // is a lock
      )
  );
}
*/