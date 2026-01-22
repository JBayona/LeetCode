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
// Time O(N)
// Space O(N)
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    let map = getFrequency(s);
    for (let i = 0; i < t.length; t++) {
        let c = t[i];
        // Less or equal than zero as this will denote there
        // are more elements not contained on the map as we already
        // have a validation that length for both should be equal
        if (!(c in map) || map[c] <= 0) {
            return false;
        }
        map[c]--;
    }
    return true;
};

function getFrequency(s) {
    let map = {};
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (!(c in map)) {
            map[c] = 0;
        }
        map[c]++;
    }
    return map;
}

// Time O(N)
// Space O(N)
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }

  let counter = getFrequency(s);

  for (let i = 0; i < t.length; i++) {
    let c = t[i];
    if (!(c in counter) || counter[c] === 0) {
      return false;
    }
    counter[c]--;
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
