/*
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add
spaces in s to construct a sentence where each word is a valid dictionary word.
Return all such possible sentences.

Note:
The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]

Output:
[
  "cats and dog",
  "cat sand dog"
]
Example 2:

Input:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]

Output:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
Explanation: Note that you are allowed to reuse a dictionary word.
Example 3:

Input:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
Output:
[]

https://leetcode.com/problems/word-break-ii/
*/

var wordBreak = function(s, wordDict) {
    let map = new Set(wordDict);
    let result = [];
    let memo = {};
    dfs(s, result, [], 0, map, memo);
    return result;
};

function dfs(s, result, tmp, start, map, memo) {
    if(memo[start]) {
        return false;
    }
    if(start === s.length) {
        result.push(tmp.join(' '));
        return true;
    }
    let reachable = false;
    for(let i = start + 1; i <= s.length; i++) {
        let substr = s.substring(start, i);
        // Check if is valid word based on our dictionary
        if(map.has(substr)) {
            tmp.push(substr);
            reachable = dfs(s, result, tmp, i, map, memo);
            tmp.pop();
        }
    }
    if(!reachable) {
        memo[start] = true;
    }
    return reachable;
}
