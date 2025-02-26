/** 
 * Given a grid of stores marked with "D" find the closest store from the given locations, you can only move up, down, left and right.
 * You are give empty spaces " " where you can move, and spaces with "X" represent a blocker that you cannot bypass.
 * Return an array of the closests markets you can go from a given location. i.e:
*/

function getClosest(grid, locations) {
    let result = [];
    for (let location of locations) {
      let [row, col] = location;
      result.push(bfs(row, col, grid));
    }
    return result;
  }
  
  function bfs(r, c, grid) {
    if (!isInsideBoundaries(r, c, grid)) {
      return -1;
    }
  
    // If there's a blocker return -1
    if (grid[r][c] === 'X') {
      return -1;
    }
  
    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];
    let visited = new Set();
    visited.add(`${r}-${c}`);
  
    let queue = [{row: r, col: c, d: 0}];
  
    while(queue.length) {
      let len = queue.length;
      for (let i = 0; i < len; i++) {
        let {row, col, d} = queue.shift();
        if (grid[row][col] === 'D') {
          return d;
        }
        for (let j = 0; j < 4; j++) {
          let nextRow = row + rowK[j];
          let nextCol = col + colK[j];
          if (isSafe(nextRow, nextCol, grid, visited)) {
            visited.add(`${nextRow}-${nextCol}`);
            queue.push({row: nextRow, col: nextCol, d: d + 1});
          }
        }
      }
    }
    return -1;
  }
  
  function isSafe(row, col, grid, visited) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
      isInsideBoundaries(row, col, grid) &&
      grid[row][col] !== 'X' &&
      !visited.has(`${row}-${col}`)
    );
  }
  
  function isInsideBoundaries(row, col, grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
      row >= 0 && row < ROW &&
      col >= 0 && col < COL
    );
  }
  
  let grid = [
    [" ", " ", "D"," ", " ", " ", " ", " "],
    [" ", " ", "X"," ", " ", "X", "D", " "],
    [" ", " ", " "," ", "D", " ", "X", " "],
    [" ", " ", " "," ", " ", " ", " ", " "],
    [" ", "X", "X"," ", " ", " ", " ", " "]
  ];
  let locations = [
    [200, 200], // -1
    [1, 1], // 2
    [0, 1], // 1
    [1, 2], // -1
    [0, 4], // 2
    [0, 6], // 1
    [4, 0], // 6
    [4, 5], // 3
    [4, 6], // 4
  ];
  console.log(getClosest(grid, locations));