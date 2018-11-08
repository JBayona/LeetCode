/*
Given two strings s and t, determine if they are isomorphic.

Two strings are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.

Example 1:

Input: s = "egg", t = "add"
Output: true
Example 2:

Input: s = "foo", t = "bar"
Output: false
Example 3:

Input: s = "paper", t = "title"
Output: true

https://leetcode.com/problems/isomorphic-strings/description/
*/

// O(N)
var isIsomorphic = function(s, t) {
    
    if(s.length !== t.length) {
        return false;
    }
    
    let weightS = getArrayWeight(s);
    let weightT = getArrayWeight(t);
    console.log(weightS);
    console.log(weightT);
    // Compare if both have the same weight in each position
    for(let i = 0; i < s.length; i++) {
        if(weightS[i] !== weightT[i]) {
            return false;
        }
    }
    
    return true;
};

function getArrayWeight(str) {
    let hash = {};
    let array = [];
    let weight = 0;
    for(let i = 0 ; i < str.length; i++) {
        let letter = str[i];
        // Only for those who have not appeared 
        if(!(letter in hash)) {
            hash[letter] = weight++;
        }
        array[i] = hash[letter];
    }
    return array;
}

// O(N^2)

var isIsomorphic = function(s, t) {
    let hash = {};
    
    if(s.length !== t.length) { // ab aa
        return false;
    }
    
    for(let i = 0; i < s.length; i++) {
        let letterA = s[i];
        let letterB = t[i];
        if(letterA in hash) {
            if(hash[letterA] !== letterB) {
                return false;
            }
        }else if(Object.values(hash).includes(letterB)){
            return false;
        }else {
            hash[letterA] = letterB
        }
    }
    return true;
};