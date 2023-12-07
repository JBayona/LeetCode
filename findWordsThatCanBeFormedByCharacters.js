/*
You are given an array of strings words and a string chars.

A string is good if it can be formed by characters from chars (each character can only be used once).

Return the sum of lengths of all good strings in words.

Example 1:

Input: words = ["cat","bt","hat","tree"], chars = "atach"
Output: 6
Explanation: 
The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.
Example 2:

Input: words = ["hello","world","leetcode"], chars = "welldonehoneyr"
Output: 10
Explanation: 
The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.

https://leetcode.com/problems/find-words-that-can-be-formed-by-characters/
*/

// Time O(N * M) Where n is the number of words and M is the max length of the word
// Space O(N + M)
// Option 1
var countCharacters = function(words, chars) {
  let map = getHash(chars);
  let result = 0;
  for(let word of words) {
    let mapB = getHash(word);
    if(canForm(mapB, map)) {
      result += word.length;
    }
  }
  return result;
};

function getHash(str) {
  let hash = {};
  for(let i = 0; i < str.length; i++) {
    let elem = str[i];
    if(elem in hash) {
      hash[elem]++;
    } else {
      hash[elem] = 1;
    }
  }
  return hash;
}

function canForm(hash1, hash2) {
  for(let prop in hash1) {
    if(!(prop in hash2) || hash2[prop] < hash1[prop]) {
      return false;
    }
  }
  return true;
}