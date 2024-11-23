/*
Given a pattern and a string s, return true if s matches the pattern.

A string s matches a pattern if there is some bijective mapping of single characters
to non-empty strings such that if each character in pattern is replaced by the string it maps to,
then the resulting string is s. A bijective mapping means that no two characters map to
the same string, and no character maps to two different strings.

Example 1:
Input: pattern = "abab", s = "redblueredblue"
Output: true
Explanation: One possible mapping is as follows:
'a' -> "red"
'b' -> "blue"

Example 2:
Input: pattern = "aaaa", s = "asdasdasdasd"
Output: true
Explanation: One possible mapping is as follows:
'a' -> "asd"

Example 3:
Input: pattern = "aabb", s = "xyzabcxzyabc"
Output: false

https://leetcode.com/problems/word-pattern-ii/description/
*/
/*
We can solve this problem using backtracking, we just have to keep trying 
to use a character in the pattern to match different length of substrings in 
the input string, keep trying till we go through the input string and the pattern.

For example, input string is "redblueredblue", and the pattern is "abab", first
let's use 'a' to match "r", 'b' to match "e", then we find that 'a' does not
match "d", so we do backtracking, use 'b' to match "ed", so on and so forth ...

When we do the recursion, if the pattern character exists in the hash map
already, we just have to see if we can use it to match the same length of the string.
For example, let's say we have the following map:

'a': "red"
'b': "blue"

now when we see 'a' again, we know that it should match "red", the length is 3, then
let's see if str[i ... i+3] matches 'a', where i is the current index of the
input string. Thanks to StefanPochmann's suggestion, in Java we can elegantly
use str.startsWith(s, i) to do the check.
*/
// Time O(M * N)
// Space O(N)
var wordPatternMatch = function (pattern, str) {
  let hash = {};
  let set = new Set();
  return isMatch(str, 0, pattern, 0, hash, set);
};

function isMatch(str, index, pattern, index2, hash, set) {
  // Base case
  if (index === str.length && index2 === pattern.length) {
    return true;
  }

  if (index === str.length || index2 === pattern.length) {
    return false;
  }

  // Get the current pattern
  let c = pattern[index2];
  // If the pattern character exists
  if (c in hash) {
    let s = hash[c];
    // Then check if we can use it to match str[i...i+s.length()]
    if (!str.startsWith(s, index)) {
      return false;
    }

    // if it can match, great, continue to match the rest
    return isMatch(str, index + s.length, pattern, index2 + 1, hash, set);
  }

  // The pattern character does not exist in the map
  for (let i = index; i < str.length; i++) {
    let p = str.substring(index, i + 1);

    if (set.has(p)) {
      continue;
    }
    // Create or update it
    hash[c] = p;
    set.add(p);

    // Continue to match the rest
    if (isMatch(str, i + 1, pattern, index2 + 1, hash, set)) {
      return true;
    }

    //Backtracking
    delete hash[c];
    set.delete(p);
  }
  // We tried but still no luck
  return false;
}
