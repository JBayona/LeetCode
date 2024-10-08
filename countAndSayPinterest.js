/*
The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

countAndSay(1) = "1"
countAndSay(n) is the run-length encoding of countAndSay(n - 1).
Run-length encoding (RLE) is a string compression method that works by replacing consecutive
identical characters (repeated 2 or more times) with the concatenation of the character and the number
marking the count of the characters (length of the run). For example, to compress the string "3322251" we
replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11".
Thus the compressed string becomes "23321511".

Given a positive integer n, return the nth element of the count-and-say sequence.

Example 1:
Input: n = 4
Output: "1211"
Explanation:

countAndSay(1) = "1"
countAndSay(2) = RLE of "1" = "11"
countAndSay(3) = RLE of "11" = "21"
countAndSay(4) = RLE of "21" = "1211"

https://leetcode.com/problems/count-and-say
*/

let memo = {}
var countAndSay = function(n) {
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