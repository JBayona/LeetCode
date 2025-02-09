/*

Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest
transformation sequence from beginWord to endWord, such that:
Only one letter can be changed at a time.

Each transformed word must exist in the word list. Note that beginWord is not a transformed word.

Note:
Return 0 if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.

Example 1:
Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5.

Example 2:
Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.

https://leetcode.com/problems/word-ladder/
*/

// Time O(V + E)
// Space O(V + E)
var ladderLength = function (beginWord, endWord, wordList) {
  if (beginWord === endWord) {
    return 0;
  }

  let visited = new Set();
  let words = new Set(wordList);
  let queue = [{ word: beginWord, d: 1 }];
  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let { word, d } = queue.shift();
      if (word === endWord) {
        return d;
      }
      // Try to replace each character, one by one with every char in the abc
      for (let j = 0; j < word.length; j++) {
        for (let k = 0; k < 26; k++) {
          let c = String.fromCharCode(97 + k);
          let tmpWord = word.substring(0, j) + c + word.substring(j + 1);

          if (!words.has(tmpWord) || visited.has(tmpWord)) {
            continue;
          }
          visited.add(tmpWord);
          queue.push({ word: tmpWord, d: d + 1 });
        }
      }
    }
  }
  return 0;
};
