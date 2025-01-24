/*
Given two strings s1 and s2, write a function to return true if s2 contains
the permutation of s1. In other words, one of the first string's permutations is
the substring of the second string.

Example 1:
Input: s1 = "ab" s2 = "eidbaooo"
Output: True
Explanation: s2 contains one permutation of s1 ("ba").

Example 2:
Input:s1= "ab" s2 = "eidboaoo"
Output: False

https://leetcode.com/problems/permutation-in-string/
*/

// Time O(N)
// Space O(1)
var checkInclusion = function(s1, s2) {
    let map = {};
    // Count the frequency of S1 to check the window
    for (let i = 0; i < s1.length; i++) {
        let c = s1[i];
        if (!(c in map)) {
            map[c] = 0;
        }
        map[c]++;
    }
    
    let start = 0;
    let end = 0;
    // These are the number we need to match
    // we are interested on the number of keys
    let count = Object.keys(map).length;
    while (end < s2.length) {
        let c = s2[end];
        if (c in map) {
            map[c]--;
            // If we have removed all ocurrence, keep the key
            // but decreased our number to match
            if(map[c] === 0) {
                count--;
            }
        }

        // The window has the same size as s1, we need to
        // move the left pointer
        if (end - start + 1 === s1.length) {
            // If we "remove" all the keys, we have found
            // a permutation
            if (count === 0) {
                return true;
            }

            // Move the window
            let l = s2[start];
            start++;
            // If the new left char is within left, count it and
            // add it to the map
            if (l in map) {
                // Increase the ocurrence as we have increased the
                // key to match
                if (map[l] === 0) {
                    count++;
                }
                map[l]++;
            }
        }
        end++;
    }
    return false;
};

// Another option
// Time O(N)
 // Space O(1)
 var checkInclusion = function(s1, s2) {
    let map = {};
    // Count the frequency of S1 to check the window
    for (let i = 0; i < s1.length; i++) {
        let c = s1[i];
        if (!(c in map)) {
            map[c] = 0;
        }
        map[c]++;
    }
    
    let start = 0;
    let end = 0;
    // These are the number we need to match
    // we are interested on the number of keys
    let count = Object.keys(map).length;
    while (end < s2.length) {
        let c = s2[end];
        if (c in map) {
            map[c]--;
            // If we have removed all ocurrence, keep the key
            // but decreased our number to match
            if(map[c] === 0) {
                count--;
            }
        }
        
        while (count === 0) {
            if (end - start + 1 === s1.length) {
                return true;
            }
            // Move the window
            let l = s2[start];
            start++;
            // If the new left char is within left, count it and
            // add it to the map
            if (l in map) {
                // Increase the ocurrence as we have increased the
                // key to match
                if (map[l] === 0) {
                    count++;
                }
                map[l]++;
            }
        }
        end++;
    }
    return false;
};
