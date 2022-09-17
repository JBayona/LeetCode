/*
You are given two integer arrays nums and multipliers of size n and m respectively
where n >= m. The arrays are 1-indexed.

You begin with a score of 0. You want to perform exactly m operations.
On the ith operation (1-indexed), you will:

Choose one integer x from either the start or the end of the array nums.
Add multipliers[i] * x to your score.
Remove x from the array nums.
Return the maximum score after performing m operations.

Example 1:
Input: nums = [1,2,3], multipliers = [3,2,1]
Output: 14
Explanation: An optimal solution is as follows:
- Choose from the end, [1,2,3], adding 3 * 3 = 9 to the score.
- Choose from the end, [1,2], adding 2 * 2 = 4 to the score.
- Choose from the end, [1], adding 1 * 1 = 1 to the score.
The total score is 9 + 4 + 1 = 14.

Example 2:
Input: nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]
Output: 102
Explanation: An optimal solution is as follows:
- Choose from the start, [-5,-3,-3,-2,7,1], adding -5 * -10 = 50 to the score.
- Choose from the start, [-3,-3,-2,7,1], adding -3 * -5 = 15 to the score.
- Choose from the start, [-3,-2,7,1], adding -3 * 3 = -9 to the score.
- Choose from the end, [-2,7,1], adding 1 * 4 = 4 to the score.
- Choose from the end, [-2,7], adding 7 * 6 = 42 to the score. 
The total score is 50 + 15 - 9 + 4 + 42 = 102.

https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/
*/

/*
We create a 2D DP array which represents the greatest product we can make by
either picking from the start of nums (columns) versus the end of nums (rows).

In the below example:
the first row is what we'd get if we only chose from the beginning of nums
the first column is what we'd get if we only chose from the end of nums
nums = [1, 2, 3]
multipliers = [3, 2, 1]
m = multipliers.length
n = nums.length
[
  [ 0,  3,  7, 10],
  [ 9,  0,  0,  -],
  [13,  0,  -,  -],
  [14,  -,  -,  -],
]
Why only half a table? Because we only have m moves we can make, so snake a path
from the origin to anywhere on the table in m moves to see how much of
the table will be used for our calculations.

So how do we fill out the rest of the table:
we could have gotten to [1, 1] from either [1, 0] or [0, 1], meaning we picked from the end of the array,
then the beginning, or vise versa
So our best at [1, 1] will be the max of:
[1, 0] (9) + multipliers[1] * nums[0] (beginning of nums), which is 9 + (1 * 2) === 11
[0, 1] (3) + multipliers[1] * nums[2] (end of nums), which is 3 + (3 * 2) === 9

Then at [1, 2] it's
[1, 1] (11) + multipliers[2] * nums[1] (beginning of nums), which is 11 + (1 * 2) === 13
[0, 2] (7) + multipliers[2] * nums[2] (end of nums), which is 7 + (1 * 3) === 10
Finally at [2, 1]
[2, 0] (13) + multipliers[2] * nums[0] (beginning of nums), which is 13 + (1 * 1) === 14
[1, 1] (11) + multipliers[2] * nums[1] (end of nums), which is 11 + (1 * 2) === 13
And our table looks like

[
  [ 0,  3,  7, 10],
  [ 9, 11, 13,  -],
  [13, 14,  -,  -],
  [14,  -,  -,  -],
]
So just pick the max number along the diagonal, and you're done.
*/
// Option 1
// https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/discuss/1077080/JavaScript-Bottom-Up-DP
var maximumScore = function(nums, multipliers) {
    const n = nums.length;
    const m = multipliers.length;
    const dp = new Array(m + 1).fill(0).map(() => new Array(m + 1).fill(0));
    
    for (let i = 1; i <= m; i += 1) {
        // Row
        dp[0][i] += dp[0][i-1] + nums[i-1] * multipliers[i-1];
        // Column
        dp[i][0] += dp[i-1][0] + nums[n-i] * multipliers[i-1];
    }
    
    let max = Math.max(dp[m][0], dp[0][m]);
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= m - i; j++) {
            dp[i][j] = Math.max(
                dp[i][j-1] + nums[j - 1] * multipliers[i + j - 1],
                dp[i-1][j] + nums[n - i] * multipliers[i + j - 1],
            );
        }
        max = Math.max(max, dp[i][m-i]);
    }
  return max;
};


// Option 2
/*
Classic DP problem
- i is left pointer, j is right pointer, each time we have 2 choices 
take either left element or right element, and return the max.
- The hardest part is to manage your space (cache) efficiently
- N: 10^5, M: 10^3. dp[N][N] will make us out of memory.
- Observation: the range of i is at most [0, M), the range of j is at most [N - M, N). So that
we could use dp[M][M] rather than dp[N][N] to save a lot of
space (just need to "normalize" the right pointer a little bit).
*/
var maximumScore = function(nums, multipliers) {
    let n = nums.length;
    let m = multipliers.length;
    
    let dp = new Array(m);
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(m).fill(0);
    }
    
    return helper(nums, multipliers, 0, n - 1, dp);
};

function helper(nums, multipliers, left, right, dp) {
    let n = nums.length;
    let m = multipliers.length;
    let index = (left - 0) + (n - 1 - right);
    
	if (index == m) {
        return 0;
    }
    
    if (dp[left][right - (n - m)]) {
        return dp[left][right - (n - m)];
    }
    
    let res = Math.max(nums[left] * multipliers[index] + helper(nums, multipliers, left + 1, right, dp), 
					   nums[right] * multipliers[index] + helper(nums, multipliers, left, right - 1, dp));
    dp[left][right - (n - m)] = res;
    return res;
}