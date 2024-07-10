/*
There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1).

The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop
rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and

destination = [destinationrow, destinationcol], return the shortest distance for the ball to stop at the destination.
If the ball cannot stop at destination, return -1.

The distance is the number of empty spaces traveled by the ball from the start position (excluded) to
the destination (included).

You may assume that the borders of the maze are all walls (see examples).
https://leetcode.com/problems/the-maze-ii/description/?envType=study-plan-v2&envId=graph-theory
*/

// BFS
// Time O(N * M)
var shortestDistance = function (maze, start, destination) {
    let [x, y] = start;

    let ROW = maze.length;
    let COL = maze[0].length;

    let visited = new Array(ROW);
    for (let i = 0; i < ROW; i++) {
        // Consider everything as wall
        visited[i] = new Array(COL).fill(-1);
    }
    
    let queue = [];
    queue.push({x: x, y: y});
    visited[x][y] = 0;

    let row = [-1, 0, 1, 0];
    let col = [0, 1, 0, -1];

    while (queue.length) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            let {x, y} = queue.shift();
            for (let i = 0; i < 4; i++) {
                let nextRow = x;
                let nextCol = y;
                let count = 0;
                // Keep rolling in the current direction until
                // we have a boundary
                while (isValid(maze, nextRow + row[i], nextCol + col[i]) && maze[nextRow + row[i]][nextCol + col[i]] === 0) {
                    nextRow += row[i];
                    nextCol += col[i];
                    count++;
                }

                // Only add valid options to the queue
                if (visited[nextRow][nextCol] === -1 ||  visited[x][y] + count < visited[nextRow][nextCol]) {
                    visited[nextRow][nextCol] = visited[x][y] + count;
                    queue.push({x: nextRow, y: nextCol});
                }
            }
        }
    }
    // The result is in the visited matrix
    return visited[destination[0]][destination[1]];
};

function isValid(maze, row, col) {
  let ROW = maze.length;
  let COL = maze[0].length;
  return (
    row >= 0 && row < ROW && col >= 0 && col < COL
  );
}
