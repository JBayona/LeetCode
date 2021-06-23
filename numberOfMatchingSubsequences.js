/*
Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.

A subsequence of a string is a new string generated from the original string with some
characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
Example 1:
Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
Explanation: There are three strings in words that are a subsequence of s: "a", "acd", "ace".

Example 2:
Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
Output: 2

https://leetcode.com/problems/number-of-matching-subsequences/
*/

// Option 1
var numMatchingSubseq = function(s, words) {
    let result = 0;
    for(let i = 0; i < words.length; i++) {
        if(isSubsequence(words[i], s)) {
            result++;
        }
    }
    return result;
};

// Time O(N) Where N is the length of T
// Space O(1)
// Check if "s" is a subsequence of "t"
var isSubsequence = function(s, t) {
    let index = 0;
    for(let i = 0; i < t.length; i++) {
        if(index < s.length && t[i] === s[index]) {
            index++;
        }
    }
    if(index === s.length) {
        return true;
    }
    return false;
}

// Option 2
var numMatchingSubseq = function(s, words) {
    let result = 0;
    for(let word of words) {
        let start = 0;
        let found = true;
        for(c of word) {
            let location = find(c, s, start);
            // Not found
            if(location < 0) {
                found = false;
                break;
            }
            start = location + 1;
        }
        if(found) {
            result++;
        }
    }
    return result;
};

function find(subsequence, str, start) {
    let init = start || 0;
    let s = str.slice(init);
    return s.search(subsequence);
}