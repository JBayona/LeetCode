/*
There is a list of  character heights aligned by index to their letters. For example, 'a' is at index  and 'z' is at index . There will also be a string. Using the letter heights given, determine the area of the rectangle highlight in  assuming all letters are  wide.

Example
The heights are  and . The tallest letter is  high and there are  letters. The hightlighted area will be  so the answer is .

Function Description
Complete the designerPdfViewer function in the editor below.

designerPdfViewer has the following parameter(s):

int h[26]: the heights of each letter
string word: a string
Returns

int: the size of the highlighted area

https://www.hackerrank.com/challenges/designer-pdf-viewer/problem
*/

function designerPdfViewer(h, word) {
    // Write your code here
    let len = word.length;
    let max = 0;
    for (let c of word) {
        // a is 97
        let height = c.charCodeAt(0) - 97;
        max = Math.max(max, h[height]);
    }
    return max * len;
}