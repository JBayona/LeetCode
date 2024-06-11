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

// Time O(M * N)
// Space O(M * N)
var ladderLength = function (beginWord, endWord, wordList) {
  if (beginWord === endWord) {
    return 0;
  }

  let visited = new Set();
  let list = new Set(wordList);
  // Set initial state of the queue
  let queue = [{ word: beginWord, level: 1 }];
  visited.add(beginWord);

  // BFS
  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let { word, level } = queue.shift();
      // If we reach the word we were looking
      if (word === endWord) {
        return level;
      }

      // Replace char by char and see if that's valid
      for (let j = 0; j < word.length; j++) {
        for (let k = 0; k < 26; k++) {
          // a = 97, b = 98, ...
          let c = String.fromCharCode(97 + k);
          let tmp = word.substring(0, j) + c + word.substring(j + 1);

          if (visited.has(tmp)) {
            continue;
          }
          if (list.has(tmp)) {
            visited.add(tmp);
            queue.push({ word: tmp, level: level + 1 });
          }
        }
      }
    }
  }
  return 0;
};

// Option 2 - Slower
/*
var ladderLength = function(beginWord, endWord, wordList) {
  let visited = new Set();

  // Set initial state of the queue
  let queue = [{word: beginWord, level: 1}];

  // BFS
  while (queue.length) {
      let {word, level} = queue.shift();
      // If we reach the word we were looking
      if (word === endWord) {
          return level;
      }
      // Look over all available words
      for (let i = 0; i < wordList.length; i++) {
          let wordTmp = wordList[i];
          // We saw the word before
          if (visited.has(wordTmp)) {
              continue;
          }
          // Compute how many chars are different on the
          // same position
          let charDiff = 0;
          for (let j = 0; j < word.length; j++) {
              if(word[j] !== wordTmp[j]) {
                  charDiff++;
              }
          }
          // If diff is only one, add it into the queue
          if (charDiff === 1) {
              queue.push({word: wordTmp, level: level + 1});
              // Visit the queue as we want to make sure we already
              // compute it on the queue
              visited.add(wordTmp);
          }
      }
  }
  return 0;
};
*/
