/*
You want to build a house on an empty land which reaches all buildings in the shortest amount of distance.
You can only move up, down, left and right. You are given a 2D grid of values 0, 1 or 2, where:
Each 0 marks an empty land which you can pass by freely.
Each 1 marks a building which you cannot pass through.
Each 2 marks an obstacle which you cannot pass through.
For example, given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2):

1 - 0 - 2 - 0 - 1
|   |   |   |   |
0 - 0 - 0 - 0 - 0
|   |   |   |   |
0 - 0 - 1 - 0 - 0

The point (1,2) is an ideal empty land to build a house, as the total travel distance of 3+3+1=7 is minimal. So return 7.
Note: There will be at least one building. If it is not possible to build such house according to the above rules, return -1.
https://tenderleo.gitbooks.io/leetcode-solutions-/GoogleHard/317.html
https://medium.com/@null00/leetcode-shortest-distance-from-all-buildings-ff07c5bea11c
*/

function shortestDistanceFromAllBuildings(grid) {
  let ROW = grid.length;
  let COL = grid[0].length;

  let buildings = 0;
  // Min distance sum of all buildings to dix[x][y]
  // To all of the buildings
  let distance = new Array(ROW);
  for(let i = 0; i < ROW; i++) {
    distance[i] = new Array(COL).fill(0);
  }

  // How many buildings we can reach num[x][y]
  let num = new Array(ROW);
  for(let i = 0; i < ROW; i++) {
    num[i] = new Array(COL).fill(0);
  }

  for(let i = 0; i < ROW; i++) {
      for(let j = 0; j < COL; j++) {
          // If we found a 1, it means we have found a 
          if(grid[i][j] === 1) {
            // Check how many buildings we have in the grid
            buildings++;
            bfs(grid, distance, num, i, j);
          }
      }
  }

  console.log(distance);
  console.log(num);
  console.log(buildings);

  let min = Number.MAX_SAFE_INTEGER;
  for(let i = 0; i < ROW; i++) {
      for(let j = 0; j < COL; j++) {
        // Check if the space is empty, the min distance from the building is not zero
        // and we can reach of buildings based on neighbors
        if(grid[i][j] === 0 && distance[i][j] !== 0 && num[i][j] === buildings) {
          min = Math.min(min, distance[i][j]);
        }
      }
  }
  return min === Number.MAX_SAFE_INTEGER ? -1 : min;
}

function bfs(grid, dis, num, row, col) {
  let ROW = grid.length;
  let COL = grid[0].length;
  
  // Directions from left, right, top and bottom
  let rowk = [-1,0,0,1];
  let colk = [0,-1,1,0];

  let visited = new Array(ROW);
  for(let i = 0; i < ROW; i++) {
      visited[i] = new Array(COL).fill(0);
  }

  let queue = [];
  // These row and col are the coordinates we have a building
  queue.push([row, col]);
  let distance = 0;
  while(queue.length) {
    // Increase the number of units for every "step", "seconds", etc
    distance++;
    let size = queue.length;
    for(let i = 0; i < size; i++) {
      let [x, y] = queue.shift();
      // Move 4 directions, left, right, top and bottom
      for(let j = 0; j < 4; j++) {
        let newRow = x + rowk[j];
        let newCol = y + colk[j];

        // Grid 0 means that we can go tru the grid so we can move forward
        // Check that the move is valid so we can go forward
        if(isSafe(grid, newRow, newCol) && grid[newRow][newCol] === 0 && visited[newRow][newCol] === 0) {
          visited[newRow][newCol] = 1;
          dis[newRow][newCol] += distance;
          num[newRow][newCol]++;
          queue.push([newRow, newCol]);
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

grid = [
  [1, 0, 2, 0, 1],
  [0, 0, 0, 0 ,0],
  [0, 0, 1, 0, 0]
];
console.log(shortestDistanceFromAllBuildings(grid));