/*
Given an m x n binary grid grid where each 1 marks the home of one friend, return the
minimal total travel distance.

The total travel distance is the sum of the distances between the houses of the friends and
the meeting point.

The distance is calculated using Manhattan Distance, where
distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.

https://leetcode.com/problems/best-meeting-point/description/
*/
// Time O(M * N)
var minTotalDistance = function(grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let homes = 0;
  let distance = new Array(ROW);
  
  for (let i = 0; i < ROW; i++) {
      distance[i] = new Array(COL).fill(0);
  }

  for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
          if (grid[i][j] === 1) {
              homes++;
              // For each home, run a BFS to fin the shortest route to them
              // on every possible path
              bfs(grid, distance, i, j);
          }
      }
  }

  // Get the best place shortest to all homes
  let min = Infinity
  for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
          // distance[i][j] are the home's locations
          // num[i][j] to make sure all homes are accesible
          // if (grid[i][j] === 0 && distance[i][j] !== 0 && num[i][j] === homes)  {
          //     min = Math.min(min, distance[i][j]);
          // }
          // The friends house can be a meeting point as well, that's why we don't restrict
          min = Math.min(min, distance[i][j]);
      }
  }
  return min;
};

function bfs(grid, dis, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let visited = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
      visited[i] = new Array(COL).fill(0);
  }
  visited[row][col] = 1;

  // Directions from left, right, top and bottom
  let rowk = [-1,0,0,1];
  let colk = [0,-1,1,0];

  // Start of a building
  let queue = [];
  queue.push({row: row, col: col, d: 1});
  while(queue.length) {
      let len = queue.length;
      for (let i = 0; i < len; i++) {
          let {row, col, d} = queue.shift();
          for (let j = 0; j < 4; j++) {
              let newRow = row + rowk[j];
              let newCol = col + colk[j];
              // Check if it's within the boundaries and the next it's not a home and has not
              // been visited before
              // grid[newRow][newCol] === 0 if we only need to traverse on lands
              if(isSafe(grid, newRow, newCol) && visited[newRow][newCol] === 0) {
                  visited[newRow][newCol] = 1;
                  dis[newRow][newCol] += d;
                  queue.push({row: newRow, col: newCol, d: d + 1});
              }
          }
      }
  }
}

function isSafe(grid, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  return (
      row >= 0 && row < ROW &&
      col >= 0 && col < COL
  );
}
