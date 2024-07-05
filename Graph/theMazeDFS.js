/*
There is a ball in a maze with empty spaces and walls. The ball can go through empty
spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When
the ball stops, it could choose the next direction.

Given the ball's start position, the destination and the maze, determine whether
the ball could stop at the destination.

The maze is represented by a binary 2D array. 1 means the wall and 0 means the empty space.
You may assume that the borders of the maze are all walls. The start and destination coordinates are
represented by row and column indexes.

Example 1
Input 1: a maze represented by a 2D array

0 0 1 0 0
0 0 0 0 0
0 0 0 1 0
1 1 0 1 1
0 0 0 0 0

Input 2: start coordinate (rowStart, colStart) = (0, 4)
Input 3: destination coordinate (rowDest, colDest) = (4, 4)

Output: true
Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.

https://cheonhyangzhang.gitbooks.io/leetcode-solutions/content/solutions-451-500/490-the-maze.html
*/

function hasPath(maze, start, destination) {
    let visited = new Array(maze.length);
    for(let i = 0; i < maze.length; i++) {
        visited[i] = new Array(maze[i].length).fill(false);
    }

    return canReach(maze, start[0], start[1], destination, visited);
}

function canReach(maze, row, col, destination,visited) {
    // We reach the destination
    if(row === destination[0] && col === destination[1]) {
        return true;
    }
    // Already visited
    if(visited[row][col]) {
        return false;
    }
    // Marks as visited
    visited[row][col] = true;
    let rowK = [0, 1, 0, -1];
    let colK = [1, 0, -1, 0];

    for(let i = 0; i < 4; i++) {
        let x = row;
        let y = col;
        // This will make the thing to move all the way until we reach a wall
        while(x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && maze[x][y] === 0) {
            x = x + rowK[i];
            y = y + colK[i];
        }
        // Once the ball hit the wall, take a step back to move, try all combinations
        x = x - rowK[i];
        y = y - colK[i];
        if(!visited[x][y] && canReach(maze, x, y, destination, visited)) {
            return true;
        }
    }
    return false;
}

// True
// maze = [
//     [0,0,1,0,0],
//     [0,0,0,0,0],
//     [0,0,0,1,0],
//     [1,1,0,1,1],
//     [0,0,0,0,0]
// ];
// start = [0, 4];
// end = [4, 4];
// False
maze = [
    [0,0,1,0,0],
    [0,0,0,0,0],
    [0,0,0,1,0],
    [1,1,0,1,1],
    [0,0,0,0,0]
]
start = [0, 4];
end = [3, 2];
console.log(hasPath(maze, start, end));
