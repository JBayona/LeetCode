/*
Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.
In other words, given two integer arrays val[0..n-1] and wt[0..n-1] which represent values and weights associated with n items respectively. Also given an integer W which represents
knapsack capacity, find out the maximum value subset of val[] such that sum of the weights of
this subset is smaller than or equal to W. You cannot break an item, either pick the complete
item or don’t pick it (0-1 property).

https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
https://www.youtube.com/watch?v=8LusJS5-AGo
*/

const knapsack01 = function(val, weight, W) {
    let dp = new Array(val.length + 1);
    for(let i = 0; i < dp.length; i++) {
        dp[i] = new Array(W + 1).fill(0);
    }
    
    for(let i = 0; i <= val.length; i++) {
        for(let j = 0; j <= W; j++) {
            if(i === 0 || j === 0) {
                continue;
            }
            // Check if we can pick and element from the weight
            // Current element should be greater than the current weight
            if(j >= wt[i-1]){
                // Check if we can maximize or do better to have more values based on the weight
                dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-weight[i-1]] + val[i-1]);
            } else {
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    return dp[val.length][W];
}

let val = [22, 20, 15, 30, 24, 54, 21, 32, 18, 25];
let wt = [4, 2, 3, 5, 5, 6, 9, 7, 8, 10];
let W = 30;
console.log(knapsack01(val, wt, W));
