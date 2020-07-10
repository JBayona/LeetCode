/*
Write a program to find the n-th ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. 

Example:

Input: n = 10
Output: 12
Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.
Note:  

1 is typically treated as an ugly number.
n does not exceed 1690.

https://leetcode.com/problems/ugly-number-ii/
*/

var nthUglyNumber = function(n) {
    let dp = [];
    dp[0] = 1;
    let index2 = 0;
    let index3 = 0;
    let index5 = 0;
    
    for(let i = 1; i < n; i++) {
        let num = Math.min(dp[index2] * 2, dp[index3] * 3, dp[index5] * 5);
        dp[i] = num;
        
        if(dp[i] === dp[index2] * 2) {
            index2++;
        }
        if(dp[i] === dp[index3] * 3) {
            index3++;
        }
        if(dp[i] === dp[index5] * 5) {
            index5++;
        }
    }
    return dp[n-1];
};