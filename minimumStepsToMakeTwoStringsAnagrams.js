/*
You are given two strings of the same length s and t. In one step you can choose any character of t and replace it with another character.

Return the minimum number of steps to make t an anagram of s.

An Anagram of a string is a string that contains the same characters with a different (or the same) ordering.

Example 1:
Input: s = "bab", t = "aba"
Output: 1
Explanation: Replace the first 'a' in t with b, t = "bba" which is anagram of s.

Example 2:
Input: s = "leetcode", t = "practice"
Output: 5
Explanation: Replace 'p', 'r', 'a', 'i' and 'c' from t with proper characters to make t anagram of s.

Example 3:
Input: s = "anagram", t = "mangaar"
Output: 0
Explanation: "anagram" and "mangaar" are anagrams. 

https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/
*/

// Time O(N)
var minSteps = function(s, t) {
  let hash1 = getFreq(s);
  let hash2 = getFreq(t);
  
  let count = 0;
  // Here we'll replace the character, we don't know which one
  // We only consider the replacement
  for(let prop in hash1) {
      if(prop in hash2 && hash1[prop] < hash2[prop]) {
          count += Math.abs(hash2[prop] - hash1[prop])
      }
  }
  // Replace proper characters for those not found
  for(let prop in hash2) {
      if(!(prop in hash1)) {
          count += hash2[prop];
      }
  }
  return count;
};

function getFreq(s) {
  let hash = {};
  for(i = 0; i < s.length; i++) {
      let c = s[i];
      if(!(c in hash)) {
          hash[c] = 0;
      }
      hash[c]++;
  }
  return hash;
}

// One pass Option 2
var minSteps = function(s, t) {
  let freqCount = new Array(26).fill(0);
  // Assuming both lengths are the same
  for(let i = 0; i < s.length; i++) {
      freqCount[s[i].charCodeAt() - 97]++;
      freqCount[t[i].charCodeAt() - 97]--;
  }
  let count = 0;
  // console.log(freqCount);
  for(let fre of freqCount){
      count+=Math.abs(fre);
  }
  return count/2;
}