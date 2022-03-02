/*
Given an integer n, break it into the sum of k positive integers, where k >= 2
and maximize the product of those integers.

Return the maximum product you can get.
Example 1:
Input: n = 2
Output: 1
Explanation: 2 = 1 + 1, 1 × 1 = 1.

Example 2:
Input: n = 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.

https://leetcode.com/problems/integer-break/
*/

// e.x) 6 = 2 + 4 => you can use dp[2](break 2) or 2(2 itself) and the same as with 4. Iterate from 1 to n - 1.

let integerBreak = (n) => {
    const dp = new Array(n + 1).fill(0)
    dp[2] = 1
    for (let i = 2; i < n + 1; i++) {
      for (let j = 1; j < i; j++) {
        dp[i] = Math.max(dp[i], Math.max(dp[i - j], i-j) * Math.max(dp[j], j))
      }
    }
    return dp[dp.length-1]
  }