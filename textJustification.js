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

// Greedy
// Time O(N)
var fullJustify = function(words, maxWidth) {
    let result = [];
    let currentLength = 0;
    let numWords = 0;
    let line = [];

    for (let word of words) {
        // Number of words is used to consider spaces
        if (currentLength + word.length + numWords <= maxWidth) {
            line.push(word)
            currentLength += word.length;
            numWords++;
        } else {
            // Create a line
            result.push(formatLine(line, currentLength, maxWidth, numWords));
            // Clean
            line = [];
            // The prev word does not fit
            line.push(word);
            currentLength = word.length;
            numWords = 1;
        }
    }

    // Handle the last line (if any)
    let lastLine = line.join(" ");
    let padding = maxWidth - lastLine.length;
    lastLine += " ".repeat(padding);
    result.push(lastLine);
    return result;
};

function formatLine(line, currentLength, maxWidth, numWords) {
    // If only one word, left justify
    if (numWords === 1) {
        return line[0] + " ".repeat(maxWidth - line[0].length);
    }

    let totalSpaces = maxWidth - currentLength;
    let spacesBetweenWords = numWords - 1;
    let extraSpacesNeeded = totalSpaces % spacesBetweenWords;
    let spaces = totalSpaces / spacesBetweenWords;
    let str = '';
    // Do not consider the last line as we are considering spaces between words
    for (let i = 0; i < line.length - 1; i++) {
        str += line[i];
        // Add the space between each word added
        str += " ".repeat(spaces);
        if (extraSpacesNeeded) {
            str += " ";
            extraSpacesNeeded--;
        }
    }
    // Add the last line
    str += line[line.length - 1];
    return str;
}