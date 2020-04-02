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

// BFS
var ladderLength = function(beginWord, endWord, wordList) {
    // Variable used to mark the words that we have seen with one
    // character of difference with  our current word
    let visited = new Array(wordList.length).fill(false);
    let queue = [];
    
    // Set the original word with the first level
    queue.push({word: beginWord, level: 1});
    while(queue.length) {
        // Get the first current node
        let current = queue.shift();
        //  If we have identified the word, we are done and we already have the
        // shortest path
        if(current.word === endWord){
            return current.level;
        }

        // Let's look over all of our avaiable words
        for(let i = 0; i < wordList.length; i++) {
            // If we already saw the word in wordList, there's no need to process again
            // as we can have an infinite loop
            if(visited[i]) {
                continue;
            }

            let charDiff = 0;
            let currentWordList = wordList[i];
            // Count the number of different chards, it should be one char of difference
            for(let j = 0; j < currentWordList.length; j++) {
                if(currentWordList[j] !== current.word[j]) {
                    charDiff++;
                }
            }

            // If we only have one char of difference, we add it to the queue
            if(charDiff ===  1) {
                queue.push({word: wordList[i], level: current.level + 1});
                // Mark as visited
                visited[i] = true;
            }
        }
    }
    return 0;
};