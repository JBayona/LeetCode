/*
You are given an m x n grid grid where:

'.' is an empty cell.
'#' is a wall.
'@' is the starting point.
Lowercase letters represent keys.
Uppercase letters represent locks.
You start at the starting point and one move consists of walking one space in one of the four cardinal directions. You cannot walk outside the grid, or walk into a wall.

If you walk over a key, you can pick it up and you cannot walk over a lock unless you have its corresponding key.

For some 1 <= k <= 6, there is exactly one lowercase and one uppercase letter of the first k letters of the English alphabet in the grid. This means that there is
exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

Return the lowest number of moves to acquire all keys. If it is impossible, return -1.

https://leetcode.com/problems/shortest-path-to-get-all-keys/description/?envType=study-plan-v2&envId=graph-theory
*/

// Time: O(R * C(A)) -> R = rows, C = columns, A = letters in the alphabet
// Space: O(N)
// Approach:
// Identify the starting point, number of keys and we need to keep the current state view as
// having just the row and col won't be enough, we need also the current view of the state
// on that period of time
// To improve we can do hashing in the keys
var shortestPathAllKeys = function(grid) {
    let ROW = grid.length;
    let COL = grid[0].length;

    let keysCount = 0;
    let xStart = 0;
    let yStart = 0;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            let c = grid[i][j];
            // Find the starting point
            if (c === '@') {
                xStart = i;
                yStart = j;
            } else if('abcdef'.includes(c)) { // Count how many keys we have
                keysCount++;
            }
        }
    }
    
    let rowK = [0, -1, 0, 1];
    let colK = [-1, 0, 1, 0];

    let visited = new Set();
    // Having the row and column is not sufficient, we need more than that, we need
    // to keep the state for the current keys we have at that period of time
    visited.add(serialize(xStart, yStart, new Set()));
    let queue = [{x: xStart, y: yStart, d: 0, keys: new Set()}];
    while (queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let {x, y, d, keys} = queue.shift();
            // If the current view already has the same size as of keys
            // We know it's true
            if (keys.size === keysCount) {
                return d;
            }
            for (let j = 0; j < 4; j++) {
                let nextRow = x + rowK[j];
                let nextCol = y + colK[j];
                // Out of boundaries, wall or visited before, skip it
                if (!isSafe(grid, visited, nextRow, nextCol) || grid[nextRow][nextCol] === '#' || visited.has(serialize(nextRow, nextCol, keys))) {
                    continue;
                }
                // If we find a lock and we don't have the key, skip it
                if ('ABCDEF'.includes(grid[nextRow][nextCol]) && !keys.has(grid[nextRow][nextCol].toLowerCase())) {
                    continue;
                }
                // If we find a key, collect it, we need a different
                // variable as we don't need to update all of the rest
                // as it's by reference
                let newKeys = new Set(keys);
                if ('abcdef'.includes(grid[nextRow][nextCol])) {
                    newKeys.add(grid[nextRow][nextCol]);
                }
                // All is good, add it to the queue
                visited.add(serialize(nextRow, nextCol, newKeys));
                queue.push({x: nextRow, y: nextCol, d: d + 1, keys: newKeys});
            }
        }
    }
    return -1;
};

function serialize(row, col, keys) {
    return `${row}-${col}-${Array.from(keys).join('')}`;
}

function isSafe(grid, visited, row, col) {
    let ROW = grid.length;
    let COL = grid[0].length;
    return (
        row >= 0 && row < ROW &&
        col >= 0 && col < COL
    );
}

// Option 2
/*
var shortestPathAllKeys = function(grid) {

    let m = grid.length
    let n = grid[0].length
    let k = 0
    let start
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let c = grid[i][j]
            if ("abcdef".includes(c)) k++
            if (c == '@') start = [i, j]
        }
    }

    let hasAllKeys = keys => {
        return keys.toString(2).split('').filter(bit => bit === '1').length == k
    }

    let hasKey = (keys, lock) => {
        let shift = lock.toLowerCase().charCodeAt(0) - 97
        return (keys & (1 << shift)) != 0
    }

    let addKey = (keys, key) => {
        let shift = key.charCodeAt(0) - 97
        return keys | (1 << shift)
    }

    let next_moves = function(coords) {
        let [x,y] = coords
        let next = [[x+1, y], [x-1, y], [x, y+1], [x, y-1]]
        return next.filter(([x0, y0]) => {
            return x0 >= 0
                && y0 >= 0
                && x0 < m
                && y0 < n
                && grid[x0][y0] != '#'
        })
    }

    let serializeState = state => {
        return `${state[0][0]}%${state[0][1]}|${state[1]}`
    }
    
    let init = [start, 0, 0]  // [position, keys, counter]
    let queue = [init]
    let visited = new Set()
    visited.add(serializeState(init))

    while (queue.length) {
        let [[x,y], keys, counter] = queue.shift()
        let cell = grid[x][y]
        if ("ABCDEF".includes(cell) && !hasKey(keys, cell)) continue
        if ("abcdef".includes(cell)) {
            keys = addKey(keys, cell)
        }
        if (hasAllKeys(keys)) return counter
        for (let next of next_moves([x,y])) {
            let nextState = [next, keys]
            if (!visited.has(serializeState(nextState))) {
                visited.add(serializeState(nextState));
                queue.push([next, keys, counter + 1])
            }
        }
    }
    return -1
};
*/