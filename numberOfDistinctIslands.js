/*
Given a non-empty 2D arraygridof 0's and 1's, an island is a group of1's (representing land)
connected 4-directionally (horizontal or vertical.) You may assume all four edges of the
grid are surrounded by water.
Count the number of distinct islands. An island is considered to be the same
as another if and only if one island can be translated (and not rotated or reflected) to
equal the other.

Example 1:

11000
11000
00011
00011

Given the above grid map, return 1.

Example 2:

11011
10000
00001
11011

Given the above grid map, return 3.

Notice that:

11
1
and

 1
11
are considered different island shapes, because we do not consider reflection / rotation.

Note: The length of each dimension in the givengriddoes not exceed 50.

Thoughts:

Distinct islands: island 2d coordinates sets are distinct based off its offset
*/
// Opción 1
function numDistinctIslands(grid) {
    if(!grid.length) {
        return 0;
    }
    let row = grid.length;
    let col = grid[0].length;
    let result = new Set();
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            let set = new Set();
            if(grid[i][j] === 1) {
                dfs(grid, i, j, i, j, set);
                // 0_0,1_0,1_1,0_1
                result.add(Array.from(set).join(','));
            }
        }
    }
    return result.size;
}

function dfs(grid, row, col, baseX, baseY, set) {

    let rowk = [-1,0,0,1];
    let colk = [0,-1,1,0];

    for(let i = 0; i < 4; i++) {
        let newRow = row + rowk[i];
        let newCol = col + colk[i];
        if(isSafe(grid, newRow, newCol)) {
            set.add((newRow - baseX) + "_" + (newCol - baseY));
            // Mark to avoid duplicates
            grid[newRow][newCol] = 0;
            dfs(grid, newRow, newCol, baseX, baseY, set);
        }
    }
}

function isSafe(grid, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        grid[row][col] === 1
    );
}

// Opción 2
function numDistinctIslands(grid) {
    if(!grid.length) {
        return 0;
    }
    let row = grid.length;
    let col = grid[0].length;
    let result = new Set();
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            let set = new Set();
            if(grid[i][j] === 1) {
                dfs(grid, i, j, i, j, set);
                // 0_0,1_0,1_1,0_1
                result.add(Array.from(set).join(','));
            }
        }
    }
    return result.size;
}

function dfs(grid, row, col, baseX, baseY, set) {
    if(!isSafe(grid, row, col)) {
        return;
    }
    set.add((row - baseX) + "_" + (col - baseY));

    // Mark to avoid duplicates
    grid[row][col] = 0;
    dfs(grid, row + 1, col, baseX, baseY, set);
    dfs(grid, row - 1, col, baseX, baseY, set);
    dfs(grid, row, col + 1, baseX, baseY, set);
    dfs(grid, row, col - 1, baseX, baseY, set);
}

function isSafe(grid, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        grid[row][col] === 1
    );
}


island = [
    [1,1,0,0,0],
    [1,1,0,0,0],
    [0,0,0,1,1],
    [0,0,0,1,1]
] // 1
// island = [
//     [1,1,0,1,1],
//     [1,0,0,0,0],
//     [0,0,0,0,1],
//     [1,1,0,1,1]
// ] // 3
console.log(numDistinctIslands(island));
