/*
You are given an array of strings arr. A string s is formed by the concatenation of a subsequence of
arr that has unique characters.

Return the maximum possible length of s.
A subsequence is an array that can be derived from another array by deleting some or no
elements without changing the order of the remaining elements.

Example 1:
Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All the valid concatenations are:
- ""
- "un"
- "iq"
- "ue"
- "uniq" ("un" + "iq")
- "ique" ("iq" + "ue")
Maximum length is 4.

Example 2:
Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible longest valid concatenations are "chaers" ("cha" + "ers") and "acters" ("act" + "ers").

Example 3:
Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26
Explanation: The only string in arr has all 26 characters.

https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/description/
*/

var maxLength = function (arr) {
  let maxLen = 0;
  let listOfStrs = [];
  // Filter the strings that has unique characters
  arr = arr.filter(isUnique);
  let memo = {};
  maxLen = dfs(arr, "", 0, maxLen, memo);

  return maxLen;
};

function dfs(arr, path, idx, maxLen, memo) {
  // If we already compute that path with length, we are goof
  if (memo[path]) {
    return memo[path];
  }

  // Check if the path has unique characters
  let pathIsUnique = isUnique(path);
  if (pathIsUnique) {
    maxLen = Math.max(path.length, maxLen);
  }

  // Base case, we compute the the last elements
  if (idx === arr.length || !pathIsUnique) {
    memo[path] = maxLen;
    return maxLen;
  }

  for (let i = idx; i < arr.length; i++) {
    maxLen = dfs(arr, path + arr[i], i + 1, maxLen, memo);
  }
  memo[path] = maxLen;
  return maxLen;
}

const isUnique = (str) => {
  let set = new Set([...str]);
  return str.length === set.size;
};
