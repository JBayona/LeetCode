/*
Sometimes people repeat letters to represent extra feeling, such as "hello" -> "heeellooo", "hi" -> "hiiii". 
In these strings like "heeellooo", we have groups of adjacent letters that are all the same:  "h", "eee", "ll", "ooo".

For some given string S, a query word is stretchy if it can be made to be equal to S by any number of applications
of the following extension operation: choose a group consisting of characters c, and add some number of characters
c to the group so that the size of the group is 3 or more.

For example, starting with "hello", we could do an extension on the group "o" to get "hellooo", but we cannot get
"helloo" since the group "oo" has size less than 3.  Also, we could do another extension like "ll" -> "lllll"
to get "helllllooo".  If S = "helllllooo", then the query word "hello" would be stretchy because of these two
extension operations: query = "hello" -> "hellooo" -> "helllllooo" = S.
Given a list of query words, return the number of words that are stretchy. 

Example:
Input: 
S = "heeellooo"
words = ["hello", "hi", "helo"]
Output: 1
Explanation: 
We can extend "e" and "o" in the word "hello" to get "heeellooo".
We can't extend "helo" to get "heeellooo" because the group "ll" is not size 3 or more.

https://leetcode.com/problems/expressive-words/
*/
var expressiveWords = function(s, words) {
    if(!s || !words.length) {
        return 0;
    }
    
    let result = 0;
    for(let word of words) {
        result += canExtend(s, word) ? 1 : 0;
    }
    return result;
};

function canExtend(s, word) {
    // Two pointers
    let i = 0;
    let j = 0;
    while(i < s.length && j < word.length) {
        // Characters should be the same
        if(s[i] === word[j]) {
            let lenS = lengthMatch(i, s);
            let lenJ = lengthMatch(j, word);
            
            // Check if the length is valid to extend
            if(lenS == 2 && lenS > lenJ || (lenS < lenJ)) {
                return false;
            }
            // Move from the char is different, not repeated
            i += lenS;
            j += lenJ;
        } else {
            return false;
        }
    }
    // Both should reach the end of the string if we can expand them
    return i === s.length && j === word.length;
}

// Check the length of the matching consecutive char
function lengthMatch(index, str){
    let i = index;
    let c = str[index];
    while(i < str.length && str[i] === c) {
        i++;
    }
    return i - index;
}
