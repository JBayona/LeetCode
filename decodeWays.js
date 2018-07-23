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

https://leetcode.com/problems/decode-ways/description/
*/

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