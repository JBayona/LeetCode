/*
You are given a string s consisting of lowercase letters and an integer k. We call a string t ideal
if the following conditions are satisfied:
- t is a subsequence of the string s.
- The absolute difference in the alphabet order of every two adjacent letters in t
is less than or equal to k.
Return the length of the longest ideal string.

A subsequence is a string that can be derived from another string by
deleting some or no characters
without changing the order of the remaining characters.

Note that the alphabet order is not cyclic. For example, the absolute difference in the alphabet
order of 'a' and 'z' is 25, not 1.

Example 1:
Input: s = "acfgbd", k = 2
Output: 4
Explanation: The longest ideal string is "acbd". The length of this string is 4, so 4 is returned.
Note that "acfgbd" is not ideal because 'c' and 'f' have a difference of 3 in alphabet order.

Example 2:
Input: s = "abcd", k = 3
Output: 4
Explanation: The longest ideal string is "abcd". The length of this string is 4, so 4 is returned.

https://leetcode.com/problems/longest-ideal-subsequence/description/?envType=daily-question&envId=2024-04-25
*/

// Time O(N) + 26
// Space O(N)
var longestIdealString = function (s, k) {
  // Convert the string to char code
  // Arr with [a, b, c, ..] => [0, 1, 2] depending on S
  let arr = s.split("").map((c) => c.charCodeAt(0) - 97);
  let dp = new Array(arr.length).fill(1);

  // Store index seen
  // Only those indexes seen from left to right will have values
  // for the rest it will ve zero
  let prev = new Array(26).fill(-1);

  let result = 1;
  for (let i = 0; i < arr.length; i++) {
    let c = arr[i];
    for (let j = 0; j < 26; j++) {
      if (Math.abs(c - j) <= k) {
        // prev[j] will check all the previous elements from left to right to try to maximize the result
        // with the help of dp, the combination between dp and prev help us to increase the result
        // for the given string "acfgbd" when computing "c" the prev will find the index of "a" and the dp["a index"]
        // already was a result (1) so we are increasing it by 1 counting that c - k is a eligible
        dp[i] = Math.max(dp[i], (dp[prev[j]] || 0) + 1);
        result = Math.max(result, dp[i]);
      }
    }
    // Record the last index seen
    prev[c] = i;
  }
  return result;
};
