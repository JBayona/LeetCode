/*
Given a string which consists of lowercase or uppercase letters, find the length
of the longest palindromes that can be built with those letters.

This is case sensitive, for example "Aa" is not considered a palindrome here.
Note:
Assume the length of given string will not exceed 1,010.

Example:
Input:
"abccccdd"
Output:
7

Explanation:
One longest palindrome that can be built is "dccaccd", whose length is 7.

https://leetcode.com/problems/longest-palindrome/description/
*/

// Time O(N)
// Space O(N) - We create a hash of the size of the input
var longestPalindrome = function(s) {
  let hash = {};
  let result = 0;
  let isOddFound = false;

  // Count frequency of letters
  for(let i = 0; i < s.length; i++) {
    let letter = s[i];
    if(letter in hash) {
        hash[letter]++;
    } else {
        hash[letter] = 1;
    }
  }
  
  // Check the longest palindrome word, scan the hash
  for(let prop in hash) {
    // If we have pairs, we can count them all
    if(hash[prop] % 2 === 0) {
        result += hash[prop];
    } else {
        // If we don't have pair numbers  we need to decrease the frequency - 1 cause
        // we know we have one odd number, for example, for 3, we count 2 and ignore 1
        // for 5, we count 4 and we ignore 1, for 7, we count 6 and we ignore 1
        result += hash[prop] - 1;
        isOddFound = true;
    }
  }
  // Is we found an odd number, we can increase the number for one more unit
  return isOddFound ? result + 1 : result;
};
