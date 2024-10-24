/*
Given a string n representing an integer, return the closest
integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.

The closest is defined as the absolute difference minimized between two integers.

Example 1:
Input: n = "123"
Output: "121"

Example 2:
Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.

https://leetcode.com/problems/find-the-closest-palindrome/description
*/

// Edge cases, we can have edge cases where number is close to power of 10s
// for example for 1000, it could be 999 or 1001
// Approach
// 1. Identify edge cases.
// 2. Generate palindrome candidates.
// 3. Comparison and selection
// Time O(Len)
// Space O(Len)
var nearestPalindromic = function (n) {
  let len = n.length;
  // Possibilities
  // 1.The palindrome created by reflecting prefix.
  // 2.The palindrome created by reflecting prefix-1.
  // 3.The palindrome created by reflecting prefix+1.
  let num = Number(n);
  let candidates = new Set();
  // Lower and upper bounds (candidates smaller and greater the number)
  // Cover the lower and upper level, 999,
  console.log(len);
  candidates.add(Math.pow(10, len - 1) - 1);
  candidates.add(Math.pow(10, len) + 1);
  console.log(candidates);

  // Get half of the array
  let prefix = Number(n.substring(0, Math.round(len / 2)));
  console.log(prefix);
  // Generate palindromes by adjusting the prefix
  // decrementing one, the same number and incrementing one
  for (let i = -1; i <= 1; i++) {
    let newPrefix = (prefix + i).toString();
    let candidate = generatePalindrome(newPrefix, len % 2 === 0);
    candidates.add(Number(candidate));
  }
  console.log(candidates);

  // Find the closest element
  let closest = -1;
  for (let candidate of candidates) {
    if (candidate != num) {
      if (
        closest == -1 ||
        Math.abs(candidate - num) < Math.abs(closest - num) ||
        (Math.abs(candidate - num) == Math.abs(closest - num) &&
          candidate < closest)
      ) {
        closest = candidate;
      }
    }
  }
  return closest.toString();
};

function generatePalindrome(prefix, isEvenLength) {
  let tmp = prefix;
  if (isEvenLength) {
    return tmp + tmp.split("").reverse().join("");
  } else {
    return (
      tmp +
      tmp
        .substring(0, prefix.length - 1)
        .split("")
        .reverse()
        .join("")
    );
  }
}
