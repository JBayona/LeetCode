/*
Given an array of words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left justified and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space characters only.
Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
The input array words contains at least one word.
Example 1:

Input:
words = ["This", "is", "an", "example", "of", "text", "justification."]
maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
Example 2:

Input:
words = ["What","must","be","acknowledgment","shall","be"]
maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be",
             because the last line must be left-justified instead of fully-justified.
             Note that the second line is also left-justified becase it contains only one word.
Example 3:

Input:
words = ["Science","is","what","we","understand","well","enough","to","explain",
         "to","a","computer.","Art","is","everything","else","we","do"]
maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]

https://leetcode.com/problems/text-justification/
*/

var fullJustify = function(words, maxWidth) {
    let result = [];
    let charCount = 0;
    let gaps = 0;
    let wordsCounted = 0;
    let spacesNeeded = 0;
    let tmp = [];
    
    for(let i = 0 ; i < words.length; i++) {
        charCount += words[i].length;
        
        if(charCount + gaps <= maxWidth){
            tmp.push(words[i]);
            wordsCounted++;
            //At least we need one blank space per word.
            gaps = wordsCounted >= 1 ? wordsCounted : 0;
        }
        
        // If there's the last word
        if(i === words.length - 1) {
            spacesNeeded = maxWidth - charCount;
            let line = addSpaces(tmp, spacesNeeded, true);
            result.push(line);
        } else if(charCount + gaps + words[i+1].length > maxWidth){ // We can not insert more words, format is needed
            spacesNeeded = maxWidth - charCount;
            let line = addSpaces(tmp, spacesNeeded, false);
            result.push(line);
            // Clean
            tmp = [];
            gaps = 0;
            charCount = 0;
            wordsCounted = 0;
        }
    }
    return result;
};

function addSpaces(array, spacesNeeded, isLast) {
    let line = '';
    let spaces = 0;
    // Define how many gaps we have available to fill according to the line
    let numberOfElements = isLast ? array.length : array.length - 1;
    let spaceNeeded = spacesNeeded;
    
    for(let i = 0; i < array.length; i++) {
        // Left justified, single space between words, remaining spaces at the  final
        if(isLast) {
            // For the last word and last line we need to insert the remaining spaces to the right
            if(i === array.length - 1) {
                // Try to get how many available space we need
                spaces = numberOfElements > 0 ? Math.ceil(spaceNeeded/numberOfElements): spaceNeeded;
                line += array[i] + ' '.repeat(spaces);
                spaceNeeded -= spaces;
                numberOfElements--;
            } else {
                // Insert only one space in the last line if we still have words
                line += array[i] + ' ';
                spaceNeeded -=1; 
                numberOfElements--;
            }
        } else {
            // Try to distributed as evenly as we can
            spaces = numberOfElements > 0 ? Math.ceil(spaceNeeded/numberOfElements): spaceNeeded;
            line += array[i] + ' '.repeat(spaces);
            spaceNeeded -= spaces;
            numberOfElements--;
        }
    }
    return line;
}