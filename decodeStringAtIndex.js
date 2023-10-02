/*
You are given an encoded string s. To decode the string to a tape, the encoded string is
read one character at a time and the following steps are taken:

If the character read is a letter, that letter is written onto the tape.
If the character read is a digit d, the entire current tape is repeatedly written
d - 1 more times in total.
Given an integer k, return the kth letter (1-indexed) in the decoded string.

Example 1:
Input: s = "leet2code3", k = 10
Output: "o"
Explanation: The decoded string is "leetleetcodeleetleetcodeleetleetcode".
The 10th letter in the string is "o".

Example 2:
Input: s = "ha22", k = 5
Output: "h"
Explanation: The decoded string is "hahahaha".
The 5th letter is "h".

Example 3:
Input: s = "a2345678999999999999999", k = 1
Output: "a"
Explanation: The decoded string is "a" repeated 8301530446056247680 times.
The 1st letter is "a".

https://leetcode.com/problems/decoded-string-at-index/description/?envType=daily-question&envId=2023-09-27
*/

// Time O(N)
// Space O(1)
var decodeAtIndex = function (s, k) {
  let decodeSize = 0;
  let n = s.length;
  // Calculate the size of the decoded string
  let regex = new RegExp(/^\d+$/);
  for (let i = 0; i < n; i++) {
    let c = s[i];
    if (regex.test(c)) {
      decodeSize *= Number(c);
    } else {
      decodeSize++;
    }
  }

  // Traverse the string in reverse order, we don´t need to build
  // the string, we simulate the decoding but it's not needed
  for (let i = n - 1; i >= 0; i--) {
    let c = s[i];
    k %= Math.round(decodeSize);

    // If k becomes 0 and it's a letter, we found the result
    if (k === 0 && !regex.test(c)) {
      return c;
    }

    // If it's a digit, we need to adjust the size to
    // simullate the decoding
    if (regex.test(c)) {
      decodeSize /= Math.round(Number(c));
    } else {
      decodeSize--;
    }
  }
  return "";
};
