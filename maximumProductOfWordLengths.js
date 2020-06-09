/*
Given a string array words, find the maximum value of length(word[i]) * length(word[j]) where the two words
do not share common letters. You may assume that each word will contain only lower case letters. If no such two words exist, return 0.

Example 1:

Input: ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16 
Explanation: The two words can be "abcw", "xtfn".
Example 2:

Input: ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4 
Explanation: The two words can be "ab", "cd".
Example 3:

Input: ["a","aa","aaa","aaaa"]
Output: 0 
Explanation: No such pair of words.

https://leetcode.com/problems/maximum-product-of-word-lengths/
*/

// Time O(N^2)
// Space O(N)
var maxProduct = function(words) {
    let max = 0;

    for(let i = 0; i < words.length; i++) {
        // Add chars into the map
        let word = words[i];
        let map = {};
        for(let c of word) {
            map[c] = true;
        }
        for(let j = i + 1; j < words.length; j++) {
            let flag = false;
            let secondWord = words[j];
            for(let c of secondWord) {
                if(c in map) {
                    flag = true;
                    break;
                }
            }
            if(!flag) {
                max = Math.max(max, word.length * secondWord.length);
            }
        }
    }
    return max;
};