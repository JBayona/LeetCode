/*
You are given an m x n integer matrix points (0-indexed). Starting with 0 points, you want to
maximize the number of points you can get from the matrix.

To gain points, you must pick one cell in each row. Picking the cell at coordinates (r, c)
will add points[r][c] to your score.

However, you will lose points if you pick a cell too far from the cell that you picked in
the previous row. For every two adjacent rows r and r + 1 (where 0 <= r < m - 1), picking cells
at coordinates (r, c1) and (r + 1, c2) will subtract abs(c1 - c2) from your score.

Return the maximum number of points you can achieve.

abs(x) is defined as:

x for x >= 0.
-x for x < 0.

https://leetcode.com/problems/maximum-number-of-points-with-cost/description/
*/

// Time O(M * N)
// Space O(M * N)
// DP
var maxPoints = function(points) {
    let n = points.length;
    let m = points[0].length;

    let dp = new Array(n + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(m + 1).fill(0);
    }

    // Forst row are the points
    for (let i = 0; i < m; i++) {
        dp[0][i] = points[0][i];
    }

    for (let i = 1; i < n; i++) {
        let left = Array(m).fill(0);
        let right = Array(m).fill(0);

        left[0] = dp[i - 1][0];
        for (let j = 1; j < m; j++) {
            // The -1 is coming from the penalty
            left[j] = Math.max(left[j - 1] - 1, dp[i - 1][j]);
        }

        right[m - 1] = dp[i - 1][m - 1];
        for (let j = m - 2; j >= 0; j--) {
            // The -1 is coming from the penalty
            right[j] = Math.max(right[j + 1] - 1, dp[i - 1][j]);
        }

        for (let j = 0; j < m; j++) {
            // For each cell, the maximum points are computed as the sum of
            //the current cell's value and the best transition from the previous
            //row (either from left[j] or right[j]).
            dp[i][j] = points[i][j] + Math.max(left[j], right[j]);
        }
    }

    let ans = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < m; i++) {
        // The last row has the results
        ans = Math.max(ans, dp[n - 1][i]);
    }

    return ans;
};

// Option 2
// BFS
var maxPoints = function(points) {
    let ROW = points.length;
    let COL = points[0].length;

    let queue = [];
    // Add all candidates from the first row
    for (let i = 0; i < COL; i++) {
        queue.push({row:0, col: i, val: points[0][i]});
    }
    
    let result = 0;
    while(queue.length) {
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            let {row, col, val} = queue.shift();
            result = Math.max(result, val);
            // Add all possible moves in the next row
            for (let j = 0; j < COL; j++){
                let nextRow = row + 1;
                if (nextRow < ROW) {
                    let currentVal = (points[nextRow][j] + val) - Math.abs(col - j);
                    queue.push({row: nextRow, col: j, val: currentVal});
                }
            }
        }
    }
    return result;
};
