/*
Design a data structure that will be initialized with a string array, and then it
should answer queries of the shortest distance between two different strings from the array.

Implement the WordDistance class:
WordDistance(String[] wordsDict) initializes the object with the strings array wordsDict.
int shortest(String word1, String word2) returns the shortest distance between word1 and word2 in the array wordsDict.
 

Example 1:
Input
["WordDistance", "shortest", "shortest"]
[[["practice", "makes", "perfect", "coding", "makes"]], ["coding", "practice"], ["makes", "coding"]]
Output [null, 3, 1]

Explanation
WordDistance wordDistance = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
wordDistance.shortest("coding", "practice"); // return 3
wordDistance.shortest("makes", "coding");    // return 1

https://leetcode.com/problems/shortest-word-distance-ii/
*/

// Time O(p + q)
class WordDistance {
    constructor(wordsDict) {
        this.hash = {}
        for(let i = 0; i < wordsDict.length; i++) {
            let word = wordsDict[i];
            if(!(word in this.hash)) {
                this.hash[word] = [];
            }
            this.hash[word].push(i);;
        }
    }
    shortest(word1, word2) {
        let wordA = this.hash[word1];
        let wordB = this.hash[word2];
        
        if(!wordA || !wordB) {
            return -1;
        }

        let indexA = 0;
        let indexB = 0;
        let shortest = Number.MAX_SAFE_INTEGER;
        while(indexA < wordA.length && indexB < wordB.length) {
            shortest = Math.min(shortest, Math.abs(wordA[indexA] - wordB[indexB]));
            if(wordA[indexA] < wordB[indexB]) {
                indexA++;
            } else {
                indexB++;
            }
        }
        return shortest;
    }
}

let wordsDict = ["practice", "makes", "perfect", "coding", "makes"];
// let word1 = "coding";
// let word2 = "practice"; 3

let word1 = "makes";
let word2 = "coding"; // 1
let obj = new WordDistance(wordsDict);
console.log(obj.shortest(word1, word2));