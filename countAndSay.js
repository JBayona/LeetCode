/*
The count-and-say sequence is the sequence of integers with the first five terms as following:

1.     1
2.     11
3.     21
4.     1211
5.     111221
1 is read off as "one 1" or 11.
11 is read off as "two 1s" or 21.
21 is read off as "one 2, then one 1" or 1211.
Given an integer n, generate the nth term of the count-and-say sequence.

Note: Each term of the sequence of integers will be represented as a string.

Example 1:

Input: 1
Output: "1"
Example 2:

Input: 4
Output: "1211"
https://leetcode.com/problems/count-and-say/description/

*/

let memo = {};
var countAndSay = function (n) {
  if (n in memo) {
    return memo[n];
  }
  if (n === 1) {
    return "1";
  }
  let tmp = countAndSay(n - 1);
  memo[n] = formStr(tmp);
  return memo[n];
};

function formStr(str) {
  let count = 1;
  let tmp = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      tmp += `${count}${str[i]}`;
      count = 1;
    }
  }
  return tmp;
}

/*
Option 2
var countAndSay = function(n) {
    if (n === 1) {
        return "1";
    }

    let memo = {1: "1"}
    for (let i = 2; i <= n; i++) {
        let c = helper(memo[i - 1]);
        memo[i] = c; 
    }
    return memo[n];
};

function helper(str) {
    let count = 1;
    let res = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            res += (count + str[i]).toString();
            count = 1;
        }
    }
    return res;
}
*/

/*
// Option 3
var countAndSay = function(n){
  if(n === 1) return "1";
  if(n === 2) return "11";

  var str = "11";
  var currentStr = null; 
  for(let i = 3; i <= n; i++){
    str = formStr(str);
  }
  return str;
};

//String compression
function formStr(str){
  var count = 1;
  var tmp = '';
  for(var i = 0; i < str.length; i++){
    if(str[i] === str[i+1]){
      count++;
    }else{
      tmp += count + str[i];
      count = 1;
    }
  }
  return tmp;
};
*/

n = 6;
console.log(countAndSay(n));
