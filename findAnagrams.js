/*
Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.

Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.

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
var findAnagrams = function(s, p) {
  // p is greater then s
  if(s.length < p.length) {
      return [];
  }
  
  let mapS = {};
  // We want a window of size p
  for(let i = 0; i < p.length; i++) {
      let elem = s[i];
      if(elem in mapS) {
          mapS[elem]++;
      } else {
          mapS[elem] = 1;
      }
  }
  
  // This won't change
  let mapP = {}
  for(let i = 0; i < p.length; i++) {
      let elem = p[i];
      if(elem in mapP) {
          mapP[elem]++;
      } else {
          mapP[elem] = 1;
      }
  }
  
  let result = [];
  for(let i = p.length; i < s.length; i++) {
      if(isMapEquals(mapS, mapP)) {
          result.push(i - p.length);
      }
      
      // Expand the window
      let c = s[i];
      // Add the new char coming into the window
      if(c in mapS) {
          mapS[c]++;
      } else {
          mapS[c] = 1;
      }
      
      // Remove the left char of the window
      c = s[i - p.length];
      if(mapS[c] === 1) {
          delete mapS[c];
      } else if(mapS[c] > 1) {
          mapS[c]--;
      }
  }
  
  // The last window
  if(isMapEquals(mapS, mapP)) {
      result.push(s.length - p.length);
  }
  return result;
};

function isMapEquals(map1, map2) {
  if(Object.keys(map1).length !== Object.keys(map2).length) {
      return false;
  }
  
  for(let prop in map1) {
      if(!(prop in map2) || map1[prop] !== map2[prop]) {
          return false;
      }
  }
  return true;
}

/*
var findAnagrams = function(s, p) {
  
  let pCount = countWord(p);
  let result = [];
  
  for(let i = 0; i < s.length; i++) {
      let tmp = s.slice(i, i + p.length);
      let sCount = countWord(tmp);
      if(pCount.toString() === sCount.toString()) {
          result.push(i);
      }
  }
  
  return result;
};
  
function countWord(word) {
  
  let count = new Array(26).fill(0);
  for(let i = 0; i < word.length; i++) {
      let index = word[i].charCodeAt(0) - 'a'.charCodeAt(0);
      count[index]++;
  }
  
  return count;
}
*/