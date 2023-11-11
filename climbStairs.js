/*
You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Note: Given n will be a positive integer.

https://www.youtube.com/watch?v=CFQk7OQO_xM
https://www.youtube.com/watch?v=5o-kdjv7FD0

http://www.geeksforgeeks.org/count-ways-reach-nth-stair/
https://leetcode.com/problems/climbing-stairs/description/
*/

// DP
var climbStairs = function(n) {
    if (n <= 2) {
        return n;
    }

    let dp = new Array(n + 1).fill(0);
    // Base case
    dp[1] = 1; //Para llegar al primer escalon sólo tenemos una opción
    dp[2] = 2; //Para el 2, tenemos dos opciones, (1,1) y 2
    for(let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};

// Memoization approach
let memo = {};
var climbStairs = function(n) {
    if (n in memo) {
        return memo[n];
    }
    
    if (n <= 2 ){
        memo[n] = n;
        return n;
    }
    
    memo[n] = climbStairs(n - 1) + climbStairs(n - 2);
    return memo[n];
};

// Recursion
var climbStairs = function(n) {
    if (n <= 2 ){
        return n;
    }
    return climbStairs(n - 1) + climbStairs(n - 2);
};

n = 5;
console.log(climbStairs(n));
