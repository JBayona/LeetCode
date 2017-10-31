function countComponentes(grid){
  let row = grid.length;
  let col = grid[0].length;
  let visited = [];
  let component = 0;

  //Visited matrix
  for(let i = 0; i < row; i++){
    visited[i] = new Array(col).fill(-1);
  }

  for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
      if(grid[i][j] === 1 && visited[i][j] === -1){
        visited[i][j] = ++component;
        dfs(grid,visited,component,i,j);
      }
    }
  }
  console.log(visited);
  return component;
}

function dfs(grid, visited, component, row, col){
  let rowk = [-1,0,0,1];
  let colk = [0,-1,1,0];

  for(let i = 0; i < 4; i++){
    let ROW = row + rowk[i];
    let COL = col + colk[i];
    if(isSafe(grid,visited,ROW,COL)){
      visited[ROW][COL] = component;
      dfs(grid,visited,component,ROW,COL);
    }
  }
}

function isSafe(grid, visited, row, col){
  let ROW = grid.length;
  let COL = grid[0].length;
  return ((row >= 0 && row < ROW) && (col >= 0 && col < COL) && (grid[row][col] === 1 && visited[row][col] === -1));
}

matrix = [
          [1, 1, 0, 0, 0],
          [0, 1, 0, 0, 1],
          [1, 0, 0, 1, 1],
          [0, 0, 0, 0, 0],
          [1, 0, 1, 0, 1]
];
console.log(countComponentes(matrix));
