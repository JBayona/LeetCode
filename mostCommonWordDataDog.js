/*
Given a paragraph and a list of banned words, return the most frequent word that is not in
the list of banned words.  It is guaranteed there is at least one word that isn't banned, and that
the answer is unique.

Words in the list of banned words are given in lowercase, and free of punctuation. 
Words in the paragraph are not case sensitive.  The answer is in lowercase.

Example:
Input: 
paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
banned = ["hit"]
Output: "ball"
Explanation: 
"hit" occurs 3 times, but it is a banned word.
"ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph. 
Note that words in the paragraph are not case sensitive,
that punctuation is ignored (even if adjacent to words, such as "ball,"), 
and that "hit" isn't the answer even though it occurs more because it is banned.
 

Note:

1 <= paragraph.length <= 1000.
0 <= banned.length <= 100.
1 <= banned[i].length <= 10.
The answer is unique, and written in lowercase (even if its occurrences in paragraph may have uppercase symbols, and even if it is a proper noun.)
paragraph only consists of letters, spaces, or the punctuation symbols !?',;.
There are no hyphens or hyphenated words.
Words only consist of letters, never apostrophes or other punctuation symbols.

https://leetcode.com/problems/most-common-word/
*/

var mostCommonWord = function(paragraph, banned) {
    let str = paragraph.replace(/[^a-zA-Z ]/g, " ").toLowerCase();
    let hash = {};
    let array = str.split(' ');
    
    let result = '';
    let max = Number.MIN_SAFE_INTEGER;
    
    for(let i = 0; i < array.length; i++) {
        let word = array[i];
        // Verify the word is not  banned and it's not an empty space
        if(!banned.includes(word) && word !== '') {
            if(word in hash) {
                hash[word]++;
            } else {
                hash[word] = 1;
            }
            // Update the result
            if(hash[word] > max) {
                max = hash[word];
                result = word;
            }
        }
    }
    
    return result;
};