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