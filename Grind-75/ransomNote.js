/*
Given an arbitrary ransom note string and another string containing letters from all the magazines, write a function that will return true if the ransom note can be constructed from the magazines ; otherwise, it will return false.

Each letter in the magazine string can only be used once in your ransom note.

Note:
You may assume that both strings contain only lowercase letters.

canConstruct("a", "b") -> false
canConstruct("aa", "ab") -> false
canConstruct("aa", "aab") -> true

https://leetcode.com/problems/ransom-note/
*/

// Option 1
var canConstruct = function (ransomNote, magazine) {
  let hash = {};
  for (let i = 0; i < magazine.length; i++) {
    if (magazine[i] in hash) {
      hash[magazine[i]]++;
    } else {
      hash[magazine[i]] = 1;
    }
  }

  for (let i = 0; i < ransomNote.length; i++) {
    let elem = ransomNote[i];
    if (elem in hash && hash[elem] > 0) {
      hash[elem]--;
    } else {
      return false;
    }
  }
  return true;
};

// Option 2
var canConstruct = function (ransomNote, magazine) {
  let ransomMap = getMap(ransomNote);
  let magazineMap = getMap(magazine);

  // Verify if it's possible to build the string
  for (let c in ransomMap) {
    // If
    if (!(c in magazineMap) || !(magazineMap[c] >= ransomMap[c])) {
      return false;
    }
  }
  return true;
};

function getMap(str) {
  let hash = {};
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    if (!(c in hash)) {
      hash[c] = 0;
    }
    hash[c]++;
  }
  return hash;
}
