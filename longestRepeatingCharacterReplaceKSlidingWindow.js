/*
You are given a string s and an integer k. You can choose any character of the string and change it
to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter
you can get after performing the above operations.

Example 1:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

Example 2:
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.

https://leetcode.com/problems/longest-repeating-character-replacement/
*/

// Option 1
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    let start = 0;
    let end = 0;
    let mostFreqChar = 0;
    let result = 0;
    let hash = {};
    while (end < s.length) {
        let c = s[end];
        if (!(c in hash)) {
            hash[c] = 0;
        }
        hash[c]++;
        // Get the most frequent char
        mostFreqChar = Math.max(mostFreqChar, hash[c]);
        // Check if the window is not eligible as we have exceeded the number of chars to replace
        // We have exceeded the letters we can change
        while (end - start + 1 - (mostFreqChar) > k) {
            let left = s[start];
            hash[left]--;
            if (hash[left] === 0) {
                delete hash[left];
            }
            start++;
        }
        result = Math.max(result, end - start + 1);
        end++;
    }
    return result;
};
