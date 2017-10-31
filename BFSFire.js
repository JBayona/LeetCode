/*
Cada segundo que pasa se prende el fuego a las laterales, el punto es salir antes
de que J se queme, si J puede hacer menos número que el BFS del fuego significa que
se puede salvar, entonces retornamos de donde viene + 1

http://coj.uci.cu/24h/problem.xhtml?pid=1647
*/

class Node{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

function BFSFire(grid){
  let queue = [];
  let ROW = grid.length;
  let COL = grid[0].length;
  let visited = [];
  let rowK = [-1,0,0,1];
  let colK = [0,-1,1,0];

  //Create visited
  for(let i = 0; i < ROW; i++){
    visited[i] = new Array(COL).fill(-1);
  }

  //Llenar visited grid
  for(let i = 0; i < ROW; i++){
    for(let j = 0; j < COL; j++){
      if(grid[i][j] === 'F' && visited[i][j] === -1){
        queue.push(new Node(i,j));
        /*Ponemos cero ya que no hay distancia cuando
        encontremos un fuego*/
        visited[i][j] = 0;
      }
    }
  }

  /*Lanzamos un BFS*/
  while(queue.length){
    let node = queue.shift();
    let x = node.x;
    let y = node.y;

    for(let i = 0; i < 4; i++){
      let row = x + rowK[i];
      let col = y + colK[i];
      if(isSafe(grid,visited,row,col)){
        visited[row][col] = visited[row][col] + 1;
        queue.push(new Node(row,col));
      }
    }
  }

  /*Buscamos a Joe*/
  for(let i = 0; i < ROW; i++){
    for(let j = 0; j < COL; j++){
      if(grid[i][j] === 'J'){
        queue.push(new Node(i,j));
        visited[i][j] = 0;
        break;
      }
    }
  }

  /*BFS para verificar si Joe puede salvarse, si el valor es menor
  a lo que ya tenemos en visited podemos considerarlo como un movimiento,
  si alcanzamos una zelda no valida, fuera del extremos, entonces Joe puede
  salvarse del fuego*/
  let steps = 0;
  while(queue.length && !steps){
    let node = queue.shift();
    let x = node.x;
    let y = node.y;
    for(i = 0; i < 4; i++){
      let row = x + rowK[i];
      let col = y + colK[i];
      if(row < 0 || row >= ROW || col < 0 || col >= COL){
        steps = visited[x][y] + 1;
        break;
      }
      if(grid[row][col] === '.' && (visited[row][col] === -1 || visited[x][y]+1 < visited[row][col])){
        visited[row][col] = visited[x][y]+1;
        grid[x][y] = '#';
        queue.push(new Node(row,col));
      }
    }
  }

  return steps ? steps : 'impossible';
}

function isSafe(grid,visited,row,col){
  let ROW = grid.length;
  let COL = grid[0].length;
  return ((row >= 0 && row < ROW) && (col >= 0 && col < COL) && grid[row][col] === '.' &&visited[row][col] === -1);
}

grid = [
          ['#','#','#','#'],
          ['#','.','F','#'],
          ['#','J','.','#'],
          ['#','.','.','#']
        ];
console.log(BFSFire(grid)) 