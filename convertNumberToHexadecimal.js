/*
Given an integer, write an algorithm to convert it to hexadecimal. For negative integer, two’s complement method is used.

Note:

All letters in hexadecimal (a-f) must be in lowercase.
The hexadecimal string must not contain extra leading 0s. If the number is zero, it is
represented by a single zero character '0'; otherwise, the first character in the hexadecimal
string will not be the zero character.
The given number is guaranteed to fit within the range of a 32-bit signed integer.
You must not use any method provided by the library which converts/formats the number to hex directly.
Example 1:

Input:
26

Output:
"1a"
Example 2:

Input:
-1

Output:
"ffffffff"

https://leetcode.com/problems/convert-a-number-to-hexadecimal/
*/

var toHex = function(num) {
  // In binary, hex == 4 bits. We can right shift by 4 every time
  // to grab the least significant digit.
  if(num == 0) {
      return "0";
  }
  let codes = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
  let result = '';
  // As we are treating bits, we don't really care about
  // negative numbers
  while(num !== 0) {
      result += codes[num & 15]; //extract last 4 bits at a time
      num = (num >>> 4);
      
  }
  return result.split('').reverse().join('');
};