/*
A pangram is a sentence where every letter of the English alphabet appears at least once.

Given a string sentence containing only lowercase English letters, return true if sentence is
a pangram, or false otherwise.

Example 1:
Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
Output: true
Explanation: sentence contains at least one of every letter of the English alphabet.

Example 2:
Input: sentence = "leetcode"
Output: false

https://leetcode.com/problems/check-if-the-sentence-is-pangram/
*/

// Option 1
var checkIfPangram = function(sentence) {
    let alphabet = new Array(26).fill(false);
    let count = 0;
    for(let i = 0; i < sentence.length; i++) {
        let current = sentence[i];
        if(!alphabet[current.charCodeAt(0) - 97]) {
            count++;
        }
        alphabet[current.charCodeAt(0) - 97] = true;
    }
    
    return count === 26 ? true : false;
};

// Option 2
var checkIfPangram = function(sentence) {
    let set = new Set([...sentence]);
    return set.size === 26 ? true : false;
};