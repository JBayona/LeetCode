/*
Given an input string, reverse the string word by word.

Example:  

Input: "the sky is blue",
Output: "blue is sky the".
Note:

A word is defined as a sequence of non-space characters.
Input string may contain leading or trailing spaces. However, your reversed string should not contain leading or trailing spaces.
You need to reduce multiple spaces between two words to a single space in the reversed string.
Follow up: For C programmers, try to solve it in-place in O(1) space.


https://leetcode.com/problems/reverse-words-in-a-string/description/
*/


/**
 * @param {string} str
 * @returns {string}
 */
var reverseWords = function(str) {
    // Remove empty spaces in the left/right
    str = str.trim();
    let array = str.split(" ");
    let result ='';
    
    // Iterate from back to front
    for(let i = array.length-1; i >= 0; i--) {
        // We want to ignore the empty spaces to avoid multiple empty spaces between words
        if(array[i] === '') continue;
        // For the first condition, result is empty
        if(result.length === 0) result = array[i];
        else {
            // Concatenate each word with only one space
            result = result + ' ' + array[i];
        }
    }
    
    /*Or we can remove the condition above if result.length and just trim the result*/
    return result;
};
