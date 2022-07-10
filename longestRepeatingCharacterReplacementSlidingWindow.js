/*
You are given a string s and an integer k. You can choose any character of the string and change it
to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example 1:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

Example 2:
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.

https://leetcode.com/problems/longest-repeating-character-replacement/
*/

var characterReplacement = function (s, k) {
  let start = 0;
  let maxCount = 0;
  let charCount = {};
  let maxLongest = 0;

  for (let i = 0; i < s.length; i++) {
    let currentChar = s[i];
    if (currentChar in charCount) {
      charCount[currentChar]++;
    } else {
      charCount[currentChar] = 1;
    }

    // Max of letters with no replacement
    maxCount = Math.max(maxCount, charCount[currentChar]);

    // Check if we have exceeded the k changes in the current windoww
    if (i - start + 1 - maxCount > k) {
      // Get the element of our start window
      let leftChar = s[start];
      // Decrease as the count has changed as we'll be moving the start window one step
      charCount[leftChar]--;
      start++;
    }

    maxLongest = Math.max(maxLongest, i - start + 1);
  }
  return maxLongest;
};
