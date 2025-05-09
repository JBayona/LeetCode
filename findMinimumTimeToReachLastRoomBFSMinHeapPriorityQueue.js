/*
Find Minimum Time to Reach Last Room I

There is a dungeon with n x m rooms arranged as a grid.
You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum
time in seconds when you can start moving to that room.
You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between
adjacent rooms takes exactly one second.

Return the minimum time to reach the room (n - 1, m - 1).
Two rooms are adjacent if they share a common wall, either horizontally or vertically.

Example 1:
Input: moveTime = [[0,4],[4,4]]
Output: 6
Explanation:
The minimum time required is 6 seconds.
At time t == 4, move from room (0, 0) to room (1, 0) in one second.
At time t == 5, move from room (1, 0) to room (1, 1) in one second.

Example 2:
Input: moveTime = [[0,0,0],[0,0,0]]
Output: 3
Explanation:
The minimum time required is 3 seconds.

At time t == 0, move from room (0, 0) to room (1, 0) in one second.
At time t == 1, move from room (1, 0) to room (1, 1) in one second.
At time t == 2, move from room (1, 1) to room (1, 2) in one second.

Example 3:
Input: moveTime = [[0,1],[1,2]]
Output: 3

https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i/
*/

// Approach
// We are given a two-dimensional array of size n×m, and the task is to find the shortest time required to move from position (0,0) to position (n−1,m−1).
// While moving, one can go to any of the four adjacent positions (up, down, left, right), and each position has an associated earliest move time
// meaning one can only move to that position after that time.
// O(NmLog(Nm))
// Space O(N)
var minTimeToReach = function(grid) {
    let ROW = grid.length;
    let COL = grid[0].length;

    let distance = new Array(ROW);
    let visited = new Array(ROW);
    for (let i = 0; i < ROW; i++) {
        distance[i] = new Array(COL).fill(Infinity);
        visited[i] = new Array(COL).fill(false);
    }

    let minHeap = new PriorityQueue((a, b) => a.d - b.d);

    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];

    distance[0][0] = 0;
    minHeap.enqueue({x: 0, y: 0, d: 0});
    while(!minHeap.isEmpty()) {
        let {x, y, d} = minHeap.dequeue();
        // If it has been visited before
        if (visited[x][y]) {
            continue;
        }
        // Mark as visited
        visited[x][y] = true;
        for (let i = 0; i < 4; i++) {
            let nextRow = x + rowK[i];
            let nextCol = y + colK[i];
            if (!isSafe(grid, visited, nextRow, nextCol)) {
                continue;
            }
            // Get the maximum from where we are at or where we are going
            const dist = Math.max(distance[x][y], grid[nextRow][nextCol]) + 1;
            if (distance[nextRow][nextCol] > dist) {
                distance[nextRow][nextCol] = dist;
                minHeap.enqueue({x: nextRow, y: nextCol, d: dist + 1});
            }
        }
    }
    // Get the greater element
    return distance[ROW - 1][COL - 1];
};

function isSafe(grid, visited, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL &&
        visited[row][col] === false
    );
}