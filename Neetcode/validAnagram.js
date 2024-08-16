/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase
typically using all the original letters exactly once.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

https://leetcode.com/problems/valid-anagram/description/
*/

var isAnagram = function (s, t) {
  let map1 = getFrequency(s);
  let map2 = getFrequency(t);

  if (Object.keys(map1).length !== Object.keys(map2).length) {
    return false;
  }

  for (let prop in map1) {
    if (map1[prop] !== map2[prop]) {
      return false;
    }
  }
  return true;
};

function getFrequency(str) {
  let map = {};
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    if (!(c in map)) {
      map[c] = 0;
    }
    map[c]++;
  }
  return map;
}
