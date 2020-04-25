// Similar to count islands

function amazonClusters(grid, row, column) {
    if(!grid.length) {
        return 0;
    }

    let visited =  new Array(row).fill(false);
    for(let i = 0; i < row; i++) {
        visited[i] = new Array(col).fill(false);
    }

    let result = 0;
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(grid[i][j] === 1 && visited[i][j] === false) {
                visited[i][j] = true;
                dfs(grid, visited, i, j);
                result++;
            }
        }
    }
    return result;
}

function dfs(grid, visited, row, col) {
    // vertical y horizontal
    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];

    for(let i = 0; i < 4; i++) {
        let nextRow = row + rowK[i];
        let nextCol = col + colK[i];
        if(isSafe(grid, visited, nextRow, nextCol)) {
            visited[nextRow][nextCol] = true;
            dfs(grid, visited, nextRow, nextCol);
        }
    }
}

function isSafe(grid, visited, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;

    return(
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        grid[row][col] === 1 &&
        visited[row][col] === false
    );
}

grid = [
    [1,1,0,0],
    [0,0,1,0],
    [0,0,0,0],
    [1,0,1,1],
    [1,1,1,1]
];
row = 5;
col = 4;
console.log(amazonClusters(grid, row, col));