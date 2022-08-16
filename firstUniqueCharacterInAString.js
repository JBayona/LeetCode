/*
Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

Example 1:
Input: s = "leetcode"
Output: 0

Example 2:
Input: s = "loveleetcode"
Output: 2

Example 3:
Input: s = "aabb"
Output: -1

https://leetcode.com/problems/first-unique-character-in-a-string/
*/

// Option 1
// Time O(N)
// Space O(1)
var firstUniqChar = function(s) {
    if(!s) {
        return -1;
    }
    
    // a = 0, b = 1,... z = 26.
    let freq = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        let index = s[i].charCodeAt(0); // a = 97;
        freq[index - 97]++;
    }
    
    for (let i = 0; i < s.length; i++) {
        // Return the first that has 1 as count
        if (freq[s[i].charCodeAt(0) - 97] === 1) {
            return i;
        }
    }
    return -1;
};