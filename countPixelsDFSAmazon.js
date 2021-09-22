/**
 * Given a set of pixels, return how many pixels we have in every picture
 * a picture is a set of pixels adjacent to each other
 * [
 * [1, 1, 0, 1],
 * [1, 1, 0, 0],
 * [0, 0, 1, 1],
 * [1, 0, 0, 0]
 * ]
 * 
 * output = [4, 1, 2, 1]
*/

const findPixels = function(grid) {
    if(!grid.length) {
        return [];
    }
    let ROW = grid.length;
    let COL = grid[0].length;
    let visited = new Array(ROW);
    for(let i = 0; i < ROW; i++) {
        visited[i] = new Array(COL).fill(0);
    }
    
    let result = [];
    let count = 0;
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COL; j++) {
            if(grid[i][j] && !visited[i][j]) {
                count = dfs(grid, visited, i, j);
                result.push(count);
            }
        }
    }
    return result
}

function dfs(grid, visited, row, col) {
    visited[row][col] = true;
    let count = 1;
    let ROW = [0, -1, 0, 1];
    let COL = [-1, 0, 1, 0];
    for(let i = 0; i < 4; i++) {
        let nextRow = ROW[i] + row;
        let nextCol = COL[i] + col;
        if(isSafe(grid, visited, nextRow, nextCol)) {
            count += dfs(grid, visited, nextRow, nextCol);
        }
    }
    return count;
}

function isSafe(grid, visited, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        grid[row][col] &&
        !visited[row][col]
    );
}

/*grid = [
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 0]
];
output = [4, 1, 2, 1]
*/
/*
grid = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
];
output = [16]
*/
/*grid = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [0, 0, 0, 0],
    [1, 1, 1, 1]
];
output = [6, 4]
*/
/* grid = [
    [0, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 0]
]*/
grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]
output = [6, 4];
console.log(findPixels(grid));
