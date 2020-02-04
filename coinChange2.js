/*
You are given coins of different denominations and a total amount of money.
Write a function to compute the number of combinations that make up that amount.
You may assume that you have infinite number of each kind of coin.

 
Example 1:

Input: amount = 5, coins = [1, 2, 5]
Output: 4

Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Example 2:

Input: amount = 3, coins = [2]
Output: 0

Explanation: the amount of 3 cannot be made up just with coins of 2.

Example 3:

Input: amount = 10, coins = [10] 
Output: 1

https://leetcode.com/problems/coin-change-2/
https://www.youtube.com/watch?v=DJ4a7cmjZY0
https://www.youtube.com/watch?v=p3WUwdmKRiQ
*/

var change = function(amount, coins) {
    let n = coins.length;
    let dp = new Array(n + 1). fill(0);
    for(let i = 0; i <= n; i++) {
        dp[i] = new Array(amount + 1).fill(0);
    }
    
    // Set initial state
    dp[0][0] = 1;
    
    for(let i = 1; i <= n; i++) {
        // Sin importar que monedas tengamos disponibles, sólo
        // tenemos una forma de hacer  la cantidad de 0, que es no hacer nada
        dp[i][0] = 1;
        for(let j = 1; j <= amount; j++) {
            // if the coin's value is bigger than amount
            // copy the result from previous row directly.
            dp[i][j] = dp[i-1][j] + (j >= coins[i-1] ? dp[i][j - coins[i-1]] : 0);
        }
    }

    console.log(dp);
    return dp[n][amount];
};