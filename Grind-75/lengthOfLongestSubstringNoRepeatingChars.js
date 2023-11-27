/*
Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Example 4:
Input: s = ""
Output: 0

https://leetcode.com/problems/longest-substring-without-repeating-characters/
*/

// Sliding window
// Time O(N)
// Space O(N)
var lengthOfLongestSubstring = function (s) {
  if (!s.length) {
    return 0;
  }

  let start = 0;
  let end = 0;
  let result = 0;
  let hash = {};
  // Sliding Window
  while (end < s.length) {
    // Get the most right character
    let c = s[end];
    // Record the occurrence in the map
    if (!(c in hash)) {
      hash[c] = 0;
    }
    hash[c]++;
    // Whenever we find repetitive characters
    while (hash[c] > 1) {
      let l = s[start++];
      hash[l]--;
      if (hash[l] === 0) {
        delete hash[l];
      }
    }
    // Try to maximize the results
    result = Math.max(result, end - start + 1);
    end++;
  }
  return result;
};

// Sliding window
// Time O(N)
// Space O(N)
var lengthOfLongestSubstring = function (s) {
  let start = 0;
  let end = 0;
  let max = 0;
  let seen = {};
  while (end < s.length) {
    let c = s[end];
    // If we already see the character
    if (c in seen) {
      // Remove it and move the left window
      let left = s[start];
      delete seen[left];
      start++;
    } else {
      // Move right window
      seen[c] = 1;
      if (end - start + 1 > max) {
        max = end - start + 1;
      }
      end++;
    }
  }
  return max;
};

// Option 1
// Sliding window
// Time O(N)
// Space O(N)
var lengthOfLongestSubstring = function (s) {
  let start = 0;
  let end = 0;
  let max = 0;
  let seen = {};
  while (end < s.length) {
    let c = s[end];
    // If we already see the character
    if (c in seen) {
      // Remove it and move the left window
      while (seen[c] > 0) {
        let left = s[start];
        delete seen[left];
        start++;
      }
    } else {
      // Move right window
      seen[c] = 1;
      if (end - start + 1 > max) {
        max = end - start + 1;
      }
      end++;
    }
  }
  return max;
};

// Option 2

// Sliding window
// Time O(N)
// Space O(N)
var lengthOfLongestSubstring = function (s) {
  let start = 0;
  let end = 0;
  let map = {};
  let result = 0;
  let counter = 0;

  while (end < s.length) {
    let current = s[end];
    if (current in map) {
      map[current]++;
      // If we find a repeating character, count how many repeating
      // characters we have seen
      if (map[current] > 1) {
        counter++;
      }
    } else {
      map[current] = 1;
    }

    // Move our window as we should not have repeating characters
    while (counter > 0) {
      let head = s[start];
      if (map[head] > 1) {
        counter--;
      }
      map[head]--;
      start++;
    }
    end++;

    result = Math.max(result, end - start);
  }
  return result;
};
