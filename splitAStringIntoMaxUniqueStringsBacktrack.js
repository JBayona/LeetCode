/*
Given a string s, return the maximum number of unique substrings that the given string can be split into.

You can split string s into any list of non-empty substrings, where the concatenation of the
substrings forms the original string. However, you must split the substrings such that all of them are unique.

A substring is a contiguous sequence of characters within a string.

Example 1:
Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.

Example 2:
Input: s = "aba"
Output: 2
Explanation: One way to split maximally is ['a', 'ba'].

Example 3:
Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.

https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings
*/

// Approach - backtrack
// Try to split the string at every possible solution and maintain
// a set of substrings seen. If not seen, add it.
// Try to maximize the number of unique strings and once all strings
// are explored, return the maximum count.
// Time (O 2^N) N to create the string and 2^N to find all possibilities
// Space O(N)
var maxUniqueSplit = function (s) {
  let set = new Set();
  let strs = new Set();
  return helper(0, s, set, strs);
};

function helper(index, s, set) {
  if (index == s.length) {
    return 0;
  }
  let max = 0;
  for (let i = index + 1; i <= s.length; i++) {
    let tmp = s.substring(index, i);
    if (!set.has(tmp)) {
      set.add(tmp);
      max = Math.max(max, 1 + helper(i, s, set));
      set.delete(tmp);
    }
  }
  return max;
}
