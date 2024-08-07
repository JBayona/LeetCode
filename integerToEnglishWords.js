/*
Convert a non-negative integer num to its English words representation.

Example 1:
Input: num = 123
Output: "One Hundred Twenty Three"

Example 2:
Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"

Example 3:
Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

https://leetcode.com/problems/integer-to-english-words
*/

let lessThan20 = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
  'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  let tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  let thousands = ['', 'Thousand', 'Million', 'Billion'];
  
  var numberToWords = function(num) {
  
    // Corner case
    if(num === 0) return 'Zero';
  
    let result = '';
    let i = 0;
    while(num > 0) {
      // Group by thousands (1000)
      if(num % 1000 !== 0) {
        result = helper(num % 1000) + thousands[i] + ' ' + result;
      }
      num = Math.floor(num/1000);
      i++;
    }
  
    return result.trim();
  };
  
  /*
  If we want to extend the number to do it with "and" we should pass the original
  number and then concatenate that number is it's greater or equal than 100
  Example:
  else if(num < 100){
      let tmp = '';
      if(original >= 100) {
          tmp += ' and ';
      }
      return tmp + tens[Math.floor(num / 10)] + ' ' + helper(num % 10); // 20, 30, 40, 50, 60, 70, 80, 90
  } 
  */
  
  function helper(num) {
    if(num === 0){
          return ''; // necessary! 50868
      } else if(num < 20){
          return lessThan20[num] + ' '; // 1 - 19
      } else if(num < 100){
          return tens[Math.floor(num / 10)] + ' ' + helper(num % 10); // 20, 30, 40, 50, 60, 70, 80, 90
      } else {
          return lessThan20[Math.floor(num / 100)] + ' Hundred ' + helper(num % 100); // > 100
      }
  }
  