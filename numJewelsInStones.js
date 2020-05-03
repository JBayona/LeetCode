/*
You're given strings J representing the types of stones that are jewels, and S representing the stones you have.  Each character in S is a type of stone you have.  You want to know how many of the stones you have are also jewels.

The letters in J are guaranteed distinct, and all characters in J and S are letters. Letters are case sensitive, so "a" is considered a different type of stone from "A".

Example 1:

Input: J = "aA", S = "aAAbbbb"
Output: 3
Example 2:

Input: J = "z", S = "ZZ"
Output: 0

https://leetcode.com/problems/jewels-and-stones/description/
*/

var numJewelsInStones = function(J, S) {
    let result = 0;
    let character;
    for(let i = 0; i < S.length; i++) {
        character = S[i];
        if(J.indexOf(character) >= 0) {
            result++;
        }
    }
    return result;
};

// Opción 2
var numJewelsInStones = function(J, S) {
    let hash = {};
    let array = J.split('');
    for(item of array) {
        hash[item] = true;
    }
    
    let result = 0;
    for(let i = 0; i < S.length; i++) {
        if(S[i] in hash) {
            result++;
        }
    }
    return result;
};