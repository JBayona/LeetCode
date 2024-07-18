/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
// Time O (V + E)
// Space O (V + E)
var wallsAndGates = function(rooms) {
    let ROW = rooms.length;
    let COL = rooms[0].length;

    let queue = [];
    for (let i = 0 ; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            // Check for all gates to run a BFS as a 
            // starting point
            if (rooms[i][j] === 0) {
                queue.push({row: i, col: j, distance: 1});
            }
        }
    }

    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];

    let count = 0;
    while (queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let {row, col, distance} = queue.shift();
            for (let i = 0; i < 4; i++) {
                let nextRow = row + rowK[i];
                let nextCol = col + colK[i];
                if (isSafe(nextRow, nextCol, rooms) && distance < rooms[nextRow][nextCol]) {
                    rooms[nextRow][nextCol] = distance;
                    queue.push({row: nextRow, col: nextCol, distance: distance + 1});
                }
            }
        }
    }
    return rooms;
}

function isSafe(row, col, grid) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 &&
        row < ROW &&
        col >= 0 &&
        col < COL &&
        grid[row][col] !== -1
    );
}


rooms = [[Infinity,-1,0,Infinity],[Infinity,Infinity,Infinity,-1],[Infinity,-1,Infinity,-1],[0,-1,Infinity,Infinity]];
// rooms = [[-1]];
console.log(wallsAndGates(rooms));
