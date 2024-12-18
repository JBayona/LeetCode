/*
You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString
using the characters of s such that no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.

Return the lexicographically largest repeatLimitedString possible.
A string a is lexicographically larger than a string b if in the first position where a and b differ
string a has a letter that appears later in the alphabet than the corresponding letter in b. If the
first min(a.length, b.length) characters do not differ, then the longer string is the lexicographically
larger one.

Example 1:
Input: s = "cczazcc", repeatLimit = 3
Output: "zzcccac"
Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
The letter 'a' appears at most 1 time in a row.
The letter 'c' appears at most 3 times in a row.
The letter 'z' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times
in a row, so it is not a valid repeatLimitedString.

Example 2:
Input: s = "aababab", repeatLimit = 2
Output: "bbabaa"
Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa". 
The letter 'a' appears at most 2 times in a row.
The letter 'b' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times
in a row, so it is not a valid repeatLimitedString.

https://leetcode.com/problems/construct-string-with-repeat-limit
*/
// Time O(NLogN)
// Spacee O(NLogN)
var repeatLimitedString = function (s, repeatLimit) {
  // Get elements by character
  let heap = new PriorityQueue({
    compare: (a, b) => b.char.localeCompare(a.char),
  });

  let hash = {};
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (!(c in hash)) {
      hash[c] = 0;
    }
    hash[c]++;
  }
  // Add them to the queue
  for (let prop in hash) {
    heap.enqueue({ char: prop, count: hash[prop] });
  }
  let result = "";
  while (heap.size()) {
    // Get the greater lexicographically
    let { char, count } = heap.dequeue();
    let use = Math.min(repeatLimit, count);
    result += char.repeat(use);
    count -= use;
    if (count > 0 && !heap.isEmpty()) {
      let next = heap.dequeue();
      result += next.char;
      next.count--;
      if (next.count > 0) {
        heap.enqueue(next);
      }
      heap.enqueue({ char, count });
    }
  }
  return result;
};
