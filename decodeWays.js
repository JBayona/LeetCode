/*
A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26
Given a non-empty string containing only digits, determine the total number of ways to decode it.

Example 1:

Input: "12"
Output: 2
Explanation: It could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: "226"
Output: 3
Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

https://youtu.be/qli-JCrSwuk

https://leetcode.com/problems/decode-ways/description/
*/

// O(N) DP
var numDecodings = function(s) {
    if(!s || s.length === 0 || s[0] === '0') {
      return 0;
    }

    if(s.length === 1 && s[0] === '0') {
      return 0;
    }

    let n = s.length;
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    // Not zeros at the beginning are allowed
    dp[1] = s.charAt(1) != '0' ? 1 : 0;
    for (let i = 2; i <= s.length; i++) {
      let first = parseInt(s.substring(i - 1, i));
      let second = parseInt(s.substring(i - 2, i));
      if (first > 0 && first <= 9) {
        dp[i] = dp[i] + dp[i - 1];
      }
      if (second >= 10 && second <= 26) {
        dp[i] = dp[i] + dp[i - 2];
      }
    }
    return dp[n];
};

var numDecodings = function(s) {
    memo = {}
    return helper(s, s.length, memo);
};

function helper(data, k, memo) {
  // Base case numDecodings("") = 1
  if(k === 0) {
      return 1;
  }

  let s = data.length - k;
  // Base case numDecodings("011") = 0
  if(data[s] === '0') {
      return 0;
  }

  // Save memoization
  if(memo[k]) {
      return memo[k];
  }

  let result = helper(data, k-1, memo);
  if(k >= 2 && parseInt(data.substring(s,s+2)) <= 26) {
      result += helper(data, k-2, memo)
  }
  memo[k] = result
  return result;
}

str = "227";
console.log(numDecodings(str));