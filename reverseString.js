/*
Write a function that takes a string as input and returns the string reversed.

Example:
Given s = "hello", return "olleh".

https://leetcode.com/problems/reverse-string/description/
*/

var reverseString = function(s) {
    return s.split('').reverse().join('')
};

/**
 * @param {string} s
 * @return {string}
 */
var reverseString = function(s) {
    let reversed = [];
    let index = 0;
    for(let i = s.length-1; i >= 0; i--) {
        reversed[index++] = s[i];
    }
    return reversed.join('');
};

// Recursion
var reverseString = function(array) {
    return reverseStringHelper(array, 0, array.length - 1);
};

function reverseStringHelper(array, start, end) {
    // Base case
    if(start >= end) {
        return array;
    }
    // Shift
    let tmp = array[start];
    array[start] = array[end];
    array[end] = tmp;
    return reverseStringHelper(array, start + 1, end - 1);
}
