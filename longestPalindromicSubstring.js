/*
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example 1:

Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2:

Input: "cbbd"
Output: "bb"

https://leetcode.com/problems/longest-palindromic-substring/description/
*/

//O(n^2)
// DP

function longestPalindrome(str) {
  let n = str.length;   // get length of input string 

  // Let´s analyze all the chars, to be a palindrome, first char and last chart
  // should be the same, then, all the inner letters should be the same either
  // Create empty dp table
  let table = new Array(n);
  for(let i = 0; i < table.length; i++) {
      table[i] = new Array(n);
  }

  // All substrings of length 1 are palindromes 
  let maxLength = 1; 
  for (let i = 0; i < n; ++i) 
      table[i][i] = true; 

  // check for sub-string of length 2. 
  let start = 0; 
  for (let i = 0; i < n - 1; i++) { 
      if (str[i] === str[i + 1]) { 
          table[i][i + 1] = true; 
          start = i; 
          maxLength = 2; 
      } 
  } 

  // Check for lengths greater than 2. k is length 
  // of substring 
  
  for (let k = 3; k <= n; k++) { 

            // Fix the starting index 
      for (let i = 0; i < n - k + 1; i++) { 
          // Get the ending index of substring from 
          // starting index i and length k 
          let j = i + k - 1; 

          // checking for sub-string from ith index to 
          // jth index iff str.charAt(i+1) to  
          // str.charAt(j-1) is a palindrome 
          if (table[i + 1][j - 1] && str[i] === str[j]) { 
              table[i][j] = true; 

              if (k > maxLength) { 
                  start = i; 
                  maxLength = k; 
              } 
          } 
      } 
  } 
  console.log("Longest palindrome substring is:");
  console.log(str.substring(start, start + maxLength));

  return str.substring(start, start + maxLength)
  return maxLength; // return length of LPS
}




// O(n^2)
function longestPalindrome(str) {
  let result = '';

  for(let i = 0; i < str.length; i++) {
    for(let j = 1; j <= str.length; j++) {
      let substr = str.substr(i,j)
      if(substr.length >= result.length && isPalindrome(substr)) {
        result = substr;
      }
    }
  }

  return result;
}

function isPalindrome(str) {
  return str.split('').reverse().join('') === str;
}

// str = "babad";
// str = "cbbd";
// str = "a";
str = "abcdbbfcba";
console.log(longestPalindrome(str));