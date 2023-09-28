/*
Find the length of the longest sub-string containing all repeating letters you can get after
performing the above operations.

Note:
Both the string's length and k will not exceed 104.
Example 1:
Input:
s = "ABAB", k = 2
Output:
4
Explanation:
Replace the two 'A's with two 'B's or vice versa.
 
Example 2:
Input:
s = "AABABBA", k = 1
Output:
4
Explanation:
Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
 
 https://leetcode.com/problems/longest-repeating-character-replacement/
*/

// Option 1
var characterReplacement = function (s, k) {
  let hash = {};
  let mostFreqChar = 0;
  let left = 0;
  let right = 0;
  let result = 0;

  while (right < s.length) {
    let c = s[right];
    if (!(c in hash)) {
      hash[c] = 0;
    }
    hash[c]++;
    // Get the most frequent char from the current window
    mostFreqChar = Math.max(mostFreqChar, hash[c]);
    // How many letters we need to change
    let lettersToChange = right - left + 1 - mostFreqChar;
    // if this value is greater, it means the window is not valid
    // as we need more letter than "k" to change.
    if (lettersToChange > k) {
      let l = s[left];
      hash[l]--;
      left++;
    }
    // Try to maxime el result
    result = Math.max(result, right - left + 1);
    right++;
  }
  return result;
};

// Option 2
// Sliding Window
var characterReplacement = function (s, k) {
  let start = 0;
  let maxCount = 0;
  let charCount = {};
  let maxLongest = 0;
  for (let i = 0; i < s.length; i++) {
    let currentChar = s[i];

    if (currentChar in charCount) {
      charCount[currentChar]++;
    } else {
      charCount[currentChar] = 1;
    }

    // Max of letters with no replacement
    maxCount = Math.max(maxCount, charCount[currentChar]);

    // Check if we have exceeded the k changes in the current windoww
    if (i - start + 1 - maxCount > k) {
      // Get the element of our start window
      let leftChar = s[start];
      // Decrease as the count has changed as we'll be moving the start window one step
      charCount[leftChar]--;
      start++;
    }

    maxLongest = Math.max(maxLongest, i - start + 1);
  }
  return maxLongest;
};
