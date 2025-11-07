/*
Given a pattern and a string str, find if str follows the same pattern.
Here follow means a full match, such that there is a bijection between a letter
in pattern and a non-empty word in str.
Example 1:
Input: pattern = "abba", str = "dog cat cat dog"
Output: true

Example 2:
Input:pattern = "abba", str = "dog cat cat fish"
Output: false

Example 3:
Input: pattern = "aaaa", str = "dog cat cat dog"
Output: false

Example 4:
Input: pattern = "abba", str = "dog dog dog dog"
Output: false

Notes:
You may assume pattern contains only lowercase letters, and str contains lowercase letters that may be separated by a single space.

https://leetcode.com/problems/word-pattern/
*/

var wordPattern = function(pattern, str) {
    let strArray = str.split(' ');
    
    if(pattern.length  !== strArray.length) {
        return false;
    }
    
    let hash = {};
    for(let i = 0; i < pattern.length; i++) {
        let patternChar = pattern[i];
        if(!(patternChar in hash)){
            // If they pattern is already there with a different key
            // we don't expect to form the pattern
            if(Object.values(hash).includes(strArray[i])) {
                console.log('REACH HERE');
                return false;
            } else {
                hash[patternChar] = strArray[i];
            }
            console.log(hash);
        } else {
            // If the parent is different as the one we already expect
            // we return flase
            if(hash[patternChar] !== strArray[i]) {
                return false;
            }
        }
    }
    return true;
};
