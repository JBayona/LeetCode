/*
Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.

Strings consists of lowercase English letters only and the length of both strings s and p will not be
larger than 20,100.

The order of output does not matter.

Example 1:
Input:
s: "cbaebabacd" p: "abc"
Output:
[0, 6]

Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".

Example 2:
Input:
s: "abab" p: "ab"

Output:
[0, 1, 2]

Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".

https://leetcode.com/problems/find-all-anagrams-in-a-string/description/

Find All Anagrams in a String - LeetCode
Level up your coding skills and quickly land a job. This is the best place to expand your knowledge and get prepared for your next interview.
leetcode.com
*/

// Sliding Window
// Time O(N)
// Space O(N)
// Option 1
var findAnagrams = function (s, p) {
  if (p.length > s.length) {
    return [];
  }

  let freqS = getFrequency(s, p.length);
  let freqP = getFrequency(p, p.length);

  let result = [];
  // First window
  if (equals(freqS, freqP)) {
    result.push(0);
  }

  let init = p.length;
  for (let i = init; i < s.length; i++) {
    // Move window
    let start = i - p.length;
    let startIndex = s[start].charCodeAt(0) - 97;
    // Decrement window
    freqS[startIndex]--;
    // Increment window
    let c = s[i];
    let endIndex = c.charCodeAt(0) - 97;
    freqS[endIndex]++;
    if (equals(freqS, freqP)) {
      result.push(i - p.length + 1);
    }
  }
  return result;
};

function getFrequency(str, len) {
  // a = 0, b = 1, c = 2, d = 3 ,...
  let array = new Array(26).fill(0);
  for (let i = 0; i < len; i++) {
    let c = str[i];
    array[c.charCodeAt(0) - 97]++; // a = 97
  }
  return array;
}

function equals(a, b) {
  return a.join("") === b.join("");
}

// Option 2
var findAnagrams = function (s, p) {
  if (s.length < p.length) {
    return [];
  }

  // This map won´t change
  let mapP = {};
  for (let c of p) {
    if (!(c in mapP)) {
      mapP[c] = 0;
    }
    mapP[c]++;
  }

  // Initial map of S
  let mapS = {};
  for (let i = 0; i < p.length; i++) {
    let c = s[i];
    if (!(c in mapS)) {
      mapS[c] = 0;
    }
    mapS[c]++;
  }

  let result = [];
  let i = p.length;
  while (i < s.length) {
    if (isMapEquals(mapS, mapP)) {
      result.push(i - p.length);
    }

    // Expand the window
    let c = s[i];
    // Add the new char coming into the window
    if (c in mapS) {
      mapS[c]++;
    } else {
      mapS[c] = 1;
    }

    // Remove the left char of the window
    c = s[i - p.length];
    if (mapS[c] === 1) {
      delete mapS[c];
    } else if (mapS[c] > 1) {
      mapS[c]--;
    }
    i++;
  }
  // Last window
  if (isMapEquals(mapS, mapP)) {
    result.push(i - p.length);
  }
  return result;
};

function isMapEquals(map1, map2) {
  if (Object.keys(map1).length !== Object.keys(map2).length) {
    return false;
  }

  for (let prop in map1) {
    if (!(prop in map2) || map1[prop] !== map2[prop]) {
      return false;
    }
  }
  return true;
}
