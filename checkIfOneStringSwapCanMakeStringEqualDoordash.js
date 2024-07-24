/*
You are given two strings s1 and s2 of equal length. A string swap is an operation where you
choose two indices in a string (not necessarily different) and swap the characters at these indices.

Return true if it is possible to make both strings equal by performing at most one string swap on
exactly one of the strings. Otherwise, return false.

Example 1:
Input: s1 = "bank", s2 = "kanb"
Output: true
Explanation: For example, swap the first character with the last character of s2 to make "bank".

Example 2:
Input: s1 = "attack", s2 = "defend"
Output: false
Explanation: It is impossible to make them equal with one string swap.

Example 3:
Input: s1 = "kelb", s2 = "kelb"
Output: true
Explanation: The two strings are already equal, so no string swap operation is required.

https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal/description/
*/

// Time O(N)
 // Space O(26) = O(1)
 var areAlmostEqual = function(s1, s2) {
    if (s1 === s2) {
        return true;
    }

    if (s1.length !== s2.length) {
        return false;
    }

    let hash1 = getHash(s1);
    let hash2 = getHash(s2);

    let diff = 0;
    for (let i = 0; i < s1.length; i++) {
        let c = s1[i];
        if (hash1[c] !== hash2[c]) {
            return false;
        }
        if (s1[i] !== s2[i]) {
            diff++;
        }
    }
    
    return diff <= 2;
};

function getHash(str) {
    let hash = {};
    for (let i = 0; i < str.length; i++) {
        let c = str[i]
        if (!(c in hash)) {
            hash[c] = 0;
        }
        hash[c]++;
    }
    return hash;
}