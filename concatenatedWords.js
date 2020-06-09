/*
Given a list of words (without duplicates), please write a program that returns all concatenated words
in the given list of words.
A concatenated word is defined as a string that is comprised entirely of at least two shorter
words in the given array.

Example:
Input: ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]

Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]

Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats"; 
 "dogcatsdog" can be concatenated by "dog", "cats" and "dog"; 
"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".

https://leetcode.com/problems/concatenated-words/
*/

var findAllConcatenatedWordsInADict = function(words) {
    let set = new Set(words);
    let result = [];
    
    for(let word of words) {
        let isCon = dfs(word, 0, set);
        if(isCon) {
            result.push(word);
        }
    }
    return result;
};

function dfs(word, count, set) {
    if(word.length === 0 && count > 1) {
        return true;
    }
    for(let i = 1; i <= word.length; i++) {
        let str = word.substring(0, i);
        if(set.has(str)) {
            let isConf = dfs(word.substring(i), count + 1, set);
            if(isConf) {
                return true;
            }
        }
    }
    return false;
}