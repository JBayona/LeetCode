/*
Given two strings s and goal, return true if you can swap two letters in s so the result
is equal to goal, otherwise, return false.

Swapping letters is defined as taking two indices i and j (0-indexed) such that i != j and
swapping the characters at s[i] and s[j].

For example, swapping at indices 0 and 2 in "abcd" results in "cbad".
Example 1:
Input: s = "ab", goal = "ba"
Output: true
Explanation: You can swap s[0] = 'a' and s[1] = 'b' to get "ba", which is equal to goal.

Example 2:
Input: s = "ab", goal = "ab"
Output: false
Explanation: The only letters you can swap are s[0] = 'a' and s[1] = 'b', which results in "ba" != goal.

Example 3:
Input: s = "aa", goal = "aa"
Output: true
Explanation: You can swap s[0] = 'a' and s[1] = 'a' to get "aa", which is equal to goal.

https://leetcode.com/problems/buddy-strings/description 
*/
// Time O(N)
// Space O(1)
var buddyStrings = function (s, goal) {
  if (s.length != goal.length) {
    return false;
  }
  // The swap can be between two elements only
  let diff = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      diff.push(i);
    }
    if (diff.length > 2) {
      return false;
    }
  }

  // Cover cases where letters are the same i.e aa
  if (!diff.length) {
    return s.length !== new Set(s).size;
  }
  // Check if the swap is correct and we can make it
  let [i, j] = diff;
  return s[i] === goal[j] && goal[i] === s[j];
};
