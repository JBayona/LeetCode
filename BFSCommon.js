/*
Dada una grid con blockers y un punto, determinar
cual es la distancia mínima de llegar del punto(oro) a
cualquier otro punto
*/

class Node{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

function findGold(n,m,blockers,gold){

  let grid = [];
  let visited = [];

  //Create grid
  for(let i = 0; i < n; i++){
    grid[i] = new Array(m).fill(0);
    visited[i] = new Array(m).fill(0);
  }

  //Set blockers
  for(let i = 0; i < blockers.length; i++){
    let x = blockers[i].x;
    let y = blockers[i].y;
    grid[x][y] = 'X';
  }

  //Set gold
  let goldX = gold.x;
  let goldY = gold.y;
  grid[goldX][goldY] = 'G';
  console.log(grid);
  
  let rowK = [-1,0,0,1];
  let colK = [0,-1,1,0];
  let queue = [];
  queue.push(gold);
  while(queue.length){
    let node = queue.shift();
    let x = node.x;
    let y = node.y;
    for(let i = 0; i < 4; i++){
      let ROW = rowK[i] + x;
      let COL = colK[i] + y;
      if(isSafe(grid,visited,ROW,COL)){
        visited[ROW][COL] = visited[x][y] + 1;
        queue.push(new Node(ROW,COL));
      }
    }
  }
  console.log(visited);
  return visited;
}

function isSafe(grid,visited,row,col){
  let ROW = grid.length;
  let COL = grid[0].length;
  return (row >= 0 && row < ROW && col >= 0 && col < COL && grid[row][col] !== 'X' && !visited[row][col] && grid[row][col] !== 'G' );
}

function get(grid,x,y){
  return grid[x][y];
}

m = 3;
n = 3;
blockers = [new Node(1,2), new Node(0,1)];
gold = new Node(2,0);
visited = findGold(n,m,blockers,gold);
console.log(get(visited,0,0));