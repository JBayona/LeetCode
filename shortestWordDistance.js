/*
Given a list of words and two words word1 and word2, return the shortest distance between
these two words in the list.
Example:
Assume that words =["practice", "makes", "perfect", "coding", "makes"].
Input: word1 = “coding”, word2 = “practice”
Output: 3

Input: word1 = "makes", word2 = "coding"
Output: 1

Note:
You may assume that word1 does not equal to word2, and _word1 _and _word2 _are both in the list.

https://leetcode.com/problems/shortest-word-distance/
*/

var shortestDistance = function(wordsDict, word1, word2) {
    let firstWord = -1;
    let secondWord = -1;

    let result = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < wordsDict.length; i++) {
        if(wordsDict[i] === word1) {
            firstWord = i;
        }
        if(wordsDict[i] === word2) {
            secondWord = i;
        }
        if(firstWord !== -1 && secondWord !== -1) {
            result = Math.min(result, Math.abs(firstWord - secondWord));
        }
    }
    return result;
};

// wordsDict = ["practice", "makes", "perfect", "coding", "makes"];
// word1 = 'coding';
// word2 = 'practice'; 3
// word1 = "makes";
// word2 = "coding";
wordsDict = ["a","a","b","b"];
word1 = "a";
word2 = "b";
console.log(shortestDistance(wordsDict, word1, word2));
