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
// BFS
// Time O(N * M) All directions will be visited
// Space O(N * M)
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
        // This will make the thing to move all the way until we hit a wall
        while(isValid(maze, x + rowK[i], y + colK[i]) && maze[x + rowK[i]][y + colK[i]] === 0) {
            x = x + rowK[i];
            y = y + colK[i];
        }

        if(canReach(maze, x, y, destination, visited)) {
            return true;
        }
    }
    return false;
}

function isValid(maze, row, col) {
  let ROW = maze.length;
  let COL = maze[0].length;
  return (
    row >= 0 && row < ROW && col >= 0 && col < COL
  );
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
