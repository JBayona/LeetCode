/*
Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word in the string.

If the last word does not exist, return 0.

Note: A word is defined as a character sequence consists of non-space characters only.

For example, 
Given s = "Hello World",
return 5.


https://leetcode.com/problems/length-of-last-word/description/
*/

var lengthOfLastWord = function(s) {
   if(s == 0) return 0;
   let words = s.split(' ');
   let noSpace = words.filter(item => item != 0);
   return noSpace[noSpace.length - 1].length;
};

var str = "a ";
console.log(lengthOfLastWord(str));