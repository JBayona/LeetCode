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
// Space O(N) assuming all chars are different
var lengthOfLongestSubstring = function (s) {
  let result = 0;
  let hash = {};
  let start = 0;
  let end = 0;

  // No string
  if (!s.length) {
    return 0;
  }

  while (end < s.length) {
    let c = s[end];
    // We already found the character
    if (c in hash) {
      let tmp = s[start];
      delete hash[tmp];
      start++;
    } else {
      // No character is found so we should look for a max
      result = Math.max(result, end - start + 1);
      hash[c] = true;
      end++;
    }
  }
  return result;
};

// Another option
// Time O(N)
var lengthOfLongestSubstring = function (s) {
  if (!s.length) {
    return 0;
  }

  let hash = {};
  let result = 0;
  // Sliding window
  let left = 0,
    right = 0;
  while (right < s.length) {
    // Get the first most character
    let c = s[right];
    // If the char is not in the hash, track it
    if (!(c in hash)) {
      hash[c] = 0;
    }
    hash[c]++;
    // Whenever we find repetitive characters
    while (hash[c] > 1) {
      let l = s[left++];
      hash[l]--;
      if (hash[l] === 0) {
        delete hash[l];
      }
    }
    // Try to maximize the results
    result = Math.max(result, right - left + 1);
    right++;
  }
  return result;
};

// Sliding window
// Time O(N)
// Space O(N) assuming all chars are different
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
