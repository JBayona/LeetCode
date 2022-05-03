/*
The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.

For example, "ACGAATTCCG" is a DNA sequence.
When studying DNA, it is useful to identify repeated sequences within the DNA.

Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur
more than once in a DNA molecule. You may return the answer in any order.

Example 1:
Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]

Example 2:
Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]

https://leetcode.com/problems/repeated-dna-sequences/
*/

// Sliding Window
var findRepeatedDnaSequences = function (s) {
  let left = 0;
  let right = 0;
  let hash = {};
  let result = [];
  while (right < s.length) {
    if (right - left + 1 === 10) {
      let tmp = s.substring(left, right + 1);
      if (!(tmp in hash)) {
        hash[tmp] = 0;
      }
      hash[tmp]++;
      left++;
    }
    right++;
  }

  // Form result
  for (let prop in hash) {
    if (hash[prop] > 1) {
      result.push(prop);
    }
  }
  return result;
};

// Option 2
/* var findRepeatedDnaSequences = function(s) {
    const map = new Map();
    const set = [];
    for(let i = 0;  i + 10 - 1 < s.length; i++) {
        const substr = s.substring(i, i + 10);
        if(map.has(substr)) {
            if(map.get(substr) === 1) {
                set.push(substr);
            }
        } else {
            map.set(substr, 0);
        }
        map.set(substr, map.get(substr) + 1);
    }
    console.log(map);
    return set;
};*/
