/*
You are given an array of strings words. Each element of words consists of
two lowercase English letters.
Create the longest possible palindrome by selecting some elements from words
and concatenating them in any order.
Each element can be selected at most once.

Return the length of the longest palindrome that you can create. If it is impossible
to create any palindrome, return 0.
A palindrome is a string that reads the same forward and backward.

Example 1:
Input: words = ["lc","cl","gg"]
Output: 6
Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
Note that "clgglc" is another longest palindrome that can be created.

Example 2:
Input: words = ["ab","ty","yt","lc","cl","ab"]
Output: 8
Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
Note that "lcyttycl" is another longest palindrome that can be created.

Example 3:
Input: words = ["cc","ll","xx"]
Output: 2
Explanation: One longest palindrome is "cc", of length 2.
Note that "ll" is another longest palindrome that can be created, and so is "xx".

https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words/
*/
var longestPalindrome = function (words) {
  let hash = {};
  for (let word of words) {
    if (!(word in hash)) {
      hash[word] = 0;
    }
    hash[word]++;
  }

  let result = 0;
  for (let prop in hash) {
    let reverse = prop.split("").reverse().join("");
    if (reverse in hash) {
      // Check for strings like aa, bb, cc
      if (prop === reverse) {
        if (hash[prop] % 2 === 0) {
          result += hash[prop] * 2;
          hash[prop] = 0;
        } else {
          // It´s odd so we take even numbers
          // If we don't have pair numbers  we need to decrease the frequency - 1 cause
          // we know we have one odd number, for example, for 3, we count 2 and ignore 1
          // for 5, we count 4 and we ignore 1, for 7, we count 6 and we ignore 1
          result += (hash[prop] - 1) * 2;
          // All pairs are exhausted
          hash[prop] = 1;
        }
      } else {
        // Normal string
        let min = Math.min(hash[prop], hash[reverse]);
        result += min * 4;
        hash[prop] -= min;
        hash[reverse] -= min;
      }
    }
  }
  // Check for those in the middle of the sorted string, e.g aa, bb
  for (let prop in hash) {
    if (prop[0] === prop[1] && hash[prop] > 0) {
      result += 2;
      // Only one left can be added
      break;
    }
  }
  return result;
};

// input = ["lc", "cl", "gg"]; // 6
// input = ["ab","ty","yt","lc","cl","ab"]; // 8
// input = ["cc","ll","xx"]; // 2
input = ["dd","aa","bb","dd","aa","dd","bb","dd","aa","cc","bb","cc","dd","cc"];
console.log(longestPalindrome(input));
