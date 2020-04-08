/*
On a N x N grid of cells, each cell (x, y) with 0 <= x < N and 0 <= y < N has a lamp.

Initially, some number of lamps are on.  lamps[i] tells us the location of the i-th lamp that is on.  Each lamp that is on illuminates every square on its x-axis, y-axis, and both diagonals (similar to a Queen in chess).

For the i-th query queries[i] = (x, y), the answer to the query is 1 if the cell (x, y) is illuminated, else 0.

After each query (x, y) [in the order given by queries], we turn off any lamps that are at cell (x, y) or are adjacent 8-directionally (ie., share a corner or edge with cell (x, y).)

Return an array of answers.  Each value answer[i] should be equal to the answer of the i-th query queries[i].

 

Example 1:

Input: N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
Output: [1,0]
Explanation: 
Before performing the first query we have both lamps [0,0] and [4,4] on.
The grid representing which cells are lit looks like this, where [0,0] is the top left corner, and [4,4] is the bottom right corner:
1 1 1 1 1
1 1 0 0 1
1 0 1 0 1
1 0 0 1 1
1 1 1 1 1
Then the query at [1, 1] returns 1 because the cell is lit.  After this query, the lamp at [0, 0] turns off, and the grid now looks like this:
1 0 0 0 1
0 1 0 0 1
0 0 1 0 1
0 0 0 1 1
1 1 1 1 1
Before performing the second query we have only the lamp [4,4] on.  Now the query at [1,0] returns 0, because the cell is no longer lit.
 

Note:

1 <= N <= 10^9
0 <= lamps.length <= 20000
0 <= queries.length <= 20000
lamps[i].length == queries[i].length == 2

https://leetcode.com/problems/grid-illumination/
*/

var gridIllumination = function(N, lamps, queries) {
    let directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0,  1], [1, -1], [1, 0], [1, 1]];
    
    const rowMap = new Map(); // row number to count of lamps
    const colMap = new Map(); // column number to count lamps
    const diagonalMap = new Map(); // diagonal x+y to count of lamps
    const antidiagonalMap = new Map(); // diagonal x-y to count of lamps
    const litMap = new Map(); // whether lamp is  ON|OFF - number all cels from 0 ....(NROW * NCOL) 0 based
    
    //map what areas are lit
    for(let [x, y] of lamps) {
        insert(rowMap, x);
        insert(colMap, y);
        insert(diagonalMap, x+y);
        insert(antidiagonalMap, x-y);
        litMap.set(N*x + y, true);
    }
    
    const result = new Array(queries.length).fill(0);
    let count = 0;
    for(let [x, y] of queries) {
        // Ii will be iluminated for all the row, column, diagonal and anti diagonal
        if(rowMap.get(x) > 0 || colMap.get(y) > 0 || diagonalMap.get(x+y) > 0 || antidiagonalMap.get(x-y) > 0) {
            result[count] = 1;
        }
        
        // Swicth the lamp if any
        for(let [i, j] of directions) {
            // New coordinates to switch laps, if the lamp is on, turn it off, so decrement the count of the lamps
            let newX = x + i;
            let newY = y + j;
            if(litMap.has(N*newX + newY)) {
                decrease(rowMap, newX);
                decrease(colMap, newY);
                decrease(diagonalMap, newX+newY);
                decrease(antidiagonalMap, N*newX+newY);
                litMap.delete(N*newX+newY);
            }
        }
        count++;
    }
    return result
};

const insert = (map, value) => {
    if(map.has(value)) {
        map.set(value, map.get(value)+1);
    } else {
        map.set(value, 1);
    }
}

const decrease = (map, value) => {
    if(map.has(value)) {
        map.set(value, map.get(value)-1);
    }
}