/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
*/
/*
You are given an m x n grid rooms initialized with these three possible values.

*) -1 A wall or an obstacle.
*) 0 A gate.
*) INF Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you
may assume that the distance to a gate is less than 2147483647.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should
be filled with INF.

https://leetcode.com/problems/walls-and-gates/description/
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


// OPTION 2
var wallsAndGates = function(rooms) {
    let ROW = rooms.length;
    let COL = rooms[0].length;

    let queue = [];
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            // Found a gate
            if (rooms[i][j] === 0) {
                queue.push({row: i, col: j, d: 1});
            }
        }
    }

    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];

    while (queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let {row, col, d} = queue.shift();
            for (let j = 0;  j < 4; j++) {
                let nextRow = row + rowK[j];
                let nextCol = col + colK[j];
                if (isSafe(rooms, nextRow, nextCol) && d < rooms[nextRow][nextCol]) {
                    rooms[nextRow][nextCol] = d;
                    queue.push({row: nextRow, col: nextCol, d: d + 1});
                }
            }
        }
    }
    return rooms;
};

function isSafe(grid, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL
    );
}


rooms = [[Infinity,-1,0,Infinity],[Infinity,Infinity,Infinity,-1],[Infinity,-1,Infinity,-1],[0,-1,Infinity,Infinity]];
// rooms = [[-1]];
console.log(wallsAndGates(rooms));
