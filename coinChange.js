/*

You are given coins of different denominations and a total amount of money amount.
Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

Example 1:

Input: coins = [1, 2, 5], amount = 11
Output: 3 

Explanation: 11 = 5 + 5 + 1

Example 2:

Input: coins = [2], amount = 3
Output: -1
Note:
You may assume that you have an infinite number of each kind of coin.

Let dp[i] to be the minimum number of coins required to get the amount i. 
dp[i] = 1, if i==coin
otherwise, dp[i]=min(dp[i-coin]+1, dp[i]) if dp[i-coin] is reachable. 
We initially set dp[i] to be MAX_VALUE.

dp[i] siempre tendrá el número menor de monedas de cada índice y ese
número nos ayudará para considerar la moneda actual, por ejemplo:

Coins = [2, 3]
Amount = 7

Para el 7, podemos tener dos combinaciones:
1. Si tenemos la moneda 2, podemos formar el 7 con la combinación de 5 (2 + 3) y la moneda 2, que son 3 monedas
2. Si tenemos la moneda 3, podemos formar el 7 con la combinación de 4 (2 + 2) y la moneda 3, que son 3 monedas

En ambas las respuesta es 3 monedas como mínimo. 

dp = [ 0, Infinity, 1, 1, 2, 2, 2, 3 ]

https://www.programcreek.com/2015/04/leetcode-coin-change-java/

*/

var coinChange = function(coins, amount) {
  if(amount === 0) {
    return 0;
  }
  let dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;

  for(let i = 1; i <= amount; i++) {
    for(let coin of coins) {
      if(coin === i) {
        dp[i] = 1;
      } else if(i > coin){
        // Not reachable
        if(dp[i - coin] === Number.MAX_SAFE_INTEGER) {
          continue;
        }
        dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
      }
    }
  }

  return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};

// const coins = [1, 2, 5];
// const amount = 11;
const coins = [2];
const amount = 4;
console.log(coinChange(coins, amount));
