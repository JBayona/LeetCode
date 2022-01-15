/*
Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string.

Return a list of all possible strings we could create. Return the output in any order.

Example 1:
Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]

Example 2:
Input: s = "3z4"
Output: ["3z4","3Z4"]

https://leetcode.com/problems/letter-case-permutation/
*/

var letterCasePermutation = function(s) {
    if(!s) {
        return [];
    }
    let result = [];
    let array = [...s];
    helper(array, result, 0);
    return result;
};

function helper(array, result, index) {
    // Stop condition
    if(index === array.length) {
        result.push(array.join(''));
        return;
    }
    if(!isNaN(array[index])) {
        helper(array.concat(), result, index + 1);
        return;
    } else {        
        // Uppercase
        array[index] = array[index].toUpperCase();
        helper(array.concat(), result, index + 1);
        
        // Lowercase
        array[index] = array[index].toLowerCase();
        helper(array.concat(), result, index + 1);
    }
}