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

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
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